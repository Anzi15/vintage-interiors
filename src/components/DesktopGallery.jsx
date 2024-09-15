import React, { useState } from 'react'
import ProductCardGroup from './ProductCardGroup'

const DesktopGallery = ({productImages}) => {
    const [activeImg, setActiveImg] = useState(0)
  return (
    <div className='px-8 w-1/3'>
      <div className="activeImg">
        <img src={productImages[activeImg]} alt="" className='w-full aspect-square rounded-md'/>
      </div>
      <div className='w-full flex py-4 gap-4'>
        {
            productImages.map((img, i)=>{
                return (
                    <button className={`w-[32%] hover:opacity-85 transition-all rounded-md ${i == activeImg && "border-2 border-brandRed"}`} key={i} onClick={()=>{setActiveImg(i)}}>
            <img src={img} className={` rounded-md w-full skeleton-loading aspect-square`} alt="" />
        </button>
                )
            })
        }
      </div>
    </div>
  )
}

export default DesktopGallery
