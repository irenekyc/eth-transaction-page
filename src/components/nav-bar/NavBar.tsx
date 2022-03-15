import React, { FunctionComponent, useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../assets/logo.png";

const navSites = [
  { title: "Market" },
  { title: "Exchange" },
  { title: "Tutorial" },
  { title: "Wallets" },
];

interface NavBarItemProps {
  title: string;
  className?: string;
}
const NavBarItem: FunctionComponent<NavBarItemProps> = ({
  title,
  className,
}: NavBarItemProps) => {
  return <li className={`mx-4 ${className} cursor-pointer`}>{title}</li>;
};

NavBarItem.defaultProps = {
  className: "",
};

const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {navSites.map((nav) => (
          <NavBarItem title={nav.title} key={nav.title} />
        ))}
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>
      <div className="flex relativ ">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(!toggleMenu)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(!toggleMenu)}
          />
        )}
        {toggleMenu && (
          <ul className="z-19 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
            <li className="w-full">
              <AiOutlineClose
                fontSize={28}
                className="text-white md:hidden cursor-pointer"
                onClick={() => setToggleMenu(!toggleMenu)}
              />
            </li>
            {navSites.map((nav) => (
              <NavBarItem
                title={nav.title}
                key={nav.title}
                className="my-2 text-lg"
              />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
