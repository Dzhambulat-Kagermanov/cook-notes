import { FC, memo } from 'react'
import { TClassName } from '@/types/shared'
import { TDishesProps } from '@/types/Dishes'
import { cn } from '@/lib'
import { UsageGroupItem } from '../UsageGroupItem'
import cls from './index.module.css'
import { useAppDispatch } from '@/hooks'
import { changeUsageItem } from '@/store/dishesInfo'

interface Props extends TClassName {
	ingredientsUsage: TDishesProps['ingredientsUsage']
}
const UsageGroup: FC<Props> = memo(({ ingredientsUsage, className }) => {
	const dispatch = useAppDispatch()
	return (
		<ul className={cn(cls.wrapper, [className])}>
			{ingredientsUsage.map(({ id, usage }) => {
				return (
					<UsageGroupItem
						getValue={item => {
							dispatch(changeUsageItem(item))
						}}
						usage={usage}
						id={id}
						key={id}
					/>
				)
			})}
		</ul>
	)
})

export { UsageGroup }
