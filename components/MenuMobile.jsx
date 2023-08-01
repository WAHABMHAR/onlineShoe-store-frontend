import Link from "next/link";
import React, { Fragment } from "react";
import { BsChevronDown } from "react-icons/bs";

const MenuMobile = ({
  showCatMenu,
  setShowCatMenu,
  setMobileMenu,
  categories,
}) => {
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
    <ul className="w-full md:hidden h-[(calc(100vh -50px))] absolute top-16 left-0 bg-white text-black font-semibold flex flex-col gap-8  px-2">
      {data?.map((item) => {
        return (
          <Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li
                onClick={() => setShowCatMenu(!showCatMenu)}
                className="cursor-pointer hover:text-black  flex flex-col    py-4 px-4 rounded-md border-b-2"
                key={item?.id}>
                <div className="flex justify-between items-center">
                  {item?.name}
                  <BsChevronDown size={14} />
                </div>

                {showCatMenu && (
                  <ul className=" bg-black/[0.05] ">
                    {categories?.map((Item) => {
                      return (
                        <>
                          <Link
                            key={Item.id}
                            href={`/category/${Item?.attributes?.slug}`}
                            onClick={() => {
                              setMobileMenu(false);
                              setShowCatMenu(false);
                            }}>
                            <li className="py-4 px-8 t flex justify-between">
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
              <li className=" cursor-pointer  py-4 px-4 border-b-2">
                <Link href={item?.url} onClick={() => setMobileMenu(false)}>
                  {item?.name}
                </Link>
              </li>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
};

export default MenuMobile;
