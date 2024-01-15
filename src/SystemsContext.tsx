import React, { createContext, useState } from "react";
import { systems, System } from "@/utils/data";
import {
    categorizeSystemsByType,
    filterSystems,
    FilterCriteria,
} from "@/utils/filter";

export type SystemsByType = {
    [key: string]: System[];
};

type SystemsContextType = {
    categorizedSystems: SystemsByType;
    applyFilter: (filterCriteria: FilterCriteria, reset?: boolean) => void;
    resetFilter: () => void;
    filterObjects: { [key: string]: string[] };
};

export const SystemsContext = createContext<SystemsContextType>({
    categorizedSystems: {},
    applyFilter: () => {},
    resetFilter: () => {},
    filterObjects: {},
});

type FilterObjects = {
    [key: string]: Set<string>;
};

function generateFilterObjects(systems: System[]): { [key: string]: string[] } {
    const filterObjects: FilterObjects = {};

    systems.forEach((system) => {
        system.privacy_declarations.forEach((declaration) => {
            Object.entries(declaration).forEach(([key, value]) => {
                if (!filterObjects[key]) {
                    filterObjects[key] = new Set<string>();
                }

                if (Array.isArray(value)) {
                    value.forEach((item) => filterObjects[key].add(item));
                } else {
                    filterObjects[key].add(value);
                }
            });
        });
    });
    const result: { [key: string]: string[] } = {};
    Object.keys(filterObjects).forEach((key) => {
        result[key] = Array.from(filterObjects[key]);
    });

    return result;
}

const filterObjects = generateFilterObjects(systems);

export const SystemsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [categorizedSystems, setCategorizedSystems] = useState<SystemsByType>(
        categorizeSystemsByType(systems)
    );
    const applyFilter = (filterCriteria: FilterCriteria, reset = true) => {
        const systemsByType: SystemsByType = reset
            ? categorizeSystemsByType(systems)
            : categorizedSystems;
        const systemsCopy = JSON.parse(JSON.stringify(systemsByType));
        const filteredSystems = filterSystems(systemsCopy, filterCriteria);
        setCategorizedSystems(filteredSystems);
    };

    const resetFilter = () => {
        setCategorizedSystems(categorizeSystemsByType(systems));
    };

    const contextValue: SystemsContextType = {
        categorizedSystems,
        applyFilter,
        resetFilter,
        filterObjects,
    };

    return (
        <SystemsContext.Provider value={contextValue}>
            {children}
        </SystemsContext.Provider>
    );
};
