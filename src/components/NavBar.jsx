import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import Dropdown from "./DropDown";

function Navbar({ links }) {
  return (
    <div className="hidden lg:flex items-center gap-8 grow justify-center">
      {links.map((link) => {
        if (link.collections) {
          // For links with collections, use the Dropdown component
          const dropdownLinks = link.collections.map((collection) => ({
            label: collection.name,
            href: collection.href,
          }));

          return (
            <Dropdown 
              key={link.id}
              label={
                  link.name
              }
              lableLink={
                link.href
              }
              links={dropdownLinks} 
            />
          );
        } else {
          return (
            <Link key={link.id} to={link.href}>
              {link.name}
            </Link>
          );
        }
      })}
    </div>
  );
}

export default Navbar;
