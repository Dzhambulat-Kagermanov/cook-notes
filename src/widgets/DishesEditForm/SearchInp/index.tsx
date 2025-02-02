import { FC } from 'react'
import { UiInput } from '@/ui'
import { getIngredientForId } from '@/lib'
import { changeUsageItem, usageIngredients } from '@/store/dishesInfo'
import { TDishesIngredientProps } from '@/types/Dishes'
import {
	useAppDispatch,
	useAppSelector,
	useGetActualIngredients,
} from '@/hooks'
import cls from './index.module.css'
import { TState } from '@/types/shared'

interface Props {
	searchIngredient: string
	setSearchIngredient: TState<string>
}
const SearchInp: FC<Props> = ({ searchIngredient, setSearchIngredient }) => {
	const ingredients = useGetActualIngredients()
	const ingredientsUsage = useAppSelector(usageIngredients)
	const dispatch = useAppDispatch()
	const handleSearchItemClick = (item: TDishesIngredientProps) => {
		setSearchIngredient(getIngredientForId(item.id)?.name || searchIngredient)
		dispatch(changeUsageItem(item))
	}
	const filteredIngredients = ingredients.filter(({ name, ...props }) => {
		return !ingredientsUsage.find(({ id }) => {
			return props.id === id
		})
			? name.toLowerCase().includes(searchIngredient.toLowerCase())
			: false
	})
	return (
		<div className={cls.wrapper}>
			<UiInput
				label='Ингредиенты'
				type='search'
				value={searchIngredient}
				onChange={e => {
					setSearchIngredient(e.target.value)
				}}
			/>
			{searchIngredient && filteredIngredients.length ? (
				<ul className={cls.search_inp_content}>
					{filteredIngredients.map(({ id, name, unit }) => {
						return (
							<li
								className={cls.item}
								key={id}
								onClick={() => {
									handleSearchItemClick({ id, usage: 1, unit })
								}}
							>
								<h2>{name}</h2>
							</li>
						)
					})}
				</ul>
			) : null}
		</div>
	)
}

export { SearchInp }
