import React, { useContext } from "react";
import { SystemsContext } from "@/SystemsContext";
import { Card } from "@/components";
import styles from "./CardView.module.scss";

interface CardViewProps {
    systemType: string;
}

const CardView: React.FC<CardViewProps> = ({ systemType }) => {
    const { categorizedSystems } = useContext(SystemsContext);
    const systems =
        (categorizedSystems && categorizedSystems[systemType]) ?? [];
    if (systems.length === 0)
        return (
            <h2 className={styles[systemType]}>
                No systems found for {systemType}
            </h2>
        );

    return (
        <>
            <h2 className={styles[systemType]}>{systemType}</h2>
            <ul className={styles.grid}>
                {systems.map((system, index) => (
                    <li key={index}>
                        <Card system={system} />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default CardView;
