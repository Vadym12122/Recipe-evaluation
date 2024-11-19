import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setFilteredListBySearch } from "../../store/recipes.slice";

import styles from "./SearchBar.module.scss";

const SearchBar: React.FC = () => {
    const dispatch = useAppDispatch();

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [debouncedTerm, setDebouncedTerm] = useState<string>("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        dispatch(setFilteredListBySearch(debouncedTerm));
    }, [debouncedTerm, dispatch]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSearchTerm(e.target.value);
    };

    return (
        <input
            className={styles.search}
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={handleInputChange}
        />
    );
};

export default SearchBar;
