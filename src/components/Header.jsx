// "use client";  // Ensures this component runs on the client side in a Next.js app

import { useEffect, useState } from "react";
import CartButton from "./CartButton.jsx";
import HamburgerButton from "./HamburgerButton";
import Logo from "./Logo";
import MobileNavbar from "./MobileNavbar";
import Navbar from "../components/NavBar.jsx";
import { db } from "../modules/firebase-modules/firestore.js";
import { doc, getDoc } from "firebase/firestore";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { Fragment } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navigation = {
  categories: [
    {
      id: "furniture",
      name: "Furniture",
      featured: [
        {
          name: "Vintage Sofas",
          href: "/collection/vintage-sofas",
          imageSrc:
            "https://i.ibb.co/WKWb77v/462272054-989283596547934-4010611048382750771-n.jpg",
          imageAlt:
            "Elegant vintage sofa with wooden frame and plush cushions.",
        },
        {
          name: "Antique Chairs",
          href: "/collection/antique-chairs",
          imageSrc:
            "https://i.ibb.co/nmxGnfb/456943951-954878493321778-7745421307910978186-n.jpg",
          imageAlt: "Set of antique wooden chairs with intricate carvings.",
        },
      ],
      sections: [
        {
          id: "living-room",
          name: "Living Room",
          items: [
            { name: "Sofas", href: "/collection/sofas" },
            { name: "Armchairs", href: "/collection/armchairs" },
            { name: "Coffee Tables", href: "/collection/coffee-tables" },
            { name: "Bookshelves", href: "/collection/bookshelves" },
            { name: "Side Tables", href: "/collection/side-tables" },
            { name: "Ottomans", href: "/collection/ottomans" },
            { name: "TV Stands", href: "/collection/tv-stands" },
            { name: "Browse All", href: "/collection/living-room" },
          ],
        },
        {
          id: "bedroom",
          name: "Bedroom",
          items: [
            { name: "Beds", href: "/collection/beds" },
            { name: "Dressers", href: "/collection/dressers" },
            { name: "Nightstands", href: "/collection/nightstands" },
            { name: "Wardrobes", href: "/collection/wardrobes" },
            { name: "Vanities", href: "/collection/vanities" },
            { name: "Browse All", href: "/collection/bedroom" },
          ],
        },
        {
          id: "dining-room",
          name: "Dining Room",
          items: [
            { name: "Dining Tables", href: "/collection/dining-tables" },
            { name: "Dining Chairs", href: "/collection/dining-chairs" },
            {
              name: "Buffets & Sideboards",
              href: "/collection/buffets-sideboards",
            },
            { name: "Bar Carts", href: "/collection/bar-carts" },
            { name: "Browse All", href: "/collection/dining-room" },
          ],
        },
      ],
    },
    {
      id: "decor",
      name: "Decor",
      featured: [
        {
          name: "Vintage Mirrors",
          href: "/collection/vintage-mirrors",
          imageSrc:
            "https://i.ibb.co/YQQ91Qc/461927543-983742960435331-8295609109407944435-n.jpg",
          imageAlt:
            "Elegant vintage mirror with gold frame and intricate detailing.",
        },
        {
          name: "Wall Art",
          href: "/collection/wall-art",
          imageSrc:
            "https://i.ibb.co/9WrQr95/417469950-909240531218908-7114941053291309164-n.jpg",
          imageAlt: "A selection of framed vintage art pieces on a wall.",
        },
      ],
      sections: [
        {
          id: "lighting",
          name: "Lighting",
          items: [
            { name: "Chandeliers", href: "/collection/chandeliers" },
            { name: "Table Lamps", href: "/collection/table-lamps" },
            { name: "Floor Lamps", href: "/collection/floor-lamps" },
            { name: "Wall Sconces", href: "/collection/wall-sconces" },
            { name: "Browse All", href: "/collection/lighting" },
          ],
        },
        {
          id: "textiles",
          name: "Textiles",
          items: [
            { name: "Rugs", href: "/collection/rugs" },
            { name: "Curtains", href: "/collection/curtains" },
            { name: "Throws", href: "/collection/throws" },
            { name: "Cushions", href: "/collection/cushions" },
            { name: "Browse All", href: "/collection/textiles" },
          ],
        },
        {
          id: "decorative-objects",
          name: "Decorative Objects",
          items: [
            { name: "Vases", href: "/collection/vases" },
            { name: "Candlesticks", href: "/collection/candlesticks" },
            { name: "Clocks", href: "/collection/clocks" },
            { name: "Sculptures", href: "/collection/sculptures" },
            { name: "Browse All", href: "/collection/decorative-objects" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ],
};

export default function Header() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [headerText, setHeaderText] = useState("Vintage Interiors ");
  const [headerLink, setHeaderLink] = useState("/products");
  const [cartItemCount, setCartItemCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("")

  // Function to update the cart item count from local storage
  const updateCartItemCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart-items")) || [];
    setCartItemCount(cartItems.length);
  };

  const handleSearchForm = (e)=>{
    e.preventDefault();
    navigate(`/search?query=${searchQuery.replace(" ","+")}`)
  }

  useEffect(() => {
    // Initialize the cart item count on component mount
    updateCartItemCount();

    // Event listener to update count on local storage change
    const handleStorageChange = (event) => {
      if (event.key === "cart-items") {
        updateCartItemCount();
      }
    };

    // Adding the event listener for storage events
    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const fetchHeaderMsg = async () => {
      try {
        const docRef = doc(db, "storeManagement", "headerNotificationMsg");
        const docSnap = await getDoc(docRef); // Renamed doc to docSnap
        if (docSnap.exists()) {
          console.log(docSnap.data());
          setHeaderText(docSnap.data().value); // Set the value you need
          setHeaderLink(docSnap.data().link); // Set the value you need
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching header message:", error);
      }
    };

    fetchHeaderMsg();
  }, []);

  return (
    <div className="bg-white z-50">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-black data-[selected]:text-black-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={"div"} className="z-50">
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    as="div"
                    className="space-y-10 px-4 pb-8 pt-10 z-30"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <img
                              alt={item.imageAlt}
                              src={item.imageSrc}
                              className="object-cover object-center"
                            />
                          </div>
                          <Link
                            to={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </Link>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <Link
                                to={item.href}
                                className="-m-2 block p-2 text-gray-500"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link
                    to={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <Link to="#" className="-m-2 flex items-center p-2">
                <img
                  alt=""
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/2560px-Flag_of_Pakistan.svg.png"
                  className="block h-auto w-5 flex-shrink-0"
                />
                <span className="ml-3 block text-base font-medium text-gray-900">
                  PKR
                </span>
              </Link>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <Link to={headerLink}>
          <p className="flex h-10 items-center justify-center bg-black px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
            {headerText}
          </p>
        </Link>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="ml flex lg:ml-0 w-52">
                <Link to="/" className="w-full">
                  <Logo />
                </Link>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-black data-[open]:text-black">
                          {category.name}
                        </PopoverButton>
                      </div>

                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in z-50"
                      >
                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 top-1/2 bg-white shadow"
                        />

                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                  <div
                                    key={item.name}
                                    className="group relative text-base sm:text-sm"
                                  >
                                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                      <img
                                        alt={item.imageAlt}
                                        src={item.imageSrc}
                                        className="object-cover object-center"
                                      />
                                    </div>
                                    <Link
                                      to={item.href}
                                      className="mt-6 block font-medium text-gray-900"
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0 z-10"
                                      />
                                      {item.name}
                                    </Link>
                                    <p aria-hidden="true" className="mt-1">
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 text-left gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p
                                      id={`${section.name}-heading`}
                                      className="font-medium text-gray-900 text-lg"
                                    >
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <Link
                                            to={item.href}
                                            className="hover:text-gray-800"
                                          >
                                            {item.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                <div className=" flex justify-center items-center h-screen">
                  <form className="relative" onSubmit={handleSearchForm}>
                    <input
                      type="text"
                      required
                      className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none transition-all duration-300 ease-in-out w-12 focus:w-64 aspect-square"
                      placeholder="Search..."
                      onfocus="this.classList.remove('w-12'); this.classList.add('w-64');"
                      onblur="if(this.value === '') { this.classList.remove('w-64'); this.classList.add('w-12'); }"
                      value={searchQuery}
                      onChange={(e)=>{setSearchQuery(e.target.value)}}
                    />
                    <button
                      type="submit"
                      className="absolute right-0 top-0 mt-3 mr-4"
                    >
                      <svg
                        className="h-4 w-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                      </svg>
                    </button>
                  </form>
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <Link
                    to="#"
                    className="flex items-center text-gray-700 hover:text-gray-800"
                  >
                    <img
                      alt=""
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/2560px-Flag_of_Pakistan.svg.png"
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">PKR</span>
                    <span className="sr-only">, change currency</span>
                  </Link>
                </div>

                {/* Search */}

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cartItemCount}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      
    </div>
  );
}
