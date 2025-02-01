import { FC, FormEventHandler, useState } from 'react'
import { TClassName } from '@/types/shared'
import { cn, getIngredientForId } from '@/lib'
import { UiInput } from '@/ui/UiInput'
import { useAppDispatch } from '@/hooks'
import {
	toggleDishesUpdated,
	toggleIngredientsUpdated,
} from '@/store/localStorageUpdated'
import { hideModal } from '@/store/modals'
import { INGREDIENTS_EDIT_MODAL } from '@/constants'
import { TIngredientProps } from '@/types/Ingredient'
import cls from './index.module.css'

interface Props extends TClassName {
	ingredientId: number
}
const IngredientsEditForm: FC<Props> = ({ className, ingredientId }) => {
	const ingredient = getIngredientForId(ingredientId)
	const dispatch = useAppDispatch()
	const [name, setName] = useState<string>(ingredient?.name || '')
	const [packageCost, setPackageCost] = useState<string>(
		ingredient?.packageCost.toString() || ''
	)
	const [packageVolume, setPackageVolume] = useState<string>(
		ingredient?.packageVolume.toString() || ''
	)
	const [unit, setUnit] = useState<string>(ingredient?.unit || '')

	const handleSubmit: FormEventHandler = e => {
		e.preventDefault()

		if (name.length < 2) {
			alert('Слишком короткое название блюда')
		} else {
			const editItem: TIngredientProps = {
				id: ingredientId,
				name,
				packageCost: Number(packageCost),
				packageVolume: Number(packageVolume),
				unit,
			}

			const ingredientsList: TIngredientProps[] =
				JSON.parse(localStorage.getItem('ingredientsList') as string) || []

			localStorage.setItem(
				'ingredientsList',
				JSON.stringify([
					...ingredientsList.filter(props => {
						return props.id !== editItem.id
					}),
					editItem,
				])
			)
			dispatch(toggleIngredientsUpdated())
			dispatch(toggleDishesUpdated())
			dispatch(hideModal({ slug: INGREDIENTS_EDIT_MODAL }))
		}
	}

	return (
		<section className={cn(cls.wrapper, [className])}>
			<h2 className={cls.title}>Изменить ингредиент</h2>
			<form className={cls.form} onSubmit={handleSubmit}>
				<UiInput
					label='Название'
					value={name}
					onChange={e => {
						setName(e.target.value)
					}}
				/>
				<div className={cls.metric}>
					<UiInput
						className={cls.inp_wrapper}
						type='number'
						label='Количество'
						value={packageVolume}
						onChange={e => {
							setPackageVolume(e.target.value)
						}}
					/>
					<UiInput
						className={cls.inp_wrapper}
						label='Мера подсчета (гр, кг и т.д)'
						value={unit}
						onChange={e => {
							setUnit(e.target.value)
						}}
					/>
				</div>
				<UiInput
					type='number'
					label='Стоимость'
					value={packageCost}
					onChange={e => {
						setPackageCost(e.target.value)
					}}
				/>
				<button className={cls.submit_btn} type='submit'>
					Создать
				</button>
			</form>
		</section>
	)
}

export { IngredientsEditForm }
