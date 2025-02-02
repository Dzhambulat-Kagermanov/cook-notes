import { FC, memo } from 'react'
import { TClassName } from '@/types/shared'
import { TDishesProps } from '@/types/Dishes'
import { cn } from '@/lib'
import { UsageGroupItem } from '../UsageGroupItem'
import cls from './index.module.css'

interface Props extends TClassName {
	ingredientsUsage: TDishesProps['ingredientsUsage']
}
const UsageGroup: FC<Props> = memo(({ ingredientsUsage, className }) => {
	return (
		<ul className={cn(cls.wrapper, [className])}>
			{ingredientsUsage.map(({ id, usage, unit }) => {
				return <UsageGroupItem unit={unit} usage={usage} id={id} key={id} />
			})}
		</ul>
	)
})

export { UsageGroup }
