import React from "react";
import FaqsSection from "../components/FaqsSection";
import CustomerBenefits from "../components/CustomerBenefits";
import Testimonials from "../components/Testimonials";
import "animate.css/animate.compat.css";
import ScrollAnimation from "react-animate-on-scroll";
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Vintage Interiors</title>
      </Helmet>

      <main>
        {/* Section 1 - Introduction */}
        <section className="bg-white dark:bg-gray-900">
          <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 text-left">
            <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Timeless Elegance in Every Detail
              </h2>

              <p>
                At Vintage Interiors, we curate an exquisite collection of antique furniture, timeless home decor, and beautiful interiors. Our passion is to blend classic craftsmanship with modern living, creating spaces that are both stylish and functional.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8 select-none">
              <img
                className="w-full skeleton-loading rounded-lg min-h-[17rem]"
                src="https://firebasestorage.googleapis.com/v0/b/vintage-interiors.appspot.com/o/assets%2Flinh-le-giP0e750Dr8-unsplash%20(2).jpg?alt=media&token=17007029-db8e-4be9-a04e-d04fbd372366"
                alt="Vintage chair and table"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
              <img
                className="mt-4 w-full min-h-[17rem] skeleton-loading lg:mt-10 rounded-lg"
                src="https://firebasestorage.googleapis.com/v0/b/vintage-interiors.appspot.com/o/assets%2Fafif-ramdhasuma-H8ATMkhYnIo-unsplash.jpg?alt=media&token=412269ff-df50-41c3-9d92-2f50963844e3"
                alt="Home decor vintage pieces"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </section>

        {/* Section 2 - Craftsmanship */}
        <section className="bg-white dark:bg-gray-900 p-5 px-10 flex justify-center my-10">
          <div className="md:w-[40%] w-full flex flex-col py-4 gap-6">
            <ScrollAnimation animateIn="fadeIn" duration={1.4}>
              <h2 className="text-3xl font-bold uppercase text-brandRed">
                The Art of Crafting Vintage Pieces
              </h2>
            </ScrollAnimation>

            <ScrollAnimation animateIn="fadeIn" duration={1.4}>
              <p className="text-lg font-nomal">
                Each piece in our collection is carefully sourced and restored, ensuring that it maintains its original charm while being functional for modern homes. We pride ourselves on attention to detail and craftsmanship that celebrates the history and uniqueness of every item.
              </p>
            </ScrollAnimation>
          </div>
        </section>

        {/* Section 3 - Sourcing and Craftsmanship */}
        <section className="w-full flex py-10 items-center justify-between md:flex-row flex-col flex-wrap md:gap-0 gap-6">
          <div className="md:w-1/2 w-[95%]">
            <ScrollAnimation animateIn="fadeIn" duration={1.4}>
              <h2 className="text-2xl font-bold uppercase text-brandRed py-2">
                Sourcing Quality Vintage Furniture
              </h2>
              <p className="text-lg font-normal">
                We handpick our furniture from trusted sources around the world.
              </p>
            </ScrollAnimation>
          </div>
          <div className="md:w-1/2 w-[95%]">
            <ScrollAnimation animateIn="fadeIn" duration={1.4}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/vintage-interiors.appspot.com/o/assets%2Fpaul-weaver-nWidMEQsnAQ-unsplash.jpg?alt=media&token=2847aff0-841f-41bb-81bd-409cf437c956"
                alt="Sourcing vintage furniture"
                className="aspect-video rounded-lg"
              />
            </ScrollAnimation>
          </div>
        </section>

        {/* Section 4 - Testimonials */}
        <section className="w-full flex py-10 items-center justify-between md:flex-row flex-col-reverse flex-wrap md:gap-0 gap-6 md:pl-6">
          <div className="md:w-1/2 w-[95%]">
            <ScrollAnimation animateIn="fadeIn" duration={1.4}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/vintage-interiors.appspot.com/o/assets%2Fsimon-kadula-2ovBrbfQr0Y-unsplash.jpg?alt=media&token=d0d2cfa1-0582-4946-8aa6-883de7364a88"
                alt="Vintage craftsmanship"
                className="aspect-video rounded-lg"
              />
            </ScrollAnimation>
          </div>
          <div className="md:w-1/2 w-[95%]">
  <ScrollAnimation animateIn="fadeIn" duration={1.4}>
    <h2 className="text-2xl font-bold uppercase text-brandRed py-2">
      Artisan Crafting and Blending
    </h2>
    <p className="text-lg font-normal">
      Our skilled artisans create each piece with meticulous attention to detail.
    </p>
  </ScrollAnimation>
</div>

        </section>

        {/* Additional Sections - Customer Benefits, Testimonials, and FAQs */}
        <CustomerBenefits />
        <Testimonials bgColor="#575761" />
        <FaqsSection />
      </main>
    </>
  );
};

export default AboutPage;
