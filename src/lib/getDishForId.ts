import { TDishesProps } from '@/types/Dishes'

export const getDishForId = (
	id: TDishesProps['id']
): TDishesProps | undefined => {
	const dishesList: TDishesProps[] =
		JSON.parse(localStorage.getItem('dishesList') as string) || []

	return dishesList.find(props => {
		return props.id === id
	})
}
