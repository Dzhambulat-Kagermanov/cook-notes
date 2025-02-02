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
import { TDishesIngredientProps, TDishesProps } from '@/types/Dishes'

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

			let unitWasChanged: boolean = false

			localStorage.setItem(
				'ingredientsList',
				JSON.stringify([
					...ingredientsList.filter(props => {
						if (props.id === editItem.id) {
							if (unit !== props.unit) {
								unitWasChanged = true
							}
						}

						return props.id !== editItem.id
					}),
					editItem,
				])
			)
			if (unitWasChanged) {
				const dishesList: TDishesProps[] =
					JSON.parse(localStorage.getItem('dishesList') as string) || []

				localStorage.setItem(
					'dishesList',
					JSON.stringify(
						dishesList.map(({ ingredientsUsage, ...other }) => {
							return {
								...other,
								ingredientsUsage: ingredientsUsage.map(
									({ id, usage, ...other }) => {
										return id === ingredientId
											? ({
													id,
													unit,
													usage,
											  } as TDishesIngredientProps)
											: ({
													id,
													usage,
													unit: other.unit,
											  } as TDishesIngredientProps)
									}
								),
							}
						})
					)
				)
			}
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
					<select
						className={cls.unit_select}
						value={unit}
						onChange={e => {
							setUnit(e.target.value)
						}}
					>
						<option value='' disabled hidden>
							Мера подсчета (гр, кг и т.д)
						</option>
						<option value='гр'>гр (грамм)</option>
						<option value='кг'>кг (килограмм)</option>
						<option value='л'>л (литр)</option>
						<option value='мл'>мл (миллилитр)</option>
						<option value='шт'>шт (штука)</option>
						<option value='ст'>ст (стакан)</option>
					</select>
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
					Сохранить изменения
				</button>
			</form>
		</section>
	)
}

export { IngredientsEditForm }
