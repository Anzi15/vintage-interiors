import { useState } from 'react';
import { Link } from 'react-router-dom';

function Dropdown({ label, links, lableLink }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onMouseEnter={handleMouseEnter}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex flex-row items-center w-full px-4 py-2 bg-transparent rounded-l hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
      >
        <Link to={lableLink}>{label}  </Link>
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          className={`inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform ${
            isDropdownOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div
        className={`absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48 ${
          isDropdownOpen ? 'block' : 'hidden'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="px-2 py-2 bg-white rounded-md shadow">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="block px-4 py-2 mt-2 text-sm  bg-transparent rounded-lg  hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
