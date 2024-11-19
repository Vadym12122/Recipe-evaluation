import { Link } from "react-router-dom";
import { Recipe } from "../../store/recipes.slice";

import styles from "./RecipeCard.module.scss";

type RecipeCardProps = {
    recipe: Recipe;
    onRemove?: () => void;
    onAddToFavorites?: () => void;
};

const RecipeCard: React.FC<RecipeCardProps> = ({
    recipe,
    onRemove,
    onAddToFavorites,
}) => (
    <div className={styles.cards}>
        <div className={styles.card}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} width="300" />
            <h3>{recipe.strMeal}</h3>
            <p>{recipe.strCategory}</p>
            <p>{recipe.strArea}</p>
            <Link to={`/recipe/${recipe.idMeal}`}>View Details</Link>
            {onAddToFavorites && (
                <button
                    className={styles.card__button}
                    onClick={onAddToFavorites}
                >
                    Add to Favorites
                </button>
            )}
            {onRemove && (
                <button className={styles.card__button} onClick={onRemove}>
                    Remove
                </button>
            )}
        </div>
    </div>
);

export default RecipeCard;
