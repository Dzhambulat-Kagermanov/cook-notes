import { dishesUpdated } from '@/store/localStorageUpdated'
import { TIngredientProps } from '@/types/Ingredient'
import { useEffect } from 'react'
import { useAppSelector } from './redux-ts'

export const useGetActualDishes = () => {
	const dishesWasUpdated = useAppSelector(dishesUpdated)
	const dishes: TIngredientProps[] =
		JSON.parse(localStorage.getItem('dishesList') as string) || []
	useEffect(() => {}, [dishesWasUpdated])

	return dishes
}
