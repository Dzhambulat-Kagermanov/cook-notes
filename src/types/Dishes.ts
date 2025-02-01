export type TDishesIngredientProps = {
	id: number
	usage: number
}
export type TDishesProps = {
	id: number
	name: string
	ingredientsUsage: {
		id: number
		usage: number
	}[]
}
