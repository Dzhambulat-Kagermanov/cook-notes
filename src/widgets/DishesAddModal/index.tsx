import { FC, MouseEventHandler } from 'react'
import { TClassName } from '@/types/shared'
import { UiModal } from '@/ui'
import { cn } from '@/lib'
import { DishesAddForm } from '../DishesAddForm'
import { DISHES_ADD_MODAL } from '@/constants'
import { useAppDispatch } from '@/hooks'
import { hideModal } from '@/store/modals'
import { resetUsageItems } from '@/store/dishesInfo'
import cls from './index.module.css'

interface Props extends TClassName {}
const DishesAddModal: FC<Props> = ({ className }) => {
	const dispatch = useAppDispatch()
	const handleClose: MouseEventHandler = () => {
		dispatch(hideModal({ slug: DISHES_ADD_MODAL }))
		dispatch(resetUsageItems())
	}

	return (
		<UiModal
			handleClose={() => {
				dispatch(resetUsageItems())
			}}
			slug={DISHES_ADD_MODAL}
			className={cn(cls.wrapper, [className])}
		>
			<button className={cls.close_modal_btn} onClick={handleClose}>
				Закрыть
			</button>
			<DishesAddForm />
		</UiModal>
	)
}

export { DishesAddModal }
