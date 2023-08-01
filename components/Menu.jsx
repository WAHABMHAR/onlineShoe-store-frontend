import Link from "next/link";
import React, { Fragment } from "react";
import { BsChevronDown } from "react-icons/bs";

const Menu = ({ showCatMenu, setShowCatMenu, categories }) => {
  const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Categories", subMenu: true },
    { id: 4, name: "Contact", url: "/contact" },
  ];

  const subMenuData = [
    { id: 1, name: "Jordan", doc_count: 11 },
    { id: 2, name: "Sneakers", doc_count: 8 },
    { id: 3, name: "Running shoes", doc_count: 64 },
    { id: 4, name: "Football shoes", doc_count: 107 },
  ];

  return (
    <ul className="hidden md:flex justify-center items-center font-medium gap-8 ">
      {data?.map((item) => {
        return (
          <Fragment key={item?.id}>
            {!!item?.subMenu ? (
              <li
                onMouseEnter={() => setShowCatMenu(true)}
                onMouseLeave={() => setShowCatMenu(false)}
                className="cursor-pointer hover:text-black flex gap-2 justify-center items-center relative ">
                {item?.name}

                <BsChevronDown size={14} />

                {showCatMenu && (
                  <ul className="px-1 bg-white text-black font-medium absolute top-6 left-0 min-w-[250px] shadow-lg">
                    {categories?.map((Item) => {
                      return (
                        <>
                          <Link
                            href={`/category/${Item?.attributes?.slug}`}
                            key={Item.id}>
                            <li className="rounded-md  h-12 flex justify-between items-center hover:bg-black/[0.03] ">
                              {Item?.attributes?.name}
                              <span className="opacity-50 text-sm">{`(${Item?.attributes?.products?.data?.length})`}</span>
                            </li>
                          </Link>
                        </>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className=" cursor-pointer">
                <Link href={item?.url}>{item?.name}</Link>
              </li>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
};

export default Menu;
