import { TDishesIngredientProps } from '@/types/Dishes'
import { getIngredientForId } from './getIngredientForId'
import { isStaticUnit, isWeightUnit, isVolumeUnit } from './getMetricType'

export const unitPriceCalculate = (
	ingredientsUsage: TDishesIngredientProps[]
): number => {
	return ingredientsUsage.reduce((acc, { usage, id, unit }) => {
		const ingredient = getIngredientForId(id)
		let result: number

		if (!ingredient) result = 0
		else if (isStaticUnit(ingredient.unit)) {
			result = acc + (ingredient.packageCost / ingredient.packageVolume) * usage
		} else if (isWeightUnit(ingredient.unit)) {
			if (ingredient.unit === 'кг') {
				if (unit === 'кг') {
					result =
						acc + (ingredient.packageCost / ingredient.packageVolume) * usage
				} else if (unit === 'гр') {
					result =
						acc +
						(ingredient.packageCost / ingredient.packageVolume / 1000) * usage
				}
			} else if (ingredient.unit === 'гр') {
				if (unit === 'кг') {
					result =
						acc + (ingredient.packageCost / ingredient.packageVolume) * usage
				} else if (unit === 'гр') {
					result =
						acc + (ingredient.packageCost / ingredient.packageVolume) * usage
				}
			}
		} else if (isVolumeUnit(ingredient.unit)) {
			if (ingredient.unit === 'л') {
				if (unit === 'л') {
					result =
						acc + (ingredient.packageCost / ingredient.packageVolume) * usage
				} else if (unit === 'мл') {
					result =
						acc +
						(ingredient.packageCost / ingredient.packageVolume / 1000) * usage
				}
			} else if (ingredient.unit === 'мл') {
				if (unit === 'л') {
					result =
						acc + (ingredient.packageCost / ingredient.packageVolume) * usage
				} else if (unit === 'мл') {
					result =
						acc + (ingredient.packageCost / ingredient.packageVolume) * usage
				}
			}
		} else {
			result = 0
		}
		//@ts-ignore
		return result
	}, 0)
}
