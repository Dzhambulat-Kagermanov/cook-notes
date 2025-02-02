export type TDishesIngredientProps = {
	id: number
	usage: number
	unit: string
}
export type TDishesProps = {
	id: number
	name: string
	ingredientsUsage: {
		id: number
		usage: number
		unit: string
	}[]
}
