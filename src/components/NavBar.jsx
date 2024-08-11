import React, { useEffect, useState } from 'react';
import 'flowbite';
import { Link } from 'react-router-dom';
import { LuShoppingCart } from "react-icons/lu";
import { getDocument } from '../modules/Firebase modules/firestore';
import perfumeIcon from "../assets/perfume-icon.png"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(()=>{
    const fetchHeadline = async ()=>{
      try {
        const documentData = await getDocument("storeManagement", "headerNotificationMsg");
        setData(documentData);
      } catch (error) {
        setError(error);
        console.log(error)
      } finally {
        setLoading(false);
      }
    }

    fetchHeadline();
  }, []) 
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="bg-brandBrown w-full min-h-10 text-[1.2rem] flex items-center justify-center text-white">
        <p className={"text-[1rem]"}> 

        {loading ? `Al Zehra Perfumes` : error ? `Al Zehra Perfumes` : data ? data.value : 'Al Zehra Perfumes'}
           </p>
      </div>
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-8 mx-auto  py-6">
        <Link to="/" className="flex items-center">
          <img
            src={perfumeIcon}
            className="h-6 mr-3 sm:h-9"
            alt="Landwind Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Al Zehra
          </span>
        </Link>
        <div className="flex items-center lg:order-2">
          <div className="hidden mt-2 mr-4 sm:inline-block">
            <span></span>
          </div>

          <Link
            to="/cart"
            className=""
          >
            <LuShoppingCart className='text-2xl' />
          </Link>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded={menuOpen}
            onClick={handleMenuToggle}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`w-6 h-6 ${menuOpen ? 'hidden' : ''}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className={`w-6 h-6 ${menuOpen ? '' : 'hidden'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${menuOpen ? '' : 'hidden'}`}
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-white bg-yellow-700 rounded lg:bg-transparent lg:text-yellow-700 lg:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-yellow-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-yellow-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-yellow-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
