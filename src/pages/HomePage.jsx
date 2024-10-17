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
import CollectionCard from "../components/CollectionCard";
import CollectionCardGroup from "../components/CollectionCardGroup";

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
    <main className="hide-overflow-by-default">
      <div className="w-full flex items-center justify-center">
        <img
          src={
            "/cover.webp"
          }
          // srcSet={`${coverImg640} 640w, ${coverImg800} 800w, ${coverImgDefault} 1280w`}
          // sizes="(max-width: 640px) 640px, (max-width: 800px) 800px, 100vw"
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

      <CollectionCardGroup
        collectionsArray={[
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/vintage-interiors.appspot.com/o/assets%2FX%20MIX%20(40)_11zon.jpg?alt=media&token=ae6bbca3-21c2-4860-a253-00cae7008875",
            name: "Turkish Bed",
            slug: "bed",
          },
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/vintage-interiors.appspot.com/o/assets%2F455212099_946894194120208_7624275114175557766_n.jpg?alt=media&token=42842a1f-5548-46cc-86cc-1e3667c545c6",
            name: "Chandelier",
            slug: "chandelier",
          },
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/vintage-interiors.appspot.com/o/assets%2FWhatsApp%20Image%202024-10-01%20at%2013.34.19_63d1faf5_11zon.jpg?alt=media&token=f723b137-bf50-4ad4-abb3-15105c406a29",
            name: "Dining Table",
            slug: "dining-table",
          },
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/vintage-interiors.appspot.com/o/assets%2FWhatsApp%20Image%202024-10-01%20at%2014.26.34_19a1db37_11zon.jpg?alt=media&token=daffadb8-07b9-4e42-91c9-c406339be162",
            name: "Lounge",
            slug: "lounge",
          },
        ]}
      />

      <ProductCardGroup
        products={topProducts}
        groupHeading={"Top products"}
        loading={loading}
        link={"/products"}
      />

      <CollectionCardGroup
        collectionsArray={[
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/vintage-interiors.appspot.com/o/assets%2FWhatsApp%20Image%202024-10-01%20at%2013.35.41_b6933fe6_11zon.jpg?alt=media&token=cb6b51e5-fab9-4498-85bc-8b7af124804a",
            name: "Console",
            slug: "console",
          },
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/vintage-interiors.appspot.com/o/assets%2FPirate%20bed%202_11zon.jpg?alt=media&token=089499d7-5238-4388-b76d-172266fb9fe3",
            name: "Kids furniture",
            slug: "kids",
          },
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/vintage-interiors.appspot.com/o/assets%2FWhatsApp%20Image%202024-10-01%20at%2013.36.10_c610e633_11zon.jpg?alt=media&token=a86e7f31-08bd-45d6-a367-39340ea05c9b",
            name: "Vase",
            slug: "vase",
          },
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/vintage-interiors.appspot.com/o/assets%2FWhatsApp%20Image%202024-10-01%20at%2013.36.52_6bc216cb_11zon.jpg?alt=media&token=596f40c6-68ba-47ac-bdbf-341fd87d4bfa",
            name: "Candles & Stands",
            slug: "candles-and-stands",
          },
        ]}
      />

      <ProductCardGroup
        products={topProducts}
        groupHeading={"Top products"}
        loading={loading}
        link={"/products"}
      />

      <CollectionCardGroup
        collectionsArray={[
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/vintage-interiors.appspot.com/o/assets%2FWhatsApp%20Image%202024-10-01%20at%2013.37.55_d3d1c137_11zon.jpg?alt=media&token=96674b0c-8fd2-47c4-a977-22c02efc4405",
            name: "Indoor Plants",
            slug: "plants",
          },
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/vintage-interiors.appspot.com/o/assets%2FWhatsApp%20Image%202024-10-01%20at%2013.38.13_b330867f_11zon.jpg?alt=media&token=a9883099-4599-4bb6-a351-537d0341b024",
            name: "Mirrors",
            slug: "mirrors",
          },
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/vintage-interiors.appspot.com/o/assets%2FWhatsApp%20Image%202024-10-01%20at%2013.38.32_44ce1805_11zon.jpg?alt=media&token=f6245a82-a79d-4865-962c-a33285edbd93",
            name: "Office Table",
            slug: "office-table",
          },
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/vintage-interiors.appspot.com/o/assets%2FWhatsApp%20Image%202024-10-01%20at%2013.38.49_b7108c11_11zon.jpg?alt=media&token=9f51668b-516d-472f-bc1c-c328788723ce9",
            name: "Table Lamps",
            slug: "table-lamps",
          },
        ]}
      />

      <ProductCardGroup
        products={topProducts}
        groupHeading={"Top products"}
        loading={loading}
        link={"/products"}
      />

      <section className="parallax flex justify-center items-center">
        <div className="md:w-1/2 text-white rounded-3xl flex md:flex-row flex-col items-center py-20 justify-between gap-5">
          <div className="flex flex-col justify-center items-center">
            <h1 className="uppercase font-black text-white md:text-[60px] text-center text-3xl text-shadow-lg leading-snug md:w-1/">
              Can't figure out where to begin?
            </h1>
            <div className="md:w-1/2 pl-4 flex md:justify-start justify-center my-6">
              <Link
                className="bg-brandRed text-white px-6 py-3 rounded-full hover:bg-red-800 transition-all duration-100"
                to="https://wa.me/923177260000"
                target="_blank"
              >
                Get a FREE consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CustomerBenefits />
      <div
        style={{
          position: "relative",
          paddingBottom: "56.25%",
          height: 0,
          overflow: "hidden",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28257.529805405713!2d68.81521963476563!3d27.711381500000012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3935d56956571ceb%3A0x8858a2849ce0a319!2sVintage!5e0!3m2!1sen!2s!4v1729075210492!5m2!1sen!2s"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Testimonials bgColor="blue-500" textColor="black" />
    </main>
  );
};

export default HomePage;
