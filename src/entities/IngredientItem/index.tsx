import { FC, memo, MouseEventHandler } from 'react'
import { TClassName } from '@/types/shared'
import { cn, roundToNearestNonZero } from '@/lib'
import { TIngredientProps } from '@/types/Ingredient'
import cls from './index.module.css'
import { useAppDispatch } from '@/hooks'
import {
	toggleDishesUpdated,
	toggleIngredientsUpdated,
} from '@/store/localStorageUpdated'
import { showModal } from '@/store/modals'
import { INGREDIENTS_EDIT_MODAL } from '@/constants'
import { changeEditIngredientId } from '@/store/editData'

interface Props extends TClassName, TIngredientProps {}
const IngredientItem: FC<Props> = memo(
	({ className, id, name, packageCost, packageVolume, unit }) => {
		const dispatch = useAppDispatch()
		const handleRemove: MouseEventHandler = () => {
			const ingredients: TIngredientProps[] =
				JSON.parse(localStorage.getItem('ingredientsList') as string) || []

			localStorage.setItem(
				'ingredientsList',
				JSON.stringify(
					ingredients.filter(props => {
						return props.id !== id
					})
				)
			)
			dispatch(toggleIngredientsUpdated())
			dispatch(toggleDishesUpdated())
		}
		const handleEdit: MouseEventHandler = () => {
			dispatch(changeEditIngredientId({ id }))
			dispatch(showModal({ slug: INGREDIENTS_EDIT_MODAL }))
		}

		return (
			<li className={cn(cls.wrapper, [className])}>
				<h2 className={cls.title}>{name}</h2>
				<div className={cls.info}>
					<h3 className={cls.qnt}>
						Количество:{' '}
						<strong>
							{packageVolume} {unit}
						</strong>
					</h3>
					<h4 className={cls.price}>
						Стоимость:{' '}
						<strong>{roundToNearestNonZero(packageCost)} рублей</strong>
					</h4>
				</div>
				<div className={cls.btns}>
					<button onClick={handleEdit} className={cls.edit_btn}>
						Изменить
					</button>
					<button onClick={handleRemove} className={cls.del_btn}>
						Удалить
					</button>
				</div>
			</li>
		)
	}
)

export { IngredientItem }
