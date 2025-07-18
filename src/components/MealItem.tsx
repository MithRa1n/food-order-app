import React, { useContext } from "react"
import { Meal } from "../types/models"
import { Button } from "./UI/Button"
import { CartContext } from "../store/CartContext"
export const MealItem: React.FC<{ meal: Meal }> = ({ meal }) => {
    const cartCtx = useContext(CartContext)
    function handleAddMealToCart() {
        cartCtx.addItem(meal);
        }

    return(
        <li className="meal-item">
            <article>
                <img src={meal.image} alt={meal.name}/>
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">${(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart} textOnly={false} className="">Add to cart</Button>
                </p>
            </article>
        </li>
    )
}