import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const LINKS = [
  {
    title: "Product",
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News"],
  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-black text-white">
    <div className="container px-6 py-12 mx-auto">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <h1 className="max-w-lg text-xl font-semibold tracking-tight xl:text-2xl text-white">
            Subscribe to our newsletter to get an update.
          </h1>
  
          <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
            <input
              id="email"
              type="text"
              className="px-4 py-2  border rounded-md bg-gray-900 text-gray-300 border-gray-600  focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
              placeholder="Email Address"
            />
  
            <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
              Subscribe
            </button>
          </div>
        </div>
  
        <div>
          <p className="font-semibold text-white text-left">Quick Link</p>
  
          <div className="flex flex-col items-start mt-5 space-y-2">
            <p className="transition-colors duration-300 text-gray-300 hover:text-blue-400 hover:underline hover:cursor-pointer ">
              Home
            </p>
            <p className=" transition-colors duration-300 text-gray-300 hover:text-blue-400 hover:underline hover:cursor-pointer ">
              Who We Are
            </p>
            <p className=" transition-colors duration-300 text-gray-300 hover:text-blue-400 hover:underline hover:cursor-pointer ">
              Our Philosophy
            </p>
          </div>
        </div>
  
        <div>
          <p className="font-semibold text-white text-left">Industries</p>
  
          <div className="flex flex-col items-start mt-5 space-y-2">
            <p className=" transition-colors duration-300 text-gray-300 hover:text-blue-400 hover:underline hover:cursor-pointer ">
              Retail & E-Commerce
            </p>
            <p className=" transition-colors duration-300 text-gray-300 hover:text-blue-400 hover:underline hover:cursor-pointer ">
              Information Technology
            </p>
            <p className=" transition-colors duration-300 text-gray-300 hover:text-blue-400 hover:underline hover:cursor-pointer ">
              Finance & Insurance
            </p>
          </div>
        </div>
      </div>
  
      <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700 h-2" />
  
      <div className="sm:flex sm:items-center sm:justify-between">
      <p className="font-sans p-8 text-start md:text-center md:text-lg md:p-4">
        © 2023 Your Company Inc. All rights reserved.
      </p>
  
        <div className="flex gap-4 hover:cursor-pointer">
          <img
            src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg"
            width="30"
            height="30"
            alt="fb"
          />
          <img
            src="https://www.svgrepo.com/show/303115/twitter-3-logo.svg"
            width="30"
            height="30"
            alt="tw"
          />
          <img
            src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg"
            width="30"
            height="30"
            alt="inst"
          />
          <img
            src="https://www.svgrepo.com/show/94698/github.svg"
            width="30"
            height="30"
            alt="gt"
          />
          <img
            src="https://www.svgrepo.com/show/22037/path.svg"
            width="30"
            height="30"
            alt="pn"
          />
          <img
            src="https://www.svgrepo.com/show/28145/linkedin.svg"
            width="30"
            height="30"
            alt="in"
          />
          <img
            src="https://www.svgrepo.com/show/22048/dribbble.svg"
            width="30"
            height="30"
            alt="db"
          />
        </div>
      </div>

    </div>
  </footer>
  
  );
};

export default Footer;
