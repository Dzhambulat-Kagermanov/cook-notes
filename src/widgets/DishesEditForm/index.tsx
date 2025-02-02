import { FC, FormEventHandler, useEffect, useMemo, useState } from 'react'
import { TClassName } from '@/types/shared'
import { cn, getDishForId, unitPriceCalculate } from '@/lib'
import { UiInput } from '@/ui/UiInput'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { toggleDishesUpdated } from '@/store/localStorageUpdated'
import { TDishesProps } from '@/types/Dishes'
import { UsageGroup } from './UsageGroup'
import { setUsageIngredients, usageIngredients } from '@/store/dishesInfo'
import { SearchInp } from './SearchInp'
import { hideModal } from '@/store/modals'
import { DISHES_EDIT_MODAL } from '@/constants'
import cls from './index.module.css'

interface Props extends TClassName {
	dishId: number
}
const DishesEditForm: FC<Props> = ({ className, dishId }) => {
	const dish = getDishForId(dishId)

	const dispatch = useAppDispatch()
	const ingredientsUsage = useAppSelector(usageIngredients)
	const [name, setName] = useState<string>(dish?.name || '')
	const [searchIngredient, setSearchIngredient] = useState<string>('')

	useEffect(() => {
		if (dish) {
			dispatch(setUsageIngredients(dish.ingredientsUsage))
		}
	}, [dispatch])

	const PRICE = useMemo<number>(() => {
		return unitPriceCalculate(ingredientsUsage)
	}, [ingredientsUsage])

	const handleSubmit: FormEventHandler = e => {
		e.preventDefault()

		if (name.length < 2) {
			alert('Слишком короткое название блюда')
		} else if (ingredientsUsage.length === 0) {
			alert('Добавьте хотя бы один ингредиент')
		} else {
			const editItem: TDishesProps = {
				id: dishId,
				name,
				ingredientsUsage,
			}

			const dishesList: TDishesProps[] =
				JSON.parse(localStorage.getItem('dishesList') as string) || []

			localStorage.setItem(
				'dishesList',
				JSON.stringify([
					...dishesList.filter(props => {
						return props.id !== editItem.id
					}),
					editItem,
				])
			)
			dispatch(toggleDishesUpdated())
			dispatch(hideModal({ slug: DISHES_EDIT_MODAL }))
		}
	}

	return (
		<section className={cn(cls.wrapper, [className])}>
			<h2 className={cls.title}>Изменить блюдо</h2>
			<form className={cls.form} onSubmit={handleSubmit}>
				<UiInput
					label='Название'
					value={name}
					onChange={e => {
						setName(e.target.value)
					}}
				/>
				<SearchInp
					searchIngredient={searchIngredient}
					setSearchIngredient={setSearchIngredient}
				/>
				<UsageGroup ingredientsUsage={ingredientsUsage} />
				<h2 className={cls.price}>
					Стоимость: <strong>{PRICE} рублей</strong>
				</h2>
				<button className={cls.submit_btn} type='submit'>
					Сохранить изменения
				</button>
			</form>
		</section>
	)
}

export { DishesEditForm }
