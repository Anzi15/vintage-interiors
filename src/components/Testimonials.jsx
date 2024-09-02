import { Carousel } from "@material-tailwind/react";
import StarRating from "./StarRating";

const Testimonials = ({ reviews, bgColor = "#5E2C05", textColor = "white" }) => {
  return (
    <section
      className="my-20 max-w-screen"
      style={{ backgroundColor: bgColor }}
    >
      <h1 className={`py-8 text-3xl font-bold uppercase text-[${textColor}] md:w-1/2 m-auto`}
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
            className={`flex w-full p-8 items-center justify-center flex-col h-[15rem] gap-4 text-[${textColor}]`}
            aria-labelledby={`review-${index}`}
            style={{ color: textColor }}>
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
