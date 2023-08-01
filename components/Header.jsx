import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import Menu from "./Menu";

import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import { BiMenuAltRight } from "react-icons/bi";
import MenuMobile from "./MenuMobile";
import Link from "next/link";
import { fetchDataFromApi } from "@/utils/api";
import { useSelector } from "react-redux";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastSrcollY] = useState(0);
  const [categories, setCategories] = useState(null);

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await fetchDataFromApi("/api/categories?populate=*");
    setCategories(data);
  };

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastSrcollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`w-full h-[50px] md:h-[80px] flex justify-between z-30 bg-white items-center sticky top-0 transition-transform duration-300 ${show} mb-6`}>
        <Wrapper>
          <img src="/logo.svg" alt="myWebLogo" className="h-[30px] " />
          <Menu
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            categories={categories}></Menu>
          {mobileMenu && (
            <MenuMobile
              showCatMenu={showCatMenu}
              setShowCatMenu={setShowCatMenu}
              setMobileMenu={setMobileMenu}
              categories={categories}></MenuMobile>
          )}
          <div className=" flex justify-center items-center gap-6">
            {/* Icon Start */}
            <div className="flex justify-center items-center relative gap-3 cursor-pointer w-fit ">
              <IoMdHeartEmpty className=" w-[25px] h-[30px] " size={25} />
              <div className=" bg-red-600 px-1 text-xs absolute rounded-full shadow-md   -top-1 text-white left-3.5">
                5
              </div>
            </div>
            {/* Icon End */}
            {/* Icon Start */}
            <Link href="/cart">
              <div className="flex justify-center items-center relative gap-3 cursor-pointer w-fit ">
                <BsCart className="w-[20px] h-[30px] " size={25} />
                {cartItems.length > 0 && (
                  <div className=" bg-red-600 px-1 text-xs absolute rounded-full shadow-md  -top-1 text-white left-3">
                    {cartItems.length}
                  </div>
                )}
              </div>
            </Link>
            {/* Icon End */}
            {/* Icon Start */}
            <div className="md:hidden flex justify-center items-center relative gap-3 cursor-pointer w-fit ">
              {!mobileMenu && (
                <BiMenuAltRight
                  className="w-[20px] h-[30px] "
                  size={25}
                  onClick={() => setMobileMenu(true)}
                />
              )}
              {mobileMenu && (
                <VscChromeClose
                  className="w-[20px] h-[30px] "
                  size={25}
                  onClick={() => setMobileMenu(false)}
                />
              )}
            </div>
            {/* Icon End */}
          </div>
        </Wrapper>
      </header>
    </>
  );
};

export default Header;
