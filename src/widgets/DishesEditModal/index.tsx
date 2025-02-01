import { FC } from 'react'
import { TClassName } from '@/types/shared'
import { UiModal } from '@/ui'
import { DISHES_EDIT_MODAL } from '@/constants'
import { cn } from '@/lib'
import { DishesEditForm } from '../DishesEditForm'
import { useAppSelector } from '@/hooks'
import { editDishId } from '@/store/editData'
import cls from './index.module.css'

interface Props extends TClassName {}
const DishesEditModal: FC<Props> = ({ className }) => {
	const dishId = useAppSelector(editDishId)

	return (
		<UiModal slug={DISHES_EDIT_MODAL} className={cn(cls.wrapper, [className])}>
			<DishesEditForm dishId={dishId || -1} />
		</UiModal>
	)
}

export { DishesEditModal }
