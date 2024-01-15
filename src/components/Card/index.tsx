import React from "react";
import { System } from "../../utils/data";
import { Tags } from "@/components";
import classNames from "classnames";
import styles from "./Card.module.scss";

interface CardProps {
    system: System;
}

const Card: React.FC<CardProps> = ({ system }) => {
    const privacyDeclarationsNames: { name: string; type: string }[] = [];
    const privacyDeclarationsCategories: { name: string; type: string }[] = [];
    // Create Tags objects with name and type for each privacy declaration
    system.privacy_declarations.forEach((declaration) => {
        privacyDeclarationsNames.push({
            name: declaration.name,
            type: declaration.data_use.replace(/\./g, "_"),
        });
        const categories = declaration.data_categories.map((category) => ({
            name: category.split(".").pop() || "undefined",
            type: "data_category",
        }));
        privacyDeclarationsCategories.push(...categories);
    });

    return (
        <div className={classNames(styles.card, styles[system.system_type])}>
            <h3>{system.name}</h3>
            <div className={styles.content}>{system.description}</div>
            <Tags tags={privacyDeclarationsNames} />
            <Tags tags={privacyDeclarationsCategories} />
        </div>
    );
};

export default Card;
