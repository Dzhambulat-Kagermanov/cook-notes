import { FC, FormEventHandler, useState } from 'react'
import { TClassName } from '@/types/shared'
import { cn } from '@/lib'
import { UiInput } from '@/ui/UiInput'
import { TIngredientProps } from '@/types/Ingredient'
import { useAppDispatch } from '@/hooks'
import { toggleIngredientsUpdated } from '@/store/localStorageUpdated'
import cls from './index.module.css'

interface Props extends TClassName {}
const IngredientsAddForm: FC<Props> = ({ className }) => {
	const dispatch = useAppDispatch()
	const [name, setName] = useState<string>('')
	const [packageCost, setPackageCost] = useState<string>('')
	const [packageVolume, setPackageVolume] = useState<string>('')
	const [unit, setUnit] = useState<TIngredientProps['unit']>('')
	const [clearAfterAdded, setClearAfterAdded] = useState<boolean>(true)

	const handleSubmit: FormEventHandler = e => {
		e.preventDefault()

		if (name.length < 2) {
			alert('Слишком короткое название ингредиента')
		} else if (!Number(packageCost)) {
			alert("Введите числовое значение в поле 'Количество'")
		} else if (unit.length === 0) {
			alert('Введите метрику измерения количества ингредиента')
		} else if (!/^[a-zA-Zа-яА-ЯёЁ]+$/.test(unit)) {
			alert('Введите только строку в метриках ингредиента')
		} else if (!Number(packageVolume)) {
			alert("Введите числовое значение в поле 'Стоимость'")
		} else {
			const addItem: TIngredientProps = {
				id: Date.now(),
				name,
				packageCost: Number(packageCost),
				packageVolume: Number(packageVolume),
				unit,
			}

			const ingredientsList =
				JSON.parse(localStorage.getItem('ingredientsList') as string) || []

			localStorage.setItem(
				'ingredientsList',
				JSON.stringify([...ingredientsList, addItem])
			)
			dispatch(toggleIngredientsUpdated())

			if (clearAfterAdded) {
				setName('')
				setPackageCost('')
				setPackageVolume('')
				setUnit('')
			}
		}
	}

	return (
		<section className={cn(cls.wrapper, [className])}>
			<h2 className={cls.title}>Создать ингредиент</h2>
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
				<UiInput
					label='Очищать форму после добавления'
					className={cls.checkbox}
					//@ts-ignore
					defaultChecked={clearAfterAdded}
					type='checkbox'
					onChange={() => {
						setClearAfterAdded(cur => !cur)
					}}
				/>
				<button className={cls.submit_btn} type='submit'>
					Создать
				</button>
			</form>
		</section>
	)
}

export { IngredientsAddForm }
