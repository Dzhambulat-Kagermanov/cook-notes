export type TIngredientProps = {
	id: number
	name: string
	unit: string | 'кг' | 'гр' | 'л' | 'мл' | 'ст' | 'шт'
	packageCost: number
	packageVolume: number
}
