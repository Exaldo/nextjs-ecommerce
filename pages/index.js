import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { Add } from '../components/Add'
import { AddButton } from '../components/AddButton'
import FeaturedSlider from '../components/FeaturedSlider'
import PizzaList from '../components/PizzaList'
import styles from '../styles/Home.module.css'


export default function Home({pizzaList, admin}) {

  //Admin modal state
  const [close, setClose] = useState(true);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FeaturedSlider />
      {admin && <AddButton setClose={setClose}/>}
      <PizzaList pizzaList={pizzaList}/>
      {!close && <Add setClose={setClose}/>}
    </div>
  )
}

export const getServerSideProps = async (context) => {
  /* iF cookie with token exists, then show admin only stuff */  
  const myCookie = context.req?.cookies || "";
  let admin = false;

  if(myCookie.token === process.env.TOKEN){
    admin = true;
  }

  const res = await axios.get("http://localhost:3000/api/products")
  return{
    props:{
      pizzaList:res.data,
      admin
    }
  }
}