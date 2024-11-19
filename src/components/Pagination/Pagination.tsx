import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPage } from "../../store/recipes.slice";

import styles from "./Pagination.module.scss";

interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({
    itemsPerPage,
    totalItems,
}) => {
    const dispatch = useAppDispatch();
    const { currentPage } = useAppSelector((state) => state.recipes);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const changePage = (page: number) => {
        if (page > 0 && page <= totalPages) {
            dispatch(setPage(page));
        }
    };

    const renderPages = () => {
        const pages = [];
        if (totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 7) {
                for (let i = 1; i <= 7; i++) pages.push(i);
                pages.push("...");
                pages.push(totalPages);
            } else if (currentPage > 7 && currentPage < totalPages - 3) {
                pages.push(1);
                pages.push("...");
                for (let i = currentPage - 3; i <= currentPage + 3; i++)
                    pages.push(i);
                pages.push("...");
                pages.push(totalPages);
            } else {
                pages.push(1);
                pages.push("...");
                for (let i = totalPages - 6; i <= totalPages; i++)
                    pages.push(i);
            }
        }
        return pages;
    };

    return (
        <div className={styles.pagination}>
            <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                {"<"}
            </button>
            {renderPages().map((page, index) =>
                typeof page === "number" ? (
                    <button
                        key={index}
                        className={currentPage === page ? styles.active : ""}
                        onClick={() => changePage(page)}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index}>...</span>
                )
            )}
            <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                {">"}
            </button>
        </div>
    );
};

export default Pagination;
