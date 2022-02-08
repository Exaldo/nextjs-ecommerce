import Image from "next/image"
import Link from "next/link"
import styles from "../styles/PizzaCard.module.css"


const PizzaCard = ({pizza}) => {
    return (
        <div className={styles.container}>
            
            <Link href={`/product/${pizza._id}`} passHref>
                {/* <a> fixes the error "Warning: Function components cannot be given refs." */}
                <a> 
                    <Image src={pizza.img} alt="" height="500" width="500"/>
                </a>
            </Link>

            <h1 className={styles.title}>{pizza.title}</h1>
            <span className={styles.price}>$ {pizza.price[0]}</span>
            <p className={styles.desc}>
                {pizza.desc} 
            </p>
        </div>
    )
}

export default PizzaCard
