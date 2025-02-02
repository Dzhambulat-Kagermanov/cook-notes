import { FC, MouseEventHandler } from 'react'
import { TClassName } from '@/types/shared'
import { UiModal } from '@/ui'
import { DISHES_EDIT_MODAL } from '@/constants'
import { cn } from '@/lib'
import { DishesEditForm } from '../DishesEditForm'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { editDishId } from '@/store/editData'
import cls from './index.module.css'
import { resetUsageItems } from '@/store/dishesInfo'
import { hideModal } from '@/store/modals'

interface Props extends TClassName {}
const DishesEditModal: FC<Props> = ({ className }) => {
	const dispatch = useAppDispatch()
	const dishId = useAppSelector(editDishId)
	const handleClose: MouseEventHandler = () => {
		dispatch(hideModal({ slug: DISHES_EDIT_MODAL }))
		dispatch(resetUsageItems())
	}
	return (
		<UiModal
			contentCls={cls.modal_content}
			slug={DISHES_EDIT_MODAL}
			className={cn(cls.wrapper, [className])}
			handleClose={() => {
				dispatch(resetUsageItems())
			}}
		>
			<button className={cls.close_modal_btn} onClick={handleClose}>
				Закрыть
			</button>
			{dishId && <DishesEditForm dishId={dishId} />}
		</UiModal>
	)
}

export { DishesEditModal }
