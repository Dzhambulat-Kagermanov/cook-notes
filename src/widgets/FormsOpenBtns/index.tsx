import { FC, MouseEventHandler } from 'react'
import { TClassName } from '@/types/shared'
import { cn } from '@/lib'
import { useAppDispatch } from '@/hooks'
import { showModal } from '@/store/modals'
import { DISHES_ADD_MODAL, INGREDIENTS_ADD_MODAL } from '@/constants'
import cls from './index.module.css'

interface Props extends TClassName {}
const FormsOpenBtns: FC<Props> = ({ className }) => {
	const dispatch = useAppDispatch()
	const handleIngredients: MouseEventHandler = () => {
		dispatch(showModal({ slug: INGREDIENTS_ADD_MODAL }))
	}
	const handleDishes: MouseEventHandler = () => {
		dispatch(showModal({ slug: DISHES_ADD_MODAL }))
	}

	return (
		<div className={cn(cls.wrapper, [className])}>
			<div className={cls.content}>
				<button className={cls.btn} onClick={handleDishes}>
					Создать блюдо +
				</button>
				<button className={cls.btn} onClick={handleIngredients}>
					Создать ингредиент +
				</button>
			</div>
		</div>
	)
}

export { FormsOpenBtns }
