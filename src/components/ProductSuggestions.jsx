import React, { useEffect, useState } from 'react'
import ProductCardGroup from '../components/ProductCardGroup';
import { getMultipleDocuments } from '../modules/Firebase modules/firestore';



const ProductSuggestions = ({heading, dontUse=null}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchProducts = async()=>{
      try{
        const numOfDocs = dontUse == null ? 4 : 5
        const products = await getMultipleDocuments("Products",numOfDocs);

        //filter the docs here but only if the dont use isnull
        if(dontUse !== null){
          const filteredProducts = products.filter(doc => doc.title !== dontUse);
          setData(filteredProducts)
        }else{
          setData(products)
        }
      }catch(e){
        setError(error);
        console.log(e)
      }finally{
        setLoading(false)
      }
    }

    fetchProducts()
  },[])

  return <>
   <ProductCardGroup className="my-8" products={data} groupHeading={heading} loading={loading} link={"/products"}/>
  </>;
};

export default ProductSuggestions;
