import { FC, FormEventHandler, useMemo, useState } from 'react'
import { TClassName } from '@/types/shared'
import { cn, getIngredientForId, unitPriceCalculate } from '@/lib'
import { UiInput } from '@/ui/UiInput'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { toggleDishesUpdated } from '@/store/localStorageUpdated'
import { TDishesProps } from '@/types/Dishes'
import { UsageGroup } from './UsageGroup'
import { usageIngredients } from '@/store/dishesInfo'
import cls from './index.module.css'
import { SearchInp } from './SearchInp'

interface Props extends TClassName {}
const DishesAddForm: FC<Props> = ({ className }) => {
	const dispatch = useAppDispatch()
	const ingredientsUsage = useAppSelector(usageIngredients)
	const [name, setName] = useState<string>('')
	const [searchIngredient, setSearchIngredient] = useState<string>('')

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
			const addItem: TDishesProps = {
				id: Date.now(),
				name,
				ingredientsUsage,
			}

			const dishesList =
				JSON.parse(localStorage.getItem('dishesList') as string) || []

			localStorage.setItem(
				'dishesList',
				JSON.stringify([...dishesList, addItem])
			)
			dispatch(toggleDishesUpdated())
		}
	}

	return (
		<section className={cn(cls.wrapper, [className])}>
			<h2 className={cls.title}>Создать блюдо</h2>
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
				<UsageGroup
					ingredientsUsage={ingredientsUsage}
					className={cls.usage_group}
				/>
				<h2 className={cls.price}>
					Стоимость: <strong>{PRICE} рублей</strong>
				</h2>
				<button className={cls.submit_btn} type='submit'>
					Создать
				</button>
			</form>
		</section>
	)
}

export { DishesAddForm }
