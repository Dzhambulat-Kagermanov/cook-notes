import { TDishesIngredientProps, TDishesProps } from '@/types/Dishes'
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
			{
				payload: { ingredientsUsage },
			}: PayloadAction<{ ingredientsUsage: TDishesProps['ingredientsUsage'] }>
		) {
			state.usageIngredients = ingredientsUsage
		},
		changeUsageItem(
			state,
			{ payload: { id, usage } }: PayloadAction<TDishesIngredientProps>
		) {
			const index = state.usageIngredients.findIndex(props => {
				return props.id === id
			})
			index === -1
				? state.usageIngredients.push({ id, usage })
				: (state.usageIngredients[index].usage = usage)
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
