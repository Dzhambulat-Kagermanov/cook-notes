import { TDishesProps } from '@/types/Dishes'
import { TIngredientProps } from '@/types/Ingredient'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface IInitialState {
	editDishId?: TDishesProps['id']
	editIngredientId?: TIngredientProps['id']
}
const initialState: IInitialState = {}

const editData = createSlice({
	name: 'editData',
	initialState,
	reducers: {
		changeEditDishId: (
			state,
			{ payload: { id } }: PayloadAction<{ id: TDishesProps['id'] }>
		) => {
			state.editDishId = id
		},
		changeEditIngredientId: (
			state,
			{ payload: { id } }: PayloadAction<{ id: TIngredientProps['id'] }>
		) => {
			state.editIngredientId = id
		},
	},
})

export const editDishId = (state: RootState) => state.editData.editDishId
export const editIngredientId = (state: RootState) => state.editData.editDishId

export const { changeEditDishId, changeEditIngredientId } = editData.actions
export default editData.reducer
