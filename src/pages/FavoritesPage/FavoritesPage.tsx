import React, { useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import styles from "./FavoritesPage.module.scss";
import { removeRecipeFromSelected } from "../../store/recipes.slice";

const FavoritesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { selectedRecipes } = useAppSelector((state) => state.recipes);

    const combinedIngredients = useMemo(() => {
        const ingredientMap: { [key: string]: number } = {};

        selectedRecipes.forEach((recipe) => {
            for (let i = 1; i <= 20; i++) {
                const ingredient =
                    recipe[`strIngredient${i}` as keyof typeof recipe];
                const measure = recipe[`strMeasure${i}` as keyof typeof recipe];

                if (ingredient && measure) {
                    const key = `${ingredient} (${measure})`;
                    ingredientMap[key] = (ingredientMap[key] || 0) + 1;
                }
            }
        });

        return ingredientMap;
    }, [selectedRecipes]);

    if (!selectedRecipes.length) return <p>No recipes selected!</p>;

    return (
        <div className={styles.favorites}>
            <h2>Selected Recipes</h2>
            <div className={styles.favorites__cards}>
                {selectedRecipes.map((recipe) => (
                    <div className={styles.recipeCard} key={recipe.idMeal}>
                        <RecipeCard
                            recipe={recipe}
                            onRemove={() =>
                                dispatch(
                                    removeRecipeFromSelected(recipe.idMeal)
                                )
                            }
                        />
                        <h3>Instructions</h3>
                        <p className={styles.favorites__instructions}>
                            {recipe.strInstructions}
                        </p>
                    </div>
                ))}
            </div>
            <h3>Combined Ingredients</h3>
            <ul>
                {Object.entries(combinedIngredients).map(
                    ([ingredient, count]) => (
                        <li className={styles.favorites__li} key={ingredient}>
                            {ingredient}: {count}
                        </li>
                    )
                )}
            </ul>
        </div>
    );
};

export default FavoritesPage;
