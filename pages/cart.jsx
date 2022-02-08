import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";


import OrderDetail from "../components/OrderDetail";
import { reset } from "../redux/cartSlice";
import styles from "../styles/Cart.module.css"


const Cart = () => {
    
    
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const [cash, setCash] = useState(false);
    const router = useRouter();
    
    const createOrder = async (data) => {
        try {  
            const res = await axios.post("http://localhost:3000/api/orders", data) // create new order
            res.status === 201 && router.push("/orders/" + res.data._id) // redirects user to orders id page
            dispatch(reset());
        } catch (error) {
            console.log(error);
        }
    };
    
    /* ========== PAYPAL ============ */
    // This values are the props in the UI
    const [open, setOpen] = useState(false);

    const amount = cart.total;
    const currency = "USD"; 
    const style = {"layout":"vertical"};

    // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}

                // Returns on aproved payment
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        const shipping = details.purchase_units[0].shipping;
                        createOrder({ 
                            customer:shipping.name.full_name, 
                            address:shipping.address.address_line_1, 
                            total:cart.total,
                            method: 1, // 1 = paypal
                        })    
                    });
                }}
            />
            </>
        );
    }
    /* // ========== PAYPAL ============ */

    return (
        <div className={styles.container}>

            <div className={styles.left}>
                <table className={styles.table}>
                        <tbody>
                            {/* Table headers */}
                            <tr className={styles.trTitle}>
                                <th>Product</th>
                                <th>Name</th>
                                <th>Extras</th>
                                <th>Prices</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>                    
                        </tbody>
                    
                <tbody>
                    {cart.products.map( product => (
                        
                        // Product image 
                        <tr className={styles.tr} key={product._id}>
                            <td>
                                <div className={styles.imgContainer}>
                                    <Image 
                                        src={product.img} 
                                        layout="fill" 
                                        objectFit="cover"   
                                        alt=""
                                    />
                                </div>
                            </td>

                        {/* Shopping data */}
                            <td>
                                <span className={styles.name}>{product.title}</span>
                            </td>

                            <td>
                                <span className={styles.extras}>
                                    {product.extras.map( (extra) => (
                                        <span key={extra._id}>{extra.text}, </span>
                                    ))}
                                </span>
                            </td>

                            <td>
                                <span className={styles.price}>
                                    $ {product.price}
                                </span>
                            </td>

                            <td>
                                <span className={styles.quantity}>
                                    {product.quantity}
                                </span>
                            </td>

                            <td>
                                <span className={styles.total}>
                                    $ {product.price * product.quantity}
                                </span>
                            </td>
                        {/* /Shopping data */}
                        </tr>
                        
                    ))}
                </tbody>
                </table>
            </div>
            
            
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>CART TOTAL</h2>
                    
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Subtotal:</b>$ {cart.total}
                    </div>

                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Discount:</b>$0.0
                    </div>

                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Total:</b>$ {cart.total}
                    </div>

                    {open ? (
                        <div className={styles.paymentMethods}>
                            <button  onClick={() => setCash(true) } className={styles.payButton}>CASH ON DELIVERY</button>
                            <PayPalScriptProvider
                                options={{
                                    "client-id": "AXhRrRXxYmVzztKaGad8jiL5KnBklZ9q6Tr1ilAXG3V0Pr264eWv9VsO4jIYxbQAqVkG5RogmwlzuaZg",
                                    components: "buttons",
                                    currency: "USD",
                                    "disable-funding": "mercadopago,card,credit"
                            }}>
                                <ButtonWrapper
                                    currency={currency}
                                    showSpinner={false}
                                />
                            </PayPalScriptProvider>
                        </div>
                    ) : (
                        <button onClick={() => setOpen(true)} className={styles.button}>CHECKOUT NOW!</button>
                    )}

                </div> 
            </div> 

            {/* If user choose chash on delivery option, trigger this modal */}
            {cash && (
                <OrderDetail total={cart.total} createOrder={createOrder} />
            )}
                        
        </div>
    )
}

export default Cart
