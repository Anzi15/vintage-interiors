import { FiTruck } from "react-icons/fi";
import { PiPackage } from "react-icons/pi";
import { TfiWorld } from "react-icons/tfi";
import { FaWhatsapp } from "react-icons/fa";

const benefits = [
  {
    icon: <FiTruck className="text-5xl" />,
    title: "Doorstep Delivery",
    description: "Enjoy the convenience of having your favorite furniture and decor delivered to your doorstep across all major cities in Pakistan.",
  },
  {
    icon: <PiPackage className="text-5xl" />,
    title: "Exclusive After-Sale Support",
    description: "We stand by our products with a commitment to exceptional after-sales service, ensuring your satisfaction long after your purchase.",
  },
  {
    icon: <TfiWorld className="text-5xl font-thin" />,
    title: "Global Quality Standards",
    description: "Our furniture and decor meet international standards, ensuring you receive the finest quality every time.",
  },
  {
    icon: <FaWhatsapp className="text-5xl" />,
    title: "Interior Consultation",
    description: "Our experts are available to assist you in selecting and personalizing your home decor, helping you create the perfect ambiance for every room.",
  },
];

const CustomerBenefits = () => {
  return (
    <section className="bg-[#F6F6F0] min-h-[20rem] flex items-center gap-6 overflow-x-auto md:overflow-x-hidden snap-x snap-mandatory">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex min-w-full md:min-w-[20%] flex-col items-center text-center text-brandBrown gap-4 snap-center">
          {benefit.icon}
          <h2 className="text-xl font-bold">{benefit.title}</h2>
          <p className="max-w-[70%]">{benefit.description}</p>
        </div>
      ))}
    </section>
  );
};

export default CustomerBenefits;
