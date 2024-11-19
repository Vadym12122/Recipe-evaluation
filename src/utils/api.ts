import axios from "axios";
import { Recipe } from "../store/recipes.slice";

const API_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchAllRecipes = async (): Promise<Recipe[]> => {
    const response = await axios.get(`${API_URL}/search.php?s=`);
    return response.data.meals;
};

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
    const response = await axios.get(`${API_URL}/lookup.php?i=${id}`);
    return response.data.meals[0];
};
