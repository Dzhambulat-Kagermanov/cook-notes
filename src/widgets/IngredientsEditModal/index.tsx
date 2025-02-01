import { FC } from 'react'
import { TClassName } from '@/types/shared'
import { UiModal } from '@/ui'
import { INGREDIENTS_EDIT_MODAL } from '@/constants'
import { cn } from '@/lib'
import { useAppSelector } from '@/hooks'
import { editIngredientId } from '@/store/editData'
import cls from './index.module.css'
import { IngredientsEditForm } from '../IngredientsEditForm'

interface Props extends TClassName {}
const IngredientsEditModal: FC<Props> = ({ className }) => {
	const ingredientId = useAppSelector(editIngredientId)

	return (
		<UiModal
			slug={INGREDIENTS_EDIT_MODAL}
			className={cn(cls.wrapper, [className])}
		>
			{ingredientId && <IngredientsEditForm ingredientId={ingredientId} />}
		</UiModal>
	)
}

export { IngredientsEditModal }
