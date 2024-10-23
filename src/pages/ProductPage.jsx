import React, { useState, useEffect } from "react";
import { Link, useParams, Navigate, useLocation, useNavigate } from "react-router-dom";
import CustomerBenefits from "../components/CustomerBenefits.jsx";
import { getDocument } from "../modules/firebase-modules/firestore";
import ProductSuggestions from "../components/ProductSuggestions";
import ProductCardGroup from "../components/ProductCardGroup.jsx";
import HtmlRenderer from "../components/HtmlRenderer.jsx";
import { placeholder } from "@cloudinary/react";
import orangePerfumeImg from "../assets/jessica-weiller-So4eFi-d1nc-unsplash.webp";
import luxuryInteriorImg from "../assets/luxuryInteriorImg.webp";
import flowerVase from "../assets/flowerVase.webp";
import flowersWithPerfume from "../assets/olena-bohovyk-KPkR3e6BZG0-unsplash.webp";
import stuffedDeer from "../assets/stuffedDeer.webp";
import blueInterior from "../assets/blueInterior.webp";
import Testimonials from "../components/Testimonials.jsx";
import { Toaster, toast } from 'react-hot-toast';
import ProductImgsCarousel from "../components/ProductImgsCarousel";
import MobileCarousel from "../components/MobileCarousel.jsx";
import CountdownTimer, { formatRemainingTime } from "../components/CountDownTimer.jsx";
import { Button } from "@material-tailwind/react";
import { IoMdCart } from "react-icons/io";
import { Helmet } from "react-helmet-async";
import { IoCheckmark } from "react-icons/io5";

const ProductPage = () => {
  const navigate = useNavigate()
  const placeholderImg =
    "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984";
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState({
    title: "Loading...",
    primaryImg:
      "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
    primaryImgThumbnails: [
      "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
      "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
    ],
    secondary2Img:
      "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
    secondary2ImgThumbnails: [
      "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
      "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
    ],
    secondary1Img:
      "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
    description: "Loading description...",
    secondary1ImgThumbnails: [
      "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
      "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
    ],
    price: "0.00",
    comparePrice: "2000",
    discountExpiryDate: null
  });

  const [selectedVariant, setSelectedVariant] = useState({price: 20, comparePrice: 30, name:"meow"});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id: productId } = useParams();
  const location = useLocation();
  const [routeChanged, setRouteChanged] = useState(false);
  const [isExpiryDateValid, setIsExpiryDateValid] = useState(false);
  const [shouldShowComparePrice, setShouldShowComparePrice] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, [location]);

  const addToCart = () => {
    const prevCartItems = JSON.parse(localStorage.getItem("cart-items")) || [];
    const productIndex = prevCartItems.findIndex(
      (item) => item.productId === productId
    );
    const productData = { productId, quantity, selectedVariant, data };
  
    if (productIndex === -1) {
      // Product is not in the cart, add a new item
      prevCartItems.push(productData);
      localStorage.setItem("cart-items", JSON.stringify(prevCartItems));
  
      toast.custom((t) => (
        <div 
          id="toast-success" 
          onClick={()=>{navigate("/cart")}}
          className={`${t.visible ? 'animate-enter' : 'animate-leave'} flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`} 
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            Item added to your cart!{' '}
          </div>
          <button 
            type="button" 
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" 
            aria-label="Close"
            onClick={() => toast.dismiss(t.id)} // Close the toast when clicked
          >
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      ));
      
    } else {
      // Product is already in the cart, update its quantity
      prevCartItems[productIndex].quantity += quantity;
      localStorage.setItem("cart-items", JSON.stringify(prevCartItems));
  
      toast.custom((t) => (
        <div 
          id="toast-success" 
          onClick={()=>{navigate("/cart")}}
          className={`${t.visible ? 'animate-enter' : 'animate-leave'} flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`} 
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            Cart item quantity updated!{' '}
          </div>
          <button 
            type="button" 
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" 
            aria-label="Close"
            onClick={() => toast.dismiss(t.id)} // Close the toast when clicked
          >
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      ));
    }
  };

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  const updateQuantity = (qnty = 1, action) => {
    setQuantity((prevQuantity) => {
      if (action === "increment") {
        return prevQuantity + qnty;
      } else if (action === "decrement" && prevQuantity > 1) {
        return Math.max(prevQuantity - qnty, 1);
      } else {
        return Math.max(qnty, 1); // Ensure qnty is at least 1
      }
    });
  };
  setSelectedVariant;

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const product = await getDocument("Products", productId);
        setData(product);
        setSelectedVariant(product.variants[0] || null);
        console.log(product);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setIsLoading(false);
      }
    };

    fetchDocument();
  }, [productId]);

  if (error) {
    return navigate("/");
  }
  useEffect(()=>{
    if(isLoading) return;
    const expiryDateValid = data.expiryDateValid ? true : formatRemainingTime(data.discountExpiryDate) !== "00:00:00" && true;
    setIsExpiryDateValid(expiryDateValid)
  },[data.discountExpiryDate])
  const parsePrice = (price) => {
    const parsed = parseFloat(price);
    return isNaN(parsed) ? 0 : parsed;
  };

  useEffect(()=>{
    if(isLoading) return;
    console.log(data.comparePrice, selectedVariant.comparePrice)
    if(parsePrice(selectedVariant?.comparePrice || parsePrice(data?.comparePrice))){
      if((parsePrice(selectedVariant?.comparePrice) !== 0) || (parsePrice(data.comparePrice) !== 0)){
          setShouldShowComparePrice(true)
      }
    }
  },[data.comparePrice, selectedVariant.comparePrice])

  return (
    <>
      <Toaster />
    <Helmet>
        <title>{data.title !== "Loading..." ? data.title : "Best fragrances" } | Al Zehra By GM</title>
        <meta name="description" content={data.description} />
      </Helmet>
      <main className="flex justify-evenly w-full md:flex-row flex-col relative h-full">
        <ProductImgsCarousel
          className=" md:max-h-[565px] md:max-w-[445px] md:gap-8"
          productImages={[
            data.primaryImg,
            data.secondary1Img,
            data.secondary2Img,
          ]}
          thumbnails={[
            data.primaryImgThumbnails[0].url,
            data.secondary1ImgThumbnails[0].url,
            data.secondary2ImgThumbnails[0].url,
          ]}
        />
        <div className="details-section flex flex-col pt-6 text-left gap-3 w-full md:w-1/2 px-6">
          <div className="product-data flex flex-col md:gap-6 gap-3 md:pb-8 py-4">
            <div className="flex flex-col gap-4">
              {data.subTitle && (
                <p
                  className={`capitalize ${
                    isLoading ? "skeleton-loading" : ""
                  }`}
                >
                  {data.subTitle}
                </p>
              )}
              <h1
                className={`product-title text-3xl tracking-wide font-bold text-left uppercase ${
                  isLoading ? "skeleton-loading" : ""
                }`}
                id="product-title-elem"
              >
                {data.title}
              </h1>
            </div>

            <div className="flex items-end gap-3">
              <div className="flex gap-4 md:p-0 pt-3">
                <h3
                  className={`product-price text-2xl text-brandRed font-medium tracking-wide ${
                    isLoading ? "skeleton-loading" : ""
                  }`}
                  id="product-price-elem"
                >
                  Rs.
                  {selectedVariant
                    ? selectedVariant.price * quantity
                    : data.price * quantity}
                </h3>
              </div>

              {shouldShowComparePrice && (
                <div>
                  <div className={`${isLoading && "skeleton-loading"}`}>
                    Rs.
                    <s className="line-through">
                      {selectedVariant.comparePrice
                        ? selectedVariant.comparePrice * quantity
                        : data.comparePrice * quantity}
                    </s>
                  </div>
                </div>
              )}
            </div>
            {isExpiryDateValid && (
              <CountdownTimer expiryTimestamp={data.discountExpiryDate} />
            )}
            {data.variants && data.variants.length > 1 && (
              <div>
                <p className="font-bold">Variants</p>
                <div className="relative flex w-full max-w-[24rem] rounded-xl  bg-clip-border text-gray-700 gap-3">
                  {data.variants.map((variant, index) => (
                    <div
                      key={index}
                      role="button"
                      onClick={() => handleVariantChange(variant)}
                      className={`border flex items-center w-fit p-0 leading-tight transition-all max-w-[80%] rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
                          ${
                            selectedVariant === variant
                              ? "bg-blue-gray-50 text-blue-gray-900"
                              : ""
                          }`}
                    >
                      <label className="flex items-center w-full px-3 py-2 cursor-pointer">
                        <div className="grid mr-3 place-items-center">
                          <div className="inline-flex items-center">
                            <label
                              className="relative flex items-center p-0 rounded-full cursor-pointer"
                              htmlFor={`variant-radio-${index}`}
                            >
                              <input
                                name="variant-radio"
                                id={`variant-radio-${index}`}
                                type="radio"
                                checked={selectedVariant === variant} // This ensures the correct radio button is checked
                                readOnly
                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
                              />
                              <span className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5"
                                  viewBox="0 0 16 16"
                                  fill="currentColor"
                                >
                                  <circle
                                    data-name="ellipse"
                                    cx="8"
                                    cy="8"
                                    r="8"
                                  ></circle>
                                </svg>
                              </span>
                            </label>
                          </div>
                        </div>
                        <p className="block font-sans text-base antialiased font-medium leading-relaxed">
                          {variant.name}
                        </p>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <p className="font-bold">Quantity</p>
          <form className="max-w-xs md:p-2 flex justify-left items-start">
            <div className="relative flex items-start max-w-[8rem]">
              <button
                type="button"
                id="decrement-button"
                data-input-counter-decrement="quantity-input"
                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-l-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                onClick={() => {
                  updateQuantity(1, "decrement");
                }}
              >
                <svg
                  className="w-3 h-3 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
              <input
                type="number"
                id="quantity-input"
                data-input-counter
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={quantity}
                required
                onInput={(e) => {
                  updateQuantity(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateQuantity(1, "increment");
                }}
                type="button"
                id="increment-button"
                data-input-counter-increment="quantity-input"
                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
              >
                <svg
                  className="w-3 h-3 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className="cta-con pt-8">
            <div className="two_btn_con flex gap-4 items-center mb-4 md:flex-row flex-row-reverse md:w-[80%] ">
              <Button
                className="text-nowrap flex items-center gap-3 py-4 px-6"
                onClick={addToCart}
                variant="outlined"
              >
                <IoMdCart className="text-xl" />
                <p className="hidden md:flex">Add To Cart</p>
              </Button>
              <Link to={`/checkout/${productId}/${quantity}/none/${data?.variants?.indexOf(selectedVariant)}`} className="w-full">
                <Button className="w-full py-3.5 text-lg">Buy now</Button>
              </Link>

              {!isLoading && (
                <div className="md:hidden w-full px-2 py-2  text-white fixed bottom-0 left-0 right-0 z-50 m-auto">
                  <button
                    className="bg-[#FE0000] w-full py-5 rounded-2xl flex px-4 items-center gap-2 justify-between"
                    onClick={addToCart}
                  >
                    <div className="flex items-center gap-3">
                      <div className="font-bold text-lg">Rs. {data.price}</div>
                      {isExpiryDateValid && (
                        <div className="flex flex-col">
                          {(parseInt(selectedVariant?.comparePrice) ||
                            data.comparePrice) &&
                            ((selectedVariant.comparePrice !== 0 &&
                              selectedVariant.comparePrice !== "0") ||
                              (data.comparePrice !== 0 &&
                                data.comparePrice !== "0")) && (
                              <div>
                                <div>
                                  Rs.
                                  <s className="line-through">
                                    {selectedVariant.comparePrice
                                      ? selectedVariant.comparePrice * quantity
                                      : data.comparePrice * quantity}
                                  </s>
                                </div>
                              </div>
                            )}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 text-xl uppercase font-bold  items-center">
                      <IoMdCart className="text-xl" />
                      Add To Cart
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400 my-8">
  <li className="flex items-center space-x-3 rtl:space-x-reverse">
    <svg
      className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 12"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5.917L5.724 10.5 15 1.5"
      />
    </svg>
    <span>Handcrafted with care</span>
  </li>
  <li className="flex items-center space-x-3 rtl:space-x-reverse">
    <svg
      className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 12"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5.917L5.724 10.5 15 1.5"
      />
    </svg>
    <span>Timeless vintage design</span>
  </li>
  <li className="flex items-center space-x-3 rtl:space-x-reverse">
    <svg
      className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 12"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5.917L5.724 10.5 15 1.5"
      />
    </svg>
    <span>Perfect for any space</span>
  </li>
  <li className="flex items-center space-x-3 rtl:space-x-reverse">
    <svg
      className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 12"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5.917L5.724 10.5 15 1.5"
      />
    </svg>
    <span>High-quality craftsmanship</span>
  </li>
  <li className="flex items-center space-x-3 rtl:space-x-reverse">
    <svg
      className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 12"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5.917L5.724 10.5 15 1.5"
      />
    </svg>
    <span>Elegant and functional</span>
  </li>
</ul>

        </div>
      </main>

      <div className="description px-8 md:py-[8rem] py-[5rem]">
        <h3 className="text-left">
          <b>Description</b>
        </h3>
        {<HtmlRenderer rawHtml={data.descriptionHtml} />}
      </div>

      <div className="bg-black w-full  overflow-hidden object-center flex items-center relative justify-center aspect-video flex-col p-8 gap-4 md:min-h-fit min-h-[20rem]">
        <img
          className="opacity-50 w-full object-cover h-full absolute inset-0 z-[1]"
          src={luxuryInteriorImg}
          alt=""
        />
        <h1 className="z-[2] md:text-5xl text-3xl text-white font-bold font-serif">
          It's All About Luxury
        </h1>
        <p className="z-[1] text-gray-100 md:w-[35%]">
          Discover a world of enchanting Furniture that will elevate your
          place to new heights of luxury and charm.
        </p>
      </div>

      <div className="flex justify-center md:flex-row flex-col-reverse my-12">
        <div className="md:w-1/2 w-full flex flex-col md:items-end p-10 gap-8 justify-center">
          <h1 className=" md:text-4xl text-left text-3xl font-bold  text-brandRed md:w-[80%]">
            Decor for a Purpose
          </h1>
          <p className="text-left md:w-[80%]">
          Experience the harmony of elegance and functionality with our curated selection of vintage decor pieces. Each item is thoughtfully crafted to evoke timeless charm while seamlessly complementing your personal aesthetic, enhancing the ambiance of your living space with a touch of nostalgia and sophistication.
          </p>
        </div>
        <div className="md:w-1/2 w-screen flex justify-center items-center">
          <img
            src={flowerVase}
            className="md:w-[80%] w-[90%] rounded-lg"
            alt=""
          />
        </div>
      </div>

      <CustomerBenefits />

      <div className="flex w-[98%] justify-center py-9 flex-wrap md:px-4">
        <img
          src={stuffedDeer}
          className="md:w-1/2 object-cover rounded-lg w-[90%] aspect-video"
          alt=""
        />
        <div className="md:w-1/2 w-full flex flex-col md:items-end p-10 gap-8 justify-center">
        <h1 className="md:text-4xl text-left text-3xl font-bold text-brandRed md:w-[80%] w-full">
  Elevate Your Space with Timeless Vintage Decor
</h1>
<p className="text-left md:w-[80%]">
  Transform your home into a haven of elegance with our curated collection of vintage furniture and decor. Each piece is crafted to bring charm and character, making it the perfect addition to any room or occasion.
</p>

        </div>
      </div>

      <div className="flex w-[98%] justify-center py-9 flex-wrap">
        <div className="md:w-1/2 w-full flex flex-col md:items-end p-10 gap-8 justify-center md:px-4">
        <h1 className="md:text-4xl text-left text-3xl font-bold text-brandRed md:w-[80%] w-full">
  Discover Timeless Vintage Elegance
</h1>
<p className="text-left md:w-[80%]">
  Uncover the beauty of classic design with our captivating range of vintage furniture and decor. Whether you prefer the warmth of rustic charm or the sophistication of antique pieces, our collection is crafted to leave a lasting impression, effortlessly elevating your space.
</p>

        </div>
        <img
          src={blueInterior}
          className="md:w-1/2 object-cover rounded-lg w-[90%] aspect-video"
          alt=""
        />
      </div>

      <Testimonials textColor="#FFFFFF" bgColor="#7f5539 " />

      {!isLoading ? (
        <ProductSuggestions
          heading="You might also like:"
          dontUse={data.title}
        />
      ) : (
        <ProductCardGroup loading="true" />
      )}
    </>
  );
};

export default ProductPage;
