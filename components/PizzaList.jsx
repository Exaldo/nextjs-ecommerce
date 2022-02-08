import styles from "../styles/PizzaList.module.css"
import PizzaCard from "./PizzaCard"


const PizzaList = ({pizzaList}) => {
    return (
        <div className={styles.container}>

            <h1 className={styles.title}>THE BEST PIZZA IN THE UNIVERSE</h1>
            
            <p className={styles.desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Nulla quasi, eius dolore laboriosam repudiandae similique id temporibus! 
                Minus ipsam, nam nemo eum, in aliquid excepturi voluptates quis, 
                odit commodi tempore!
            </p>
            
            <div className={styles.wrapper}>
                {pizzaList.map(pizza =>(
                    <PizzaCard key={pizza._id} pizza={pizza} />
                ))}
            </div>
        </div>
    )
}

export default PizzaList
