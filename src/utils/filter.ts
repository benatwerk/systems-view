import { System } from "./data";

/**
 * Categorizes an array of systems by their type.
 *
 * @param systems - The array of systems to be categorized.
 * @returns An object where the keys represent the system types and the values are arrays of systems of that type.
 */
export function categorizeSystemsByType(systems: System[]): {
    [key: string]: System[];
} {
    const systemsByType: { [key: string]: System[] } = {};
    for (const system of systems) {
        if (!systemsByType[system.system_type]) {
            systemsByType[system.system_type] = [];
        }
        systemsByType[system.system_type].push(system);
    }
    return systemsByType;
}

export type FilterCriteria = {
    [key: string]:
        | string
        | string[]
        | { [nestedKey: string]: string | string[] };
};

/**
 * Filters an object of systems by the given filter criteria.
 *
 * @param systemsByType - An object where the keys represent the system types and the values are arrays of systems of that type.
 * @param filterCriteria - An object where the keys represent the system properties and the values are the values to filter by.
 * @returns An object where the keys represent the system types and the values are arrays of systems of that type.
 */
export function filterSystems(
    systemsByType: { [key: string]: System[] },
    filterCriteria: FilterCriteria
): { [key: string]: System[] } {
    const filteredSystemsByType: { [key: string]: System[] } = {};

    Object.keys(systemsByType).forEach((type) => {
        filteredSystemsByType[type] = systemsByType[type].filter((system) => {
            return Object.entries(filterCriteria).every(
                ([filterKey, filterValue]) => {
                    // Special case for name filter
                    if (
                        filterKey === "name" &&
                        typeof filterValue === "string"
                    ) {
                        return system.name
                            .toLowerCase()
                            .includes(filterValue.toLowerCase());
                    }
                    // Nested filters
                    if (
                        typeof filterValue === "object" &&
                        !Array.isArray(filterValue)
                    ) {
                        return (system[filterKey] as System[]).some((item) => {
                            return Object.entries(filterValue).every(
                                ([nestedKey, nestedValue]) => {
                                    const itemValue = item[
                                        nestedKey
                                    ] as string[];
                                    if (Array.isArray(nestedValue)) {
                                        return nestedValue.some((val) =>
                                            itemValue.includes(val)
                                        );
                                    }
                                    if (Array.isArray(itemValue)) {
                                        return itemValue.includes(nestedValue);
                                    }
                                    return itemValue === nestedValue;
                                }
                            );
                        });
                    }
                    // Regular filters
                    const systemValue = system[filterKey] as string;
                    if (Array.isArray(filterValue)) {
                        return filterValue.includes(systemValue);
                    }
                    return systemValue === filterValue;
                }
            );
        });
    });

    return filteredSystemsByType;
}
