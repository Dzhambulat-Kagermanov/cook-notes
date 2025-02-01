import { ReactNode, Dispatch, SetStateAction } from 'react'

export type TClassName = { className?: string }
export type TChildren = { children: ReactNode }

export type TState<T> = Dispatch<SetStateAction<T>>
