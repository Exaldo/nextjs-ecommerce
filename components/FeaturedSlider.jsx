import Image from "next/image"
import { useState } from "react"
import styles from "../styles/FeaturedSlider.module.css"

const FeaturedSlider = () => {

        const [index, setIndex ] = useState(0);

    const images = [
        "/img/featured.jpg",
        "/img/featured2.jpg",
        "/img/featured3.jpg"
    ]

    const handleArrow = (direction) => {

        //left arrow :: if index 0, then take you to last element on the slide
        if( direction === "l"){
            setIndex(index !== 0 ? index-1 : 2)
        }

        //right arrow :: if index 0, then take you to first element on the slide
        if( direction === "r"){
            setIndex(index !== 2 ? index+1 : 0)
        }
    }

    return (
        <div className={ styles.container }>

            {/* Left arrow */}
            <div className={ styles.arrowContainer } style={{ left: 0 }} onClick={() => handleArrow("l")} >
                <Image src="/img/arrowl.png" alt="" layout="fill" objectFit="contain"/>
            </div>
            
            {/* Move to next image on the slider functionality */}
            <div className={ styles.wrapper } style={{ transform: `translateX(${-100 * index}vw)`}}>
                    
                    {/* Slider images */}
                    { images.map((img, index) => (
                    <div className={ styles.imageContainer } key={index}>
                        <Image src={img} alt="" layout="fill" objectFit="contain"/>
                    </div>
                    ))}

            </div> 
            
            {/* Right arrow */}
            <div className={ styles.arrowContainer } style={{ right: 0 }} onClick={() => handleArrow("r")}>
                <Image src="/img/arrowr.png" alt="" layout="fill" objectFit="contain" />
            </div>

        </div> // / container
    )
}

export default FeaturedSlider
