import styles from '../styles/Add.module.css'
import React from 'react';

export const AddButton = ({setClose}) => {
    return (
        
        
        <div
            onClick={() => setClose(false)}
            className={styles.mainAddButton}
        >
            Add New Pizza
        </div>



    );
};
