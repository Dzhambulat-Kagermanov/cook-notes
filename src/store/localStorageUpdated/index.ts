import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface IInitialState {
	ingredientsUpdated: boolean
	dishesUpdated: boolean
}
const initialState: IInitialState = {
	dishesUpdated: false,
	ingredientsUpdated: false,
}

const localStorageUpdated = createSlice({
	name: 'localStorageUpdated',
	initialState,
	reducers: {
		toggleDishesUpdated(state) {
			state.dishesUpdated = !state.dishesUpdated
		},
		toggleIngredientsUpdated(state) {
			state.ingredientsUpdated = !state.ingredientsUpdated
		},
	},
})

export const dishesUpdated = (state: RootState) =>
	state.localStorageUpdated.dishesUpdated
export const ingredientsUpdated = (state: RootState) =>
	state.localStorageUpdated.ingredientsUpdated

export const { toggleDishesUpdated, toggleIngredientsUpdated } =
	localStorageUpdated.actions
export default localStorageUpdated.reducer
