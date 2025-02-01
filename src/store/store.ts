import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import localStorageUpdated from './localStorageUpdated'
import modals from './modals'
import dishesInfo from './dishesInfo'
import editData from './editData'

export const store = configureStore({
	reducer: {
		localStorageUpdated,
		modals,
		dishesInfo,
		editData,
	},
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
