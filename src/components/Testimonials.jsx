import { Carousel } from "@material-tailwind/react";
import StarRating from "./StarRating";

const Testimonials = ({
  reviews = [
    {
      stars: 5,
      text: "I purchased a vintage table from Vintage Interiors, and I couldn't be happier! The craftsmanship is incredible, and it fits perfectly in my living room. Highly recommended!",
      author: "Ayesha Batool",
    },
    {
      stars: 5,
      text: "The delivery was prompt, and the packaging was impeccable. I ordered some decor pieces, and they arrived in perfect condition. Excellent service!",
      author: "Fahad Malik",
    },
    {
      stars: 5,
      text: "Vintage Interiors has an amazing selection of furniture. I was thrilled with my new sofa! It’s stylish and super comfortable. Great shopping experience!",
      author: "Sara",
    },
    {
      stars: 5,
      text: "I love my new dining set from Vintage Interiors. It’s perfect for family gatherings. The quality is top-notch, and the customer service was very helpful.",
      author: "Bilal Ahmed",
    },
    {
      stars: 4,
      text: "I ordered a decorative item that took a bit longer to arrive than expected, but it was worth the wait! The piece is stunning and adds a unique touch to my home.",
      author: "Maya Mangi",
    },
    {
      stars: 5,
      text: "Vintage Interiors exceeded my expectations! The furniture quality is outstanding, and the prices are very reasonable. I’ll definitely be back for more.",
      author: "Abdul Rehman",
    },
    {
      stars: 5,
      text: "I gifted my friend a beautiful lamp from Vintage Interiors, and she absolutely loved it! The presentation and quality were exceptional. I’ll be shopping here again soon.",
      author: "Hina Shah",
    },
  ],
  bgColor = "#5E2C05",
  textColor = "white",
}) => {
  return (
    <section
      className="my-20 max-w-screen"
      style={{ backgroundColor: bgColor }}
    >
      <h1
        className={`py-8 text-3xl font-bold uppercase`}
        style={{ color: textColor }}
      >
        We take pride in our customer's words
      </h1>
      <Carousel
        loop={true}
        autoplay={true}
        autoplayDelay={5000}
        className="rounded-xl h-[20rem] aspect-video"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                  activeIndex === i ? "w-8 bg-white/50" : "w-4 bg-white/60"
                }`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            className={`flex w-full p-8 items-center justify-center flex-col h-[15rem] gap-4`}
            aria-labelledby={`review-${index}`}
            style={{ color: textColor }}
          >
            <StarRating activeStars={review.stars} />
            <p className="md:w-[50%] w-[90%]">{review.text}</p>
            <b className="uppercase">{review.author}</b>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Testimonials;
