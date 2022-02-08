import React, { useState } from 'react';
import styles from '../styles/OrderDetail.module.css'

const OrderDetail = ({ total, createOrder }) => {

    const [customer, setCustomer] = useState("");
    const [address, setAddress] = useState("");


    // Create and order using chash on delivery
    const handleClick = () => {
        createOrder({customer, address, total, method: 0})
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}> You will pay $12 after delivery</h1>
                
                {/* Customer name */}
                <div className={styles.item}>
                    <label className={styles.label}>Name Surname</label>
                    <input 
                        placeholder="Jhob Doe" 
                        type="text" 
                        className={styles.input} 
                        onChange={(e) => setCustomer(e.target.value)}
                    />         
                </div>

                {/* Customer phone */}
                <div className={styles.item}>
                    <label className={styles.label}>Phone number</label>
                    <input 
                        type="text" 
                        placeholder='+52 4545 2365' 
                        className={styles.input} 
                    />         
                </div>

                {/* Customer address */}
                <div className={styles.item}>
                    <label className={styles.label}>Address</label>
                    <textarea 
                        rows={5}
                        placeholder="Elton st- 505 ny city"
                        type="text"
                        className={styles.textarea}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <button className={styles.button} onClick={handleClick}>
                    Order
                </button>




            </div>
        </div>
    
    
    );
};

export default OrderDetail;
