import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 
import { db } from "../modules/firebase-modules/firestore";


const PromoCodeForm = ({productTags}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [promoCode, setPromoCode] = useState("");
    const [error, setError] = useState(null)
    const [isPromoCodeValid, setIsPromoCodeValid] = useState(null)
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [discountValue, setDiscountValue] = useState(0)
    const [discountType, setDiscountType] = useState(null)
    

    useEffect(
        ()=>{

                setError(false)
                setIsFormSubmitted(false)
                setIsPromoCodeValid(false)
            
        },
        [promoCode]
    )
    const getCouponDoc = async (couponCode) => {
        const coupons = [];
        const collectionName = "coupons";
        const couponsCollection = collection(db, collectionName);
        
        console.log(`Searching for coupon code: ${couponCode}`);
        
        // Query for documents where couponCode matches
        const q = query(couponsCollection, where("couponCode", "==", couponCode));
      
        try {
          const querySnapshot = await getDocs(q);
          console.log("Query built");
      
          if (querySnapshot.empty) {
            console.log("No matching documents found");
            setError("Kindly enter a valid coupon code");
            return coupons;
          }
      
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log("Document Data: ", data);
            coupons.push(data);
          });
          
          return coupons;
        } catch (error) {
          console.error("Error fetching coupon documents: ", error);
          setError("An error occurred while fetching the coupon code");
          return coupons;
        }
      };
      

      const handleSubmission = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsFormSubmitted(true);
        setError(null)
        try {
            // Fetch coupon data
            const coupons = await getCouponDoc(promoCode);
            if (coupons.length === 0) {
                setError("Coupon not found");
                return;
            }
    
            const couponData = coupons[0];
            const now = new Date();
            const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
            // Convert Firestore timestamp to Date object
            const expirationDate = new Date(couponData.expirationDate);
    
            // Check if the coupon is expired
            if (expirationDate < todayStart) {
                setError("Coupon expired");
                return;
            }
    
            // Check if the coupon is active
            if (!true) {
                setError("Coupon inactive");
                return;
            }
    
            // Check if the coupon usage limit has been reached
            if (couponData.usedCount >= couponData.usageLimit) {
                setError("Usage limit reached");
                return;
            }
    
            // Check if the coupon is valid for the selected products
            const validForProducts = Array.isArray(couponData.validForProducts) ? couponData.validForProducts : [];

        // Log values for debugging
        console.log("Valid for products:", couponData.validForProducts);
        console.log("Valid for products:", validForProducts);
        console.log("Product tags:", productTags);

        // Check if the coupon is valid for selected products or if "all" is included
        const hasValidProducts = validForProducts.includes("all") || validForProducts.some(tag => productTags.includes(tag));

        if (!hasValidProducts) {
            setError("Invalid for selected products");
            return;
        }
    
            setIsPromoCodeValid(true);
            setDiscountType(couponData.discountType)
            setDiscountValue(couponData.discountValue)
        } catch (error) {
            console.error("Error processing coupon:", error);
            setError("Unexpected error, please try again");
        } finally {
            setIsLoading(false);
        }
    };
    
  return (
    <form onSubmit={(e)=>{e.preventDefault(); handleSubmission(e)}}>
      <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium ">
        Promo Code
      </label>
      <div className={`flex ${!error && 'pb-4'} w-full`}>
        <div className={`relative w-full flex  border-gray-300 rounded-lg border ${error && "border-red-700"} ${isPromoCodeValid && "border-green-700"} pl-2`}>
          <input
            type="text"
            required
            className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white b placeholder-gray-500 border-none  focus:outline-gray-400 "
            placeholder="xxxx xxxx xxxx"
            onInput={(e)=>{setPromoCode(e.target.value.trim().toUpperCase())}}
            value={promoCode}
          />
          <Button
            id="dropdown-button"
            data-target="dropdown"
            className="bg-transparent rounded-none border-none shadow-none hover:shadow-none "
            type="button"
            loading={isLoading}
          >
            {
                error && "❌"
            }
            {
                isPromoCodeValid && "✅"
            }

          </Button>
        </div>
      </div>
      {
        error && <p className="text-red-700 pb-6">{error}</p>
      }
      <div className="flex items-center border-b border-gray-200">
        <button className="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80" >
          Apply
        </button>
      </div>
    </form>
  );
};

export default PromoCodeForm;
