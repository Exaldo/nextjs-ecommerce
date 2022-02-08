import Image from "next/image"
import Link from "next/link";
import { useSelector } from "react-redux"
import styles from "../styles/Navbar.module.css"


const Navbar = () => {

    const quantity = useSelector((state) => state.cart.quantity);

    return (
        <div className={ styles.container }>

            <div className={ styles.item }>

                <div className={ styles.callButton }>
                    <Image src="/img/telephone.png" alt="" width="32" height="32"/>
                </div>

                <div className={ styles.texts  }>

                    {/* first child */}
                    <div className={ styles.text  }>ORDER NOW!!</div>
                    {/* last child */}
                    <div className={ styles.text  }>1022164891</div>

                </div>

            </div> 
            
            {/* List menu and Logo */}
            <div className={ styles.item }>
                <ul className={ styles.list }>

                <Link href="/" passHref>
                    <li className={ styles.listItem }>Homepage</li>
                </Link>

                    <li className={ styles.listItem }>Products</li>
                    <li className={ styles.listItem }>Menu</li>
                    
                    {/* <Image src="/img/logo.png" alt="" width="160px" height="69px"/> */}
                    
                    <li className={ styles.listItem }>Blog</li>
                    <li className={ styles.listItem }>Contact</li>
                </ul>
            </div>


            <Link href="/cart" passHref>
                {/* Cart logo */}
                <div className={ styles.item }>
                    <div className={ styles.cart }>
                        <Image src="/img/cart.png" alt="" width="30px" height="30px"/>
                        <div className={ styles.cartCounter}> {quantity} </div>
                    </div>
                </div>
            </Link>
            
        </div>
    )
}

export default Navbar
