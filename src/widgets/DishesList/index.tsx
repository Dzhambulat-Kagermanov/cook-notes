import { FC, useEffect } from 'react'
import { TClassName } from '@/types/shared'
import { cn } from '@/lib'
import cls from './index.module.css'
import { DishItem } from '@/entities/DishItem'
import { TDishesProps } from '@/types/Dishes'
import { useAppSelector } from '@/hooks'
import { dishesUpdated } from '@/store/localStorageUpdated'

interface Props extends TClassName {}
const DishesList: FC<Props> = ({ className }) => {
	const dishesWasUpdated = useAppSelector(dishesUpdated)
	const dishes: TDishesProps[] =
		JSON.parse(localStorage.getItem('dishesList') as string) || []
	useEffect(() => {}, [dishesWasUpdated])

	return (
		<section className={cn(cls.wrapper, [className])}>
			<h2 className={cn(cls.title)}>Блюда</h2>
			{dishes.length !== 0 ? (
				<ul className={cls.group}>
					{dishes.map(({ id, ...props }) => {
						return <DishItem key={id} id={id} {...props} />
					})}
				</ul>
			) : (
				<p className={cls.empty_text}>Нет данных \:</p>
			)}
		</section>
	)
}

export { DishesList }
