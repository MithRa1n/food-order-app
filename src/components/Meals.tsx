import { Meal } from "../types/models";
import { MealItem } from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
const requestConfig = {};

export const Meals = () => {
    const { data: loadedMeals, isLoading, error } =
     useHttp("https://687199ec76a5723aacd25b6e.mockapi.io/meals", requestConfig, []);

    if (isLoading) {
        return <p className="center">Fetching meals...</p>
    }

    if (error) {
        return <Error title="An error occurred!" message={error} />; 
    }

    return (
        <ul id="meals">
            {loadedMeals?.map((meal: Meal) => (
                <MealItem meal={meal} key={meal.id} />
            ))}
        </ul>
    )
}