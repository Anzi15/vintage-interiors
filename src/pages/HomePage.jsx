import React, { useEffect, useState } from 'react'
import { Carousel } from "@material-tailwind/react";
import ProductCardGroup from '../components/ProductCardGroup';
import { getMultipleDocuments } from '../modules/Firebase modules/firestore';
import coverImg from "../assets/website cover.png"
import coverImg640 from "../assets/website cover 640 px.png";
import coverImg800 from "../assets/website cover 800 px.png";
import coverImgDefault from "../assets/website cover.png";
import coverImgBlur from "../assets/website cover blur 100.png";

const HomePage = () => {
  // const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(()=>{
    const fetchProducts = async()=>{
      try{
        const products = await getMultipleDocuments("Products",4);
        console.log(products)
        setData(products)
      }catch{
        setError(error);
        console.log(error)
      }finally{
        setLoading(false)
      }
    }

    fetchProducts()
  },[])
  return (
    <section>

     <div className='w-full flex items-center justify-center'>
     <img
        src={coverImgDefault}
        srcSet={`${coverImg640} 640w, ${coverImg800} 800w, ${coverImgDefault} 1280w`}
        sizes="(max-width: 640px) 640px, (max-width: 800px) 800px, 100vw"
        alt="Website Cover"
        className='aspect-video w-full skeleton-loading'
      />
     </div>


       <ProductCardGroup products={data} groupHeading={"Top products"} loading={loading} link={"/products"}/>

    </section>
  )
}

export default HomePage