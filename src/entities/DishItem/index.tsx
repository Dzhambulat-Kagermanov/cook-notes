import { FC, memo, MouseEventHandler } from 'react'
import { TClassName } from '@/types/shared'
import { cn, getIngredientForId } from '@/lib'
import { useAppDispatch } from '@/hooks'
import { toggleDishesUpdated } from '@/store/localStorageUpdated'
import { TDishesProps } from '@/types/Dishes'
import cls from './index.module.css'
import { changeEditDishId } from '@/store/editData'
import { showModal } from '@/store/modals'
import { DISHES_EDIT_MODAL } from '@/constants'

interface Props extends TClassName, TDishesProps {}
const DishItem: FC<Props> = memo(
	({ className, id, name, ingredientsUsage }) => {
		const dispatch = useAppDispatch()
		const handleRemove: MouseEventHandler = () => {
			const dishes: TDishesProps[] =
				JSON.parse(localStorage.getItem('dishesList') as string) || []

			localStorage.setItem(
				'dishesList',
				JSON.stringify(
					dishes.filter(props => {
						return props.id !== id
					})
				)
			)
			dispatch(toggleDishesUpdated())
		}
		const handleEdit: MouseEventHandler = () => {
			dispatch(changeEditDishId({ id }))
			dispatch(showModal({ slug: DISHES_EDIT_MODAL }))
		}

		const PRICE = ingredientsUsage.reduce((acc, { usage, id }) => {
			const ingredient = getIngredientForId(id)

			return ingredient ? acc + ingredient.packageCost * usage : 0
		}, 0)

		return (
			<li className={cn(cls.wrapper, [className])}>
				<h2 className={cls.title}>{name}</h2>
				<ul className={cls.ing_usage_group}>
					{ingredientsUsage.map(({ id, usage }) => {
						const ingredient = getIngredientForId(id)
						return ingredient ? (
							<li className={cls.item} key={id}>
								<h2>Ингредиент: {ingredient.name}</h2>
								<h2>Количество: {usage}</h2>
							</li>
						) : null
					})}
				</ul>
				<h2 className={cls.price}>
					Цена блюда: <strong>{PRICE} рублей</strong>
				</h2>
				<button onClick={handleEdit} className={cls.edit_btn}>
					Изменить
				</button>
				<button onClick={handleRemove} className={cls.del_btn}>
					Удалить
				</button>
			</li>
		)
	}
)

export { DishItem }
