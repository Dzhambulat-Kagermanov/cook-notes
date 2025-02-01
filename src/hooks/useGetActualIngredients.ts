import { ingredientsUpdated } from '@/store/localStorageUpdated'
import { TIngredientProps } from '@/types/Ingredient'
import { useEffect } from 'react'
import { useAppSelector } from './redux-ts'

export const useGetActualIngredients = () => {
	const ingredientsWasUpdated = useAppSelector(ingredientsUpdated)
	const ingredients: TIngredientProps[] =
		JSON.parse(localStorage.getItem('ingredientsList') as string) || []
	useEffect(() => {}, [ingredientsWasUpdated])

	return ingredients
}
