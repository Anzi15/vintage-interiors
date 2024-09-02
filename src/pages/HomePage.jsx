import React, { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import ProductCardGroup from "../components/ProductCardGroup";
import { getMultipleDocuments } from "../modules/firebase-modules/firestore";
import coverImg from "../assets/website cover.png";
import coverImg640 from "../assets/website cover 640 px.png";
import coverImg800 from "../assets/website cover 800 px.png";
import coverImgDefault from "../assets/website cover.png";
import coverImgBlur from "../assets/website cover blur 100.png";
import { Link } from "react-router-dom";
import CustomerBenefits from "../components/CustomerBenefits";
import Testimonials from "../components/Testimonials";
const reviews = [
  {
    stars: 5,
    text: "I was really impressed with the timely delivery and good packaging of my order from Al Zehra By GM. The product was delivered on the promised date and was well-protected during shipping.",
    author: "Saad Arain",
  },
  {
    stars: 5,
    text: "I have been a customer of Al Zehra by GM for many years and I have always been happy with the service. The order is always delivered on time and is packaged well. They do a great job of assisting to get the perfect fragrance for their loved ones.",
    author: "Rahat Raja",
  },
  {
    stars: 5,
    text: "I had a great experience shopping with Al Zehra by GM. The shopping experience was a breeze and the product quality was excellent. their team asked the next day for reviews of the perfume. Great service.",
    author: "Waqas Ashraf",
  },
  {
    stars: 5,
    text: "The scent collection at Al Zehra by GM is absolutely amazing. I ordered a few perfumes, and each one exceeded my expectations. The customer support was very responsive and helped me choose the best fragrances for my needs. Highly recommended!",
    author: "Fatima Malik",
  },
  {
    stars: 4,
    text: "I ordered a perfume from Al Zehra by GM, and while the delivery took a bit longer than expected, the quality of the fragrance made up for it. I will definitely be ordering again. The scent is long-lasting and exactly what I was looking for.",
    author: "Ahmed Khan",
  },
  {
    stars: 5,
    text: "Al Zehra by GM never disappoints! The perfumes are of top-notch quality, and the prices are very reasonable. I’ve recommended this store to all my friends, and they love it too. Great job!",
    author: "Sara Sheikh",
  },
  {
    stars: 5,
    text: "I recently purchased a gift set from Al Zehra by GM, and it was beautifully packaged and delivered on time. The recipient loved the fragrance. I'll definitely be coming back for more.",
    author: "Naveed Anwar",
  },
];

const HomePage = () => {
  // const [menuOpen, setMenuOpen] = useState(false);
  const [topProducts, setTopProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getMultipleDocuments("Products", 4);
        console.log(products);
        setTopProducts(products);
      } catch {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <main>
      <div className="w-full flex items-center justify-center">
        <img
          src={coverImgDefault}
          srcSet={`${coverImg640} 640w, ${coverImg800} 800w, ${coverImgDefault} 1280w`}
          sizes="(max-width: 640px) 640px, (max-width: 800px) 800px, 100vw"
          alt="Website Cover"
          className="aspect-video w-full skeleton-loading"
        />
      </div>

      <ProductCardGroup
        products={topProducts}
        groupHeading={"Top products"}
        loading={loading}
        link={"/products"}
      />

      <section className="flex w-full justify-around md:gap-4 flex-wrap my-10 font-futura">
        <div className="md:w-1/5 w-[45%] md:m-0 my-4 flex flex-col group relative">
          <img
            src="https://scentsnstories.pk/cdn/shop/collections/Men_Banner.webp?v=1724307797&width=720"
            className="rounded-full group-hover:brightness-50 group-hover:scale-105 relative transition-all duration-300"
            alt=""
          />
          <h2 className="hidden group-hover:flex text-4xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 font-futura">
            Men
          </h2>
          <h3 className="text-brandRed font-semibold  font-futura group-hover:hidden">
            Men
          </h3>
        </div>

        <div className="md:w-1/5 w-[45%] md:m-0 my-4 flex flex-col group relative">
          <img
            src="https://scentsnstories.pk/cdn/shop/collections/Women_Banner.jpg?v=1724307854&width=720"
            className="rounded-full group-hover:brightness-50 group-hover:scale-105 relative transition-all duration-300"
            alt=""
          />
          <h2 className="hidden group-hover:flex text-4xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
            Women
          </h2>
          <h3 className="text-brandRed font-semibold group-hover:hidden">
            Women
          </h3>
        </div>

        <div className="md:w-1/5 w-[45%] md:m-0 my-4 flex flex-col group relative">
          <img
            src="https://scentsnstories.pk/cdn/shop/collections/Eastern_banner.jpg?v=1724307767&width=720"
            className="rounded-full group-hover:brightness-50 group-hover:scale-105 relative transition-all duration-300"
            alt=""
          />
          <h2 className="hidden group-hover:flex text-4xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
            Eastern
          </h2>
          <h3 className="text-brandRed font-semibold group-hover:hidden">
            Eastern
          </h3>
        </div>

        <div className="md:w-1/5 w-[45%] md:m-0 my-4 flex flex-col group relative">
          <img
            src="https://scentsnstories.pk/cdn/shop/collections/western_Banner.jpg?v=1724307819&width=720"
            className="rounded-full group-hover:brightness-50 group-hover:scale-105 relative transition-all duration-300"
            alt=""
          />
          <h2 className="hidden group-hover:flex text-4xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
            Western
          </h2>
          <h3 className="text-brandRed font-semibold group-hover:hidden">
            Western
          </h3>
        </div>
      </section>

      <ProductCardGroup
        products={topProducts}
        groupHeading={"Top products"}
        loading={loading}
        link={"/products"}
      />

      <section className="flex w-full justify-around md:gap-4 flex-wrap my-10 font-futura">
        <div className="md:w-1/5 w-[45%] md:m-0 my-4 flex flex-col group relative">
          <img
            src="https://scentsnstories.pk/cdn/shop/collections/Men_Banner.webp?v=1724307797&width=720"
            className="rounded-full group-hover:brightness-50 group-hover:scale-105 relative transition-all duration-300"
            alt=""
          />
          <h2 className="hidden group-hover:flex text-4xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 font-futura">
            Men
          </h2>
          <h3 className="text-brandRed font-semibold  font-futura group-hover:hidden">
            Men
          </h3>
        </div>

        <div className="md:w-1/5 w-[45%] md:m-0 my-4 flex flex-col group relative">
          <img
            src="https://scentsnstories.pk/cdn/shop/collections/Women_Banner.jpg?v=1724307854&width=720"
            className="rounded-full group-hover:brightness-50 group-hover:scale-105 relative transition-all duration-300"
            alt=""
          />
          <h2 className="hidden group-hover:flex text-4xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
            Women
          </h2>
          <h3 className="text-brandRed font-semibold group-hover:hidden">
            Women
          </h3>
        </div>

        <div className="md:w-1/5 w-[45%] md:m-0 my-4 flex flex-col group relative">
          <img
            src="https://scentsnstories.pk/cdn/shop/collections/Eastern_banner.jpg?v=1724307767&width=720"
            className="rounded-full group-hover:brightness-50 group-hover:scale-105 relative transition-all duration-300"
            alt=""
          />
          <h2 className="hidden group-hover:flex text-4xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
            Eastern
          </h2>
          <h3 className="text-brandRed font-semibold group-hover:hidden">
            Eastern
          </h3>
        </div>

        <div className="md:w-1/5 w-[45%] md:m-0 my-4 flex flex-col group relative">
          <img
            src="https://scentsnstories.pk/cdn/shop/collections/western_Banner.jpg?v=1724307819&width=720"
            className="rounded-full group-hover:brightness-50 group-hover:scale-105 relative transition-all duration-300"
            alt=""
          />
          <h2 className="hidden group-hover:flex text-4xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
            Western
          </h2>
          <h3 className="text-brandRed font-semibold group-hover:hidden">
            Western
          </h3>
        </div>
      </section>

      <ProductCardGroup
        products={topProducts}
        groupHeading={"Top products"}
        loading={loading}
        link={"/products"}
      />

      <section className="grid md:grid-cols-2 grid-cols-1 gap-4 p-8">
        <Link>
          <img
            src="https://scentsnstories.pk/cdn/shop/files/Wax_1.webp?v=1724305050&width=900"
            alt=""
            className="rounded-lg"
          />
        </Link>
        <Link>
          <img
            src="https://scentsnstories.pk/cdn/shop/files/sample_set_2_op.webp?v=1724305387&width=900"
            alt="https://scentsnstories.pk/cdn/shop/files/sample_set_2_op.webp?v=1724305387&width=900"
            className="rounded-lg"
          />
        </Link>
        <Link>
          <img
            src="https://scentsnstories.pk/cdn/shop/files/check_4_final_1_op.webp?v=1724305832&width=900"
            alt=""
            className="rounded-lg"
          />
        </Link>
        <Link>
          <img
            src="https://scentsnstories.pk/cdn/shop/files/check_4_final_1_op.webp?v=1724305832&width=900"
            alt=""
            className="rounded-lg"
          />
        </Link>
      </section>

      <ProductCardGroup
        products={topProducts}
        groupHeading={"Top products"}
        loading={loading}
        link={"/products"}
      />

      <section className="w-screen md:p-8 p-4 ">
        <div className="bg-black text-white rounded-3xl flex md:flex-row flex-col items-center justify-between gap-5">
          <img
            src="https://scentsnstories.pk/cdn/shop/files/Scent_Quiz_Web_Banner_2_1.png?v=1721319533&width=1200"
            className="md:w-1/2 w-full aspect-square object-cover md:rounded-l-3xl rounded-t-2xl"
            alt=""
          />

          <div className="md:w-1/2 flex flex-col  items-center justify-center ">
            <h1 className="uppercase font-black text-white md:text-[60px] text-3xl md:text-left text-center leading-snug  w-fit md:w-1/2">
              Can't figure out where to begin?
            </h1>
            <div className="md:w-1/2 pl-4 flex justify-start my-6">
              <Link className="bg-brandRed text-white px-4 py-3 rounded-full hover:bg-red-800 transition-all duration-100">
                Try Our Samples
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CustomerBenefits />
      <Testimonials reviews={reviews} bgColor="blue-500" textColor="black" />
    </main>
  );
};

export default HomePage;
