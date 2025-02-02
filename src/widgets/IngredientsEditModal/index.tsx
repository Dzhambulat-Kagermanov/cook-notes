import { FC, MouseEventHandler } from 'react'
import { TClassName } from '@/types/shared'
import { UiModal } from '@/ui'
import { INGREDIENTS_EDIT_MODAL } from '@/constants'
import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { editIngredientId } from '@/store/editData'
import cls from './index.module.css'
import { IngredientsEditForm } from '../IngredientsEditForm'
import { hideModal } from '@/store/modals'

interface Props extends TClassName {}
const IngredientsEditModal: FC<Props> = ({ className }) => {
	const dispatch = useAppDispatch()
	const handleClose: MouseEventHandler = () => {
		dispatch(hideModal({ slug: INGREDIENTS_EDIT_MODAL }))
	}
	const ingredientId = useAppSelector(editIngredientId)

	return (
		<UiModal
			contentCls={cls.modal_content}
			slug={INGREDIENTS_EDIT_MODAL}
			className={cn(cls.wrapper, [className])}
		>
			<button className={cls.close_modal_btn} onClick={handleClose}>
				Закрыть
			</button>
			{ingredientId && <IngredientsEditForm ingredientId={ingredientId} />}
		</UiModal>
	)
}

export { IngredientsEditModal }
