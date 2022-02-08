import React, { useState } from 'react';
import styles from '../styles/Add.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';




export const Add = ({setClose}) => {
    const [file, setFile] = useState(null); // product image path
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [prices, setPrices] = useState([]);
    const [extraOptions, setExtraOptions] = useState([]);
    const [extra, setExtra] = useState(null);

    const handleExtraInput = (e) => {
        setExtra({...extra, [e.target.name]: e.target.value});
    }

    const handleExtra = (e) => {
        setExtraOptions((prev) => [...prev, extra])
    }

    const changePrice = (e, index) => {
        const currentPrices = prices;
        currentPrices[index] = e.target.value;
        setPrices(currentPrices);
    }

    // Upload product image
    const handleCreate = async() => {
        const data = new FormData();
        data.append("file", file); // set file to upload
        data.append("upload_preset", "ecommerce"); // set upload presets from cloudinary settings
        try {
            // Upload image to cloudinary
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/dnhg4hw4b/image/upload", 
                data
            );
            
            const {url} = uploadRes.data; // extract coludinary image url
            
            /* Create new product with all the new data */
            const newProduct = {
                title,
                desc,
                price: prices,
                extraOptions,
                img: url,
            };
            console.log(newProduct);
            await axios.post("http://localhost:3000/api/products", newProduct); // Save new product to the DB
            setClose(true); // Close modal
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                
                {/* Close modal */}
                <span 
                    onClick={() => setClose(true)}
                    className={styles.close}
                >X</span>
                
                <h1>Add new pizza</h1>

                {/* Image upload */}
                <div className={styles.item}>
                    <label className={styles.label}>Choose an image</label>
                    <input type="file" onChange={(e)=> setFile(e.target.files[0])} />
                </div>

                {/* Title */}
                <div className={styles.item}>
                    <label className={styles.label}>Title</label>
                    <input 
                        className={styles.input}
                        type="text" 
                        onChange={(e) => setTitle(e.target.value)} />
                </div>

                {/* Description */}
                <div className={styles.item}>
                    <label className={styles.label}>Desc</label>
                    <textarea
                        rows={4} 
                        type="text" 
                        onChange={(e) => setDesc(e.target.value)} />
                </div>

                {/* Price */}
                <div className={styles.item}>
                    <label className={styles.label}>Prices</label>

                    <div className={styles.priceContainer}>
                        {/* Small */}
                        <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number" 
                            placeholder="Small" 
                            onChange={(e) => changePrice(e, 0)}
                        />   
                        {/* Medium */}
                        <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number" 
                            placeholder="Medium" 
                            onChange={(e) => changePrice(e, 1)}
                        />   
                        {/* Large */}
                        <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number" 
                            placeholder="Large" 
                            onChange={(e) => changePrice(e, 2)}
                        />   
                    </div>
                </div>
                
                {/* Extras */}
                <div className={styles.item}>
                    <label className={styles.label}>Extra</label>
                    <div className={styles.extra}>
                        <input 
                            className={`${styles.input} ${styles.inputSm}`}
                            type="text"
                            placeholder="item"
                            name="text"
                            onChange={handleExtraInput}
                        />
                        <input 
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder="price"
                            name="price"
                            onChange={handleExtraInput}
                        />
                        <button className={styles.extraButton} onClick={handleExtra}>
                            Add
                        </button>
                    </div>
                    <div className={styles.extraItems}>
                        {extraOptions.map(option =>(
                            <span key={option.text} className={styles.extraItem} >{option.text}</span>
                        ))}
                    </div>
                </div>

                <button className={styles.addButton} onClick={handleCreate}>
                    Create
                </button>

            </div>
        </div>
    )
};
