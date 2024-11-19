import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCategoriesThunk, setCategory } from "../../store/recipes.slice";

import styles from "./CategoryFilter.module.scss";

const CategoryFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categories, selectedCategory } = useAppSelector(
        (state) => state.recipes
    );

    useEffect(() => {
        dispatch(fetchCategoriesThunk());
    }, [dispatch]);

    const handleCategoryChange = (category: string | null) => {
        dispatch(setCategory(category));
    };

    return (
        <div className={styles.filters}>
            <button onClick={() => handleCategoryChange(null)}>All</button>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    style={{
                        fontWeight:
                            selectedCategory === category ? "bold" : "normal",
                    }}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
