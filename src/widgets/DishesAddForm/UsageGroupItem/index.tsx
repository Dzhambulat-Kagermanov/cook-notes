import { FC, MouseEventHandler, useState } from 'react'
import { TClassName } from '@/types/shared'
import { cn, getIngredientForId } from '@/lib'
import { TDishesIngredientProps } from '@/types/Dishes'
import { UiInput } from '@/ui'
import cls from './index.module.css'
import { useAppDispatch } from '@/hooks'
import { removeUsageItem } from '@/store/dishesInfo'

interface Props extends TClassName, TDishesIngredientProps {
	getValue: (params: TDishesIngredientProps) => void
}
const UsageGroupItem: FC<Props> = ({ className, getValue, id, usage }) => {
	const [value, setValue] = useState<number>(usage)
	const ingredient = getIngredientForId(id)
	const dispatch = useAppDispatch()
	const handleRemove: MouseEventHandler = () => {
		dispatch(removeUsageItem({ id }))
	}

	return (
		<li className={cn(cls.wrapper, [className])}>
			<h2 className={cls.title}>
				{ingredient ? ingredient.name : 'Нет данных'}
			</h2>
			<div className={cls.content}>
				<UiInput
					type='number'
					value={value}
					onChange={e => {
						getValue({ id, usage: Number(e.target.value) })
						setValue(Number(e.target.value))
					}}
				/>
				<button type='button' className={cls.remove_btn} onClick={handleRemove}>
					Убрать
				</button>
			</div>
		</li>
	)
}

export { UsageGroupItem }
