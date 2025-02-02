import { FC, memo, MouseEventHandler, useMemo } from 'react'
import { TClassName } from '@/types/shared'
import {
	cn,
	getIngredientForId,
	roundToNearestNonZero,
	unitPriceCalculate,
} from '@/lib'
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

		const PRICE = useMemo<number>(() => {
			return unitPriceCalculate(ingredientsUsage)
		}, [ingredientsUsage])

		return (
			<li className={cn(cls.wrapper, [className])}>
				<h2 className={cls.title}>{name}</h2>
				<ul className={cls.ing_usage_group}>
					{ingredientsUsage.map(({ id, usage, unit }) => {
						const ingredient = getIngredientForId(id)
						return ingredient ? (
							<li className={cls.item} key={id}>
								<h2>
									Ингредиент: <strong>{ingredient.name}</strong>
								</h2>
								<h2>
									Количество:{' '}
									<strong>
										{usage} {unit || 'Нет данных'}
									</strong>
								</h2>
							</li>
						) : null
					})}
				</ul>
				<h2 className={cls.price}>
					Цена блюда: <strong>{roundToNearestNonZero(PRICE)} рублей</strong>
				</h2>
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

export { DishItem }
