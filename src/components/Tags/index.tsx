import React from "react";
import styles from "./Tags.module.scss";

type TagsProps = {
    tags: { name: string; type: string }[];
};

const Tags: React.FC<TagsProps> = ({ tags }) => {
    return (
        <ul className={styles.tags}>
            {tags.map((tag, index) => (
                <li className={styles[tag.type]} key={index}>
                    {tag.name}
                </li>
            ))}
        </ul>
    );
};

export default Tags;
