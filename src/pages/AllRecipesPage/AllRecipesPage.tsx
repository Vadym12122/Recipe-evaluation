import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    addRecipeToSelected,
    fetchRecipes,
    fetchRecipesByCategory,
    setTotalPages,
    setPage,
} from "../../store/recipes.slice";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import Pagination from "../../components/Pagination/Pagination";

import styles from "./AllRecipesPage.module.scss";
import SearchBar from "../../components/SearchBar/SearchBar";

const AllRecipesPage = () => {
    const dispatch = useAppDispatch();
    const { filteredList, list, status, selectedCategory, currentPage } =
        useAppSelector((state) => state.recipes);

    const itemsPerPage = 8;

    const indexOfLastRecipe = currentPage * itemsPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;

    const currentRecipes = (filteredList.length ? filteredList : list).slice(
        indexOfFirstRecipe,
        indexOfLastRecipe
    );

    useEffect(() => {
        if (selectedCategory) {
            dispatch(fetchRecipesByCategory(selectedCategory));
        } else {
            dispatch(fetchRecipes());
        }
    }, [dispatch, selectedCategory]);

    useEffect(() => {
        const totalRecipes = filteredList.length || list.length;
        const total = Math.ceil(totalRecipes / itemsPerPage);

        dispatch(setTotalPages(total));

        // Якщо поточна сторінка більше загальної кількості сторінок,
        // перемикаємося на першу сторінку.
        if (currentPage > total) {
            dispatch(setPage(1));
        }
    }, [dispatch, filteredList, list, currentPage, itemsPerPage]);

    if (status === "loading") return <p>Loading...</p>;

    return (
        <div>
            <SearchBar />
            <CategoryFilter />
            <div className={styles.cards}>
                {currentRecipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.idMeal}
                        recipe={recipe}
                        onAddToFavorites={() =>
                            dispatch(addRecipeToSelected(recipe))
                        }
                    />
                ))}
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredList.length || list.length}
            />
        </div>
    );
};

export default AllRecipesPage;
