import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Recipe } from "../../store/recipes.slice";
import axios from "axios";

const RecipeDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );
            setRecipe(response.data.meals[0]);
        };
        fetchRecipe();
    }, [id]);

    if (!recipe) return <p>Loading...</p>;

    return (
        <div>
            <h1>{recipe.strMeal}</h1>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <p>{recipe.strCategory}</p>
            <p>{recipe.strArea}</p>
            <p>{recipe.strInstructions}</p>
        </div>
    );
};

export default RecipeDetailsPage;
