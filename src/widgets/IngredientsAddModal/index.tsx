import { FC, MouseEventHandler } from 'react'
import { TClassName } from '@/types/shared'
import { UiModal } from '@/ui'
import { cn } from '@/lib'
import { IngredientsAddForm } from '../IngredientsAddForm'
import { INGREDIENTS_ADD_MODAL } from '@/constants'
import { useAppDispatch } from '@/hooks'
import { hideModal } from '@/store/modals'
import cls from './index.module.css'

interface Props extends TClassName {}
const IngredientsAddModal: FC<Props> = ({ className }) => {
	const dispatch = useAppDispatch()
	const handleClose: MouseEventHandler = () => {
		dispatch(hideModal({ slug: INGREDIENTS_ADD_MODAL }))
	}

	return (
		<UiModal
			contentCls={cls.modal_content}
			slug={INGREDIENTS_ADD_MODAL}
			className={cn(cls.wrapper, [className])}
		>
			<button className={cls.close_modal_btn} onClick={handleClose}>
				Закрыть
			</button>
			<IngredientsAddForm />
		</UiModal>
	)
}

export { IngredientsAddModal }
