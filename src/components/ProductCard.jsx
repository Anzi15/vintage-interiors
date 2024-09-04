import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ link, title, image1, price, comparedPrice = null, loading}) => {
  return (
    <Link to={link} className="group my-4 md:my-10 flex m-[1%] w-[48%] md:max-w-[17rem] flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-small hover:shadow-md ">
    <div className="flex rounded-xl relative" >
      <img 
        className="peer right-0 w-full object-cover aspect-square skeleton-loading object-center" 
        src={image1} 
        alt={title} 
      />
<span
  className={`absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white ${comparedPrice && comparedPrice > price ? "block" : "hidden"}`}
>
  {comparedPrice && comparedPrice > price && `${Math.round(((comparedPrice - price) / comparedPrice) * 100)}% OFF`}
</span>




    </div>
    <div className="mt-4 px-5 pb-5 md:min-h-[12rem]">
        <h5 className={`text-xl text-left tracking-tight text-slate-900 ${loading && "skeleton-loading"}`}>
            {title}
        </h5>
      <div className="mt-2 mb-5 flex items-center justify-between ">
        <p >
          <span className={`text-2xl font-semibold text-slate-900  ${loading && "skeleton-loading"} text-brandRed`}>Rs. {price}</span>
          <span className={`text-sm text-slate-900 line-through ${comparedPrice == null || isNaN(comparedPrice) || comparedPrice <= price ? "hidden" : ""}  ${loading && "skeleton-loading"}`}>Rs. {comparedPrice}</span>
        </p>
      </div>
    </div>
  </Link>
  )
}

export default ProductCard