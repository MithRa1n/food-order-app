import { useState, useEffect } from "react";
import { Meal } from "../types/models";
import { MealItem } from "./MealItem";
export const Meals = () => {
    const [loadedMeals, setLoadedMeals] = useState<Meal[]>([]);
    useEffect(() => {
    async function fetchMeals() {
        const response = await fetch("http://localhost:3000/meals");

        if (!response.ok) {}
        const meals: Meal[] = await response.json();
        setLoadedMeals(meals); 
    }
        fetchMeals();
    }, [])
   
    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem meal={meal} key={meal.id} />
            ))}
        </ul>
    )
}