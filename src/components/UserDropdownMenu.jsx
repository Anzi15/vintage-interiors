import { signInAnonymously } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../modules/Firebase modules/fireauth';
import { signOut } from "firebase/auth";
import { toast } from 'react-toastify';

// Predefined user details and menu items

const menuItems = [
  { label: 'Dashboard', href: '#' },
  { label: 'Settings', href: '#' },
  { label: 'Earnings', href: '#' },
  { label: 'Sign out', href: '#' },
];

const UserDropdownMenu = ({userImg, name, email, signOutFunc}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleSignout = () => {
    console.log("meow trying")
    signOut(auth)
      .then(() => {
        toast("Signed out");
        navigate("/admin/login"); // Use navigate here instead of <Navigate />
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };
  return (
    <div className='relative'>
      <img
        id="avatarButton"
        type="button"
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full cursor-pointer"
        src={userImg.length ? userImg : "https://cdn-icons-png.flaticon.com/128/1077/1077114.png" }
        alt="User dropdown"
      />

      {/* Dropdown menu */}
      {isOpen && (
        <div
          id="UserDropdownMenuUserDropdownMenu"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 fixed right-0"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{name}</div>
            <div className="font-medium truncate">{email}</div>
          </div>

          <div className="py-1">
            <button
              onClick={handleSignout}>
                Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdownMenu;
