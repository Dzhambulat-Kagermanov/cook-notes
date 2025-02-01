import { TIngredientProps } from '@/types/Ingredient'

export const getIngredientForId = (
	id: TIngredientProps['id']
): TIngredientProps | undefined => {
	const ingredientsList: TIngredientProps[] =
		JSON.parse(localStorage.getItem('ingredientsList') as string) || []

	return ingredientsList.find(props => {
		return props.id === id
	})
}
