import { TIngredientProps } from '@/types/Ingredient'

export const isStaticUnit = (unit: TIngredientProps['unit']): boolean => {
	return (isWeightUnit(unit) || isVolumeUnit(unit)) === false
}
export const isWeightUnit = (unit: TIngredientProps['unit']): boolean => {
	return unit === 'кг' || unit === 'гр'
}
export const isVolumeUnit = (unit: TIngredientProps['unit']): boolean => {
	return unit === 'л' || unit === 'мл'
}
