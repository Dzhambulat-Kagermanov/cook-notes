import { FC, MouseEventHandler, useEffect, useState } from 'react'
import { TClassName } from '@/types/shared'
import {
	cn,
	getIngredientForId,
	isStaticUnit,
	isVolumeUnit,
	isWeightUnit,
} from '@/lib'
import { TDishesIngredientProps } from '@/types/Dishes'
import { UiInput } from '@/ui'
import cls from './index.module.css'
import { useAppDispatch } from '@/hooks'
import { changeUsageItem, removeUsageItem } from '@/store/dishesInfo'
import { TIngredientProps } from '@/types/Ingredient'

interface Props extends TClassName, TDishesIngredientProps {}
const UsageGroupItem: FC<Props> = ({
	className,
	id,
	usage,
	unit: usageUnit,
}) => {
	const [value, setValue] = useState<number>(usage)
	const ingredient = getIngredientForId(id)
	const dispatch = useAppDispatch()
	const handleRemove: MouseEventHandler = () => {
		dispatch(removeUsageItem({ id }))
	}
	const [unit, setUnit] = useState<TIngredientProps['unit']>(
		usageUnit || ingredient?.unit || 'Нет данных'
	)

	useEffect(() => {
		setUnit(usageUnit)
	}, [usageUnit])

	useEffect(() => {
		if (unit !== 'Нет данных') {
			dispatch(
				changeUsageItem({
					id,
					usage: Number(value),
					unit,
				})
			)
		}
	}, [unit, dispatch])

	return (
		<li className={cn(cls.wrapper, [className])}>
			<h2 className={cls.title}>
				{ingredient ? ingredient.name : 'Нет данных'}
			</h2>
			<div className={cls.content}>
				<UiInput
					inpCls={cls.inp}
					type='number'
					value={value}
					onChange={e => {
						dispatch(
							changeUsageItem({
								id,
								usage: Number(e.target.value),
								unit,
							})
						)
						setValue(Number(e.target.value))
					}}
				/>
				{(isStaticUnit(unit) || unit === 'Нет данных') && (
					<h4 className={cls.metric_unit}>{unit}</h4>
				)}

				{isWeightUnit(unit) && (
					<select
						className={cls.unit_select}
						value={unit}
						onChange={e => {
							setUnit(e.target.value)
						}}
					>
						<option value='гр'>гр (грамм)</option>
						<option value='кг'>кг (килограмм)</option>
					</select>
				)}
				{isVolumeUnit(unit) && (
					<select
						className={cls.unit_select}
						value={unit}
						onChange={e => {
							setUnit(e.target.value)
						}}
					>
						<option value='л'>л (литр)</option>
						<option value='мл'>мл (миллилитр)</option>
					</select>
				)}
				<button type='button' className={cls.remove_btn} onClick={handleRemove}>
					Убрать
				</button>
			</div>
		</li>
	)
}

export { UsageGroupItem }
