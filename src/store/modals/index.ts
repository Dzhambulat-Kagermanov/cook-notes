import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type TModalSlug = string
interface IInitialState {
	modalsStates: Record<
		string,
		{
			state: boolean
		}
	>
}
const initialState: IInitialState = {
	modalsStates: {},
}

const modals = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		hideModal: (
			state,
			{ payload: { slug } }: PayloadAction<{ slug: TModalSlug }>
		) => {
			if (state.modalsStates[slug]) state.modalsStates[slug].state = false
			else {
				state.modalsStates[slug] = {
					state: false,
				}
			}
		},
		showModal: (
			state,
			{ payload: { slug } }: PayloadAction<{ slug: TModalSlug }>
		) => {
			if (state.modalsStates[slug]) state.modalsStates[slug].state = true
			else {
				state.modalsStates[slug] = {
					state: true,
				}
			}
		},
		toggleModal: (
			state,
			{ payload: { slug } }: PayloadAction<{ slug: TModalSlug }>
		) => {
			if (state.modalsStates[slug])
				state.modalsStates[slug].state = !state.modalsStates[slug].state
			else {
				state.modalsStates[slug] = {
					state: true,
				}
			}
		},
	},
})

export const modalsStates = (state: RootState) => state.modals.modalsStates

export const { hideModal, showModal, toggleModal } = modals.actions
export default modals.reducer
