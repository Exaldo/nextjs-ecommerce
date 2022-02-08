import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import styles from "../../styles/Product.module.css"


const Product = ({pizza}) => {

    // Pizza size and price states
    const [price, setPrice] = useState(pizza.price[0]); //default value: small pizza size
    const [size, setSize] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [extras, setExtras] = useState([]);

    /* Redux */
    const dispatch = useDispatch();

    /* Set global price  */
    const changePrice = (number) => {
        setPrice(price + number)
    }

    const handleSize = (sizeIndex) => {
                            // sizeIndex = 1 : medium {13}   - size = 0 : small {12} = 13 - 12 = "1"
                            // sizeIndex = 2 : large {14}   - size = 0 : small {12} = 14 - 12 = "2"
                            // sizeIndex = 0 : small {12}   - size = 2 : small {14} = 12 - 14 = "-2"
        const difference = pizza.price[sizeIndex] - pizza.price[size];
        setSize(sizeIndex); // 0
        changePrice(difference) // -2
    }

    const handleChange = (e, option) => {
        const checked = e.target.checked; // true or false

        if(checked){
            changePrice(option.price) //add price + option price
            setExtras(prev=>[...prev, option]) // spread and add extra options to the extra state
        } else {
            changePrice(-option.price) // substract price + - option price

            // delete stored valued in extra state if value.id is the same as checkbox value.id
            setExtras(extras.filter(extra => extra._id !== option._id ))  
        }
        
    }

    const handleClick = () => {
        dispatch(addProduct({
                ...pizza, 
                extras, 
                price, 
                quantity
            }));
    }

    return (
        <div className={styles.container}>
            
            {/* Product image */}
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={pizza.img} layout="fill" objectFit="contain" alt=""/>
                </div>
            </div>    
            
            {/* Product info */}
            <div className={styles.right}>
                <h1 className={styles.title}> {pizza.title} </h1>
                <span className={styles.price}>$ {price}</span>
                <p className={styles.desc}>{pizza.desc}</p>
                <h3 className={styles.choose}>Choose the size</h3>

                <div className={styles.sizes}>
                    <div className={styles.size} onClick={() => handleSize(0)}>
                        <Image src="/img/size.png" layout="fill" alt=""/>
                        <span className={styles.number}> Small </span>
                    </div>      
                    <div className={styles.size} onClick={() => handleSize(1)}>
                        <Image src="/img/size.png" layout="fill" alt=""/>
                        <span className={styles.number}> Medium </span>
                    </div>      
                    <div className={styles.size} onClick={() => handleSize(2)}>
                        <Image src="/img/size.png" layout="fill" alt=""/>
                        <span className={styles.number}> Large </span>
                    </div>      
                </div>

                <h3 className={styles.choose}>Choose additional ingredients</h3>
                <div className={styles.ingredients}>

                    {pizza.extraOptions.map( option => (
                        <div className={styles.option} key={option._id}>
                        <input 
                            type="checkbox" 
                            name={option.text} 
                            id={option.text} 
                            className={styles.checkBox} 
                            onChange={(e) => handleChange(e, option)}
                        />
                        <label htmlFor="double">{option.text}</label>
                        </div>
                    ))}
                    

                </div> 

                <div className={styles.add}>
                    <input onChange={(e) => setQuantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity} />
                    <button className={styles.button} onClick={handleClick}>Add to Cart</button>
                </div>

            </div>    

        </div>
    );
};

// Fetch the data using the params[product id] from the page url
export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`http://localhost:3000/api/products/${params.id}`)
    return{
        props:{
            pizza:res.data,
        }
    };
};


export default Product;
