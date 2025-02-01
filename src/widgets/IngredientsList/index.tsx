import { FC, useEffect } from 'react'
import { TClassName } from '@/types/shared'
import { cn } from '@/lib'
import { IngredientItem } from '@/entities/IngredientItem'
import { useAppSelector } from '@/hooks'
import { ingredientsUpdated } from '@/store/localStorageUpdated'
import cls from './index.module.css'
import { TIngredientProps } from '@/types/Ingredient'

interface Props extends TClassName {}
const IngredientsList: FC<Props> = ({ className }) => {
	const ingredientsWasUpdated = useAppSelector(ingredientsUpdated)
	const ingredients: TIngredientProps[] =
		JSON.parse(localStorage.getItem('ingredientsList') as string) || []
	useEffect(() => {}, [ingredientsWasUpdated])

	return (
		<section className={cn(cls.wrapper, [className])}>
			<h2 className={cn(cls.title)}>Ингредиенты</h2>
			{ingredients.length !== 0 ? (
				<ul className={cls.group}>
					{ingredients.map(({ id, ...props }) => {
						return <IngredientItem id={id} key={id} {...props} />
					})}
				</ul>
			) : (
				<p className={cls.empty_text}>Нет данных \:</p>
			)}
		</section>
	)
}

export { IngredientsList }
