import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from '../../styles/Admin.module.css';


const Index = ({ orders, products }) => {

    const [pizzalist, setPizzalist] = useState(products);
    const [orderlist, setOrderlist] = useState(orders);
    const status = ["preparing", "on the way", "delivered"]

    const handleDelete = async (id) => {
            try {
                const res = await axios.delete("http://localhost:3000/api/products/"+id);
                setPizzalist(pizzalist.filter(pizza => pizza._id !== id))
            } catch (error) {
                console.log(error);
            }
    }

    const handleStatus = async(id) => {

        const item = orderlist.filter(order => order._id === id)[0] // returns filtered id order list
        const currentStatus = item.status 

        try {
            const res = await axios.put("http://localhost:3000/api/orders/" + id, {status: currentStatus + 1 });
            setOrderlist([
                res.data,
                ...orderlist.filter(order => order._id !==  id ) //delete previous order and replace with new one
            ])
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className={styles.container}>

            {/* Products */}
            <div className={styles.item}>
                <h1 className={styles.title}>Products</h1>

                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Image</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </tbody>
                    
                        {pizzalist.map(product => (
                            <tbody key={product._id}>
                                    <tr className={styles.trTitle}>
                                    <td >
                                        <Image 
                                            src={product.img}
                                            width={50}
                                            height={50}
                                            objectFit="cover"
                                            alt=""
                                            />
                                    </td>
                                    <td>{product._id.slice(0,5)}...</td>
                                    <td>{product.title}</td>
                                    <td>{product.price[0]}</td>
                                    <td>
                                        <button className={styles.button}>Edit</button>
                                        <button 
                                            className={styles.button} 
                                            onClick={() => handleDelete(product._id
                                            )}>
                                                Delete
                                            </button>
                                    </td>
                                </tr>
                            </tbody> 
                                    ))}
                </table>
            </div>
            
            {/* Orders */}
            <div className={styles.item}>

            <h1 className={styles.title}>Orders</h1>
            <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Id</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </tbody>

                    {orderlist.map(order => (

                        <tbody key={order._id}>
                            <tr className={styles.trTitle}>
                                <td>{order._id.slice(0,5)}...</td>
                                <td>{order.customer}</td>
                                <td>$ {order.total}</td>
                                <td>{order.method === 0 ? (<span>cash</span>) : (<span>paid</span>)}</td>
                                <td>{status[order.status]}</td>
                                <td>
                                    <button onClick={() => handleStatus(order._id) }>Next stage</button>
                                </td>
                            </tr>
                        </tbody> 
                        ))}
                </table>

            </div>
        </div>
    
    );
};

export const getServerSideProps = async (context) => {
    /* store the cookie Token */
    const myCookie = context.req?.cookies || "";

    /* Validate cookies, if there is no cookie, redirects to login page */
    if(myCookie.token !== process.env.TOKEN){
        return{
            redirect:{
                destination:"/admin/login",
                permanent: false,
            }
        }
    }

    /* Fetch data */
    const productResponse = await axios.get("http://localhost:3000/api/products")
    const orderResponse = await axios.get("http://localhost:3000/api/orders")

    return {
        props:{
            orders:orderResponse.data,
            products:productResponse.data
        }
    };
};

export default Index;