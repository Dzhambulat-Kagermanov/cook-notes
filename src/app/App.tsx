import { FC } from 'react'
import { IngredientsList } from '@/widgets/IngredientsList'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { DishesList } from '@/widgets/DishesList'
import { IngredientsAddModal } from '@/widgets/IngredientsAddModal'
import { FormsOpenBtns } from '@/widgets/FormsOpenBtns'
import cls from './App.module.css'
import { DishesAddModal } from '@/widgets/DishesAddModal'
import { DishesEditModal } from '@/widgets/DishesEditModal'
import { IngredientsEditModal } from '@/widgets/IngredientsEditModal'

interface Props {}
const App: FC<Props> = () => {
	return (
		<Provider store={store}>
			<main className={cls.main}>
				<IngredientsList className={cls.ingredients_list} />
				<DishesList className={cls.dishes_list} />
				<FormsOpenBtns />
			</main>
			<IngredientsAddModal />
			<IngredientsEditModal />
			<DishesAddModal />
			<DishesEditModal />
		</Provider>
	)
}

export { App }
//ingredientsList
//dishesList
