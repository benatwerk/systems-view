import React, { useState, useContext } from "react";
import { SystemsContext } from "@/SystemsContext";
import styles from "./Filters.module.scss";

export const Search: React.FC = () => {
    const { applyFilter, resetFilter } = useContext(SystemsContext);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value;
        setSearchTerm(searchValue);

        if (event.target.value) {
            const filterCriteria = {
                name: searchValue,
            };
            applyFilter(filterCriteria);
        } else {
            resetFilter();
        }
    };

    return (
        <div className={styles.search}>
            <input
                type="text"
                placeholder="Search by system name..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export const Select: React.FC = () => {
    const { applyFilter, filterObjects } = useContext(SystemsContext);

    const handleFilterChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
        filterType: string
    ) => {
        const filterValue = event.target.value;
        const isArray = event.target.dataset.isArray === "true";
        const filterCriteria = {
            privacy_declarations: {
                [filterType]: isArray ? [filterValue] : filterValue,
            },
        };

        applyFilter(filterCriteria);
    };

    const generateSelectOptions = (key: string) => {
        return filterObjects[key]?.map((optionValue: string) => (
            <option key={optionValue} value={optionValue}>
                {optionValue}
            </option>
        ));
    };

    return (
        <div className={styles.select}>
            {Object.keys(filterObjects).map((key) => {
                const isArray = Array.isArray(filterObjects[key][0]);
                return (
                    <select
                        key={key}
                        onChange={(e) => handleFilterChange(e, key)}
                        data-is-array={isArray}
                    >
                        <option value="" hidden>{`Select ${key}`}</option>
                        {generateSelectOptions(key)}
                    </select>
                );
            })}
        </div>
    );
};

export const ResetFilters: React.FC = () => {
    const { resetFilter } = useContext(SystemsContext);
    const handleReset = () => {
        resetFilter();
    };

    return (
        <div className={styles.reset}>
            <button onClick={handleReset}>Reset Filter</button>
        </div>
    );
};

export const Filters: React.FC = () => {
    return (
        <div className={styles.filters}>
            <Search />
            <Select />
            <ResetFilters />
        </div>
    );
};
