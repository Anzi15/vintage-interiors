import { Outlet, Link, Navigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import eyeGif from "../assets/eye-gif.gif";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { isUserLoggedIn } from "../modules/Firebase modules/fireauth";
import { useEffect, useState } from "react";
import { auth } from "../modules/Firebase modules/fireauth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../modules/Firebase modules/firestore';
import { collection } from 'firebase/firestore';
import { Value } from "sass";

AdminSidebar;
const AdminLayout = () => {
  const [user, loading, error] = useAuthState(auth);
  const [Adminvalue, AdminLoading, AdminError] = useCollection(
    collection(db,"Admins"),
    {
      snapshotListenOptions:{
        includeMetadataChanges: true
      }
    }
  )

  useEffect(()=>{
    if(user){
      Adminvalue.docs.map((doc)=>{
        console.log(doc.Email)
        if(user.email !== doc.Email){
          <Navigate to={"/admin/unauthorized"} />
        }
      })
    }

  },[Adminvalue, user])

  return (
    <>
      {user ? (
        <div className="flex min-h-screen">
          <AdminSidebar className="w-64 fixed" />
          <main className="flex-1 ml-64 p-6">
            <nav className="w-full flex justify-between items-center">
              Al Zehra
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7qKgRvChw4p7QLmLJ_Vw2PyM11C6ThI6oA&s"
                      }
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </nav>
            <Outlet />
          </main>
        </div>
      ) : (
        <div className="h-screen w-screen flex items-center justify-center flex-col gap-6">
          <h1 className="text-3xl">Please Log in to continue</h1>
          <img
            src={eyeGif}
            alt="ghostIllustration"
            className="h-[20rem] my-4 select-none"
            draggable={false}
          />
          <Link to="/admin/login" className="blue-outline-hover-animation-btn">
            Log In
            <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
              <path
                clipRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      )}
    </>
  );
};

export default AdminLayout;
