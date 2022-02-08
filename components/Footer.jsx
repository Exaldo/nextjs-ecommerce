import styles from "../styles/Footer.module.css"
import Image from "next/image"

const Footer = () => {
    return (

        <div className={styles.container}>

            {/* Item 1 */}
            {/* Background image */}
            <div className={styles.item}>
                <Image  src="/img/bg.png" layout="fill" objectFit="cover" alt=""/>
            </div>

            {/* Item 2 */}
            <div className={styles.item}>

                {/* Motto */}
                <div className={styles.card}>
                    <h2 className={styles.motto}>
                        THE PIZZA MIZA CHIZA LIZA BEST INGREDIENTS FROM CHINA TO INDIA AN UP AND THERE
                    </h2>
                </div>

                {/* Restaurant directions */}
                <div className={styles.card}>
                    <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
                    <p className={styles.text}>
                        1452 Avenue Real Gei
                        <br /> New Zealand, 56498
                        <br /> (44) 542-5244
                    </p>
                    <p className={styles.text}>
                        1452 Fake shet
                        <br /> New Zealand, 56498
                        <br /> (44) 542-5244
                    </p>
                    <p className={styles.text}>
                        1452 Human erect oii
                        <br /> New Zealand, 56498
                        <br /> (44) 542-5244
                    </p>
                </div>

                {/* Working hours */}
                <div className={styles.card }>
                    <h1 className={styles.title}>WORKING HOURS</h1>
                    <p className={styles.text}>
                        MONDAY UNTIL FRIDAY
                        <br /> 9:00 - 22:00
                    </p>
                    <p className={styles.text}>
                        SATURDAY - SUNDAY
                        <br /> 12:00 - 24:00
                    </p>
                </div>
            
            </div>
        </div>
    )
}

export default Footer
