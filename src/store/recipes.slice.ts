import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllRecipes } from "../utils/api";
import axios from "axios";

export interface Recipe {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strMealThumb: string;
    strInstructions: string;
    [key: string]: any; // Для додаткових ключів, які можуть прийти з API
}

interface RecipesState {
    list: Recipe[];
    selectedRecipes: Recipe[];
    filteredList: Recipe[];
    favorites: Recipe[];
    categories: string[];
    selectedCategory: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    currentPage: number;
    totalPages: number;
}

const initialState: RecipesState = {
    list: [],
    selectedRecipes: [],
    filteredList: [],
    favorites: [],
    categories: [],
    selectedCategory: null,
    status: "idle",
    currentPage: 1,
    totalPages: 1,
};

// Отримуємо категорії
export const fetchCategoriesThunk = createAsyncThunk(
    "recipes/fetchCategories",
    async () => {
        const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
        );
        return response.data.meals.map(
            (meal: { strCategory: string }) => meal.strCategory
        );
    }
);

// Отримуємо рецепти по категорії
export const fetchRecipesByCategory = createAsyncThunk(
    "recipes/fetchRecipesByCategory",
    async (category: string) => {
        const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        return response.data.meals;
    }
);

export const fetchRecipes = createAsyncThunk(
    "recipes/fetchRecipes",
    async () => {
        return await fetchAllRecipes();
    }
);

const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        setRecipes(state, action: PayloadAction<Recipe[]>) {
            state.list = action.payload;
        },
        addRecipeToSelected(state, action: PayloadAction<Recipe>) {
            if (
                !state.selectedRecipes.find(
                    (r) => r.idMeal === action.payload.idMeal
                )
            ) {
                state.selectedRecipes.push(action.payload);
            }
        },
        removeRecipeFromSelected(state, action: PayloadAction<string>) {
            state.selectedRecipes = state.selectedRecipes.filter(
                (r) => r.idMeal !== action.payload
            );
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
        addFavorite: (state, action: PayloadAction<Recipe>) => {
            state.favorites.push(action.payload);
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter(
                (recipe) => recipe.idMeal !== action.payload
            );
        },
        setCategory: (state, action: PayloadAction<string | null>) => {
            state.selectedCategory = action.payload;

            if (action.payload) {
                state.filteredList = state.list.filter(
                    (recipe) => recipe.strCategory === action.payload
                );
            } else {
                state.filteredList = state.list;
            }
        },
        setFilteredListBySearch: (state, action: PayloadAction<string>) => {
            const searchQuery = action.payload.toLowerCase();
            state.filteredList = state.list.filter((recipe) =>
                recipe.strMeal.toLowerCase().includes(searchQuery)
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                fetchRecipes.fulfilled,
                (state, action: PayloadAction<Recipe[]>) => {
                    state.list = action.payload;
                    state.status = "succeeded";
                }
            )
            .addCase(
                fetchRecipesByCategory.fulfilled,
                (state, action: PayloadAction<Recipe[]>) => {
                    state.list = action.payload;
                    state.filteredList = action.payload;
                    state.status = "succeeded";
                }
            )
            .addCase(
                fetchCategoriesThunk.fulfilled,
                (state, action: PayloadAction<string[]>) => {
                    state.categories = action.payload;
                }
            )
            .addCase(fetchRecipes.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const {
    setPage,
    setTotalPages,
    addFavorite,
    removeFavorite,
    setCategory,
    setFilteredListBySearch,
    setRecipes,
    addRecipeToSelected,
    removeRecipeFromSelected,
} = recipesSlice.actions;
export default recipesSlice.reducer;
