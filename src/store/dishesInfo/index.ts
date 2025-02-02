import { TDishesIngredientProps } from '@/types/Dishes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface IInitialState {
	usageIngredients: TDishesIngredientProps[]
}
const initialState: IInitialState = {
	usageIngredients: [],
}

const dishesInfo = createSlice({
	name: 'dishesInfo',
	initialState,
	reducers: {
		setUsageIngredients(
			state,
			{ payload }: PayloadAction<TDishesIngredientProps[]>
		) {
			state.usageIngredients = payload
		},
		changeUsageItem(
			state,
			{ payload: { id, usage, unit } }: PayloadAction<TDishesIngredientProps>
		) {
			const index = state.usageIngredients.findIndex(props => {
				return props.id === id
			})
			if (index === -1) {
				state.usageIngredients.push({ id, usage, unit })
			} else {
				state.usageIngredients[index].usage = usage
				state.usageIngredients[index].unit = unit
			}
		},
		removeUsageItem(
			state,
			{ payload: { id } }: PayloadAction<{ id: TDishesIngredientProps['id'] }>
		) {
			state.usageIngredients = state.usageIngredients.filter(props => {
				return props.id !== id
			})
		},
		resetUsageItems(state) {
			state.usageIngredients = []
		},
	},
})

export const usageIngredients = (state: RootState) =>
	state.dishesInfo.usageIngredients

export const {
	changeUsageItem,
	removeUsageItem,
	resetUsageItems,
	setUsageIngredients,
} = dishesInfo.actions
export default dishesInfo.reducer
