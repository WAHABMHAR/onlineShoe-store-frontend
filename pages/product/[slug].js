import ProductCarousal from "@/components/ProductCarousal";
import RelatedProducts from "@/components/RelatedProducts";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";
import { getDiscountedPrice } from "@/utils/helpers";
import React, { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { toast } from "react-toastify";

const ProductDetailsPage = ({ product, products }) => {
  const [selectSize, setSelectSize] = useState();
  const [showError, setShowError] = useState(false);
  const p = product?.data?.[0]?.attributes;

  const notify = () => {
    toast.success("Succes! Check Your Cart ", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const dispatch = useDispatch();
  return (
    <div className=" w-full md:py-20">
      <Wrapper>
        <div className="flex flex-col lg:flex-row gap-[50px] lg:gap-[100px] md:px-10">
          {/* Left Start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductCarousal images={p?.image}></ProductCarousal>
          </div>
          {/* Left End */}
          {/* Right Start */}
          <div className="flex-[1] py-3 mt-3">
            {/* first Box of title Start */}
            <div className="flex flex-col gap-1">
              <h1 className=" font-extrabold text-3xl ">{p.name}</h1>
              <h1 className=" font-semibold text-2xl ">{p.subtitle}</h1>
              <div className=" mt-4 flex flex-col gap-1">
                <h3 className=" font-bold ">MRP : &#8377;{p.price}</h3>
                {p.original_price && (
                  <>
                    <div className="flex">
                      <p className=" font-semibold text-lg line-through">
                        &#8377;{p.original_price}
                      </p>
                      <p className="ml-auto text-green-500">
                        &#8377;{getDiscountedPrice(p.original_price, p.price)}%
                        off
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* first Box of title End */}
            {/* Box of Sizes Range Start */}
            <div className="mt-12 flex justify-between">
              <p className=" font-semibold text-base">Select Size</p>
              <p className=" font-semibold text-base text-black/[0.4]">
                Select Guide
              </p>
            </div>
            <div className="mt-1 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              {p.size.data.map((item, i) => (
                <div
                  onClick={() => {
                    setSelectSize(item.size);
                    setShowError(false);
                  }}
                  key={i}
                  id="sizeGrid"
                  className={` font-semibold flex ${
                    !item.enabled
                      ? "cursor-not-allowed  bg-black/[0.1]"
                      : "border hover:bg-black/[0.1] "
                  } ${
                    selectSize === item.size ? "border-black" : ""
                  } justify-center rounded-md items-center border  py-3`}>
                  {item.size}
                </div>
              ))}
            </div>
            {showError && (
              <p className="text-red-500 mt-2 font-medium">
                Size selection is required
              </p>
            )}
            {/* Box of Sizes Range End */}
            {/* Button And Product Dummy Details Start */}
            <div className=" mt-4">
              <button
                onClick={() => {
                  if (!selectSize) {
                    setShowError(true);
                  } else {
                    dispatch(
                      addToCart({
                        ...product?.data?.[0],
                        selectSize,
                        oneQuantityPrice: p.price,
                      })
                    );
                    notify();
                  }
                  document.getElementById("sizeGrid").scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                  });
                }}
                className="w-full text-lg font-bold bg-black rounded-full text-white py-5 mt hover:opacity-75 active:scale-90 duration-300">
                Add to Cart
              </button>
              <button className="w-full flex justify-center items-center gap-2 gap text-lg font-bold bg-white rounded-full text-black border border-black/[0.8] py-5 mt  active:scale-90 duration-300 mt-2">
                Wishlist
                <IoMdHeartEmpty />
              </button>
            </div>
            <div className="mt-20">
              <h1 className="font-extrabold text-2xl ">Products Details</h1>
              <div className=" font-medium text-base mt-2">{p.description}</div>
            </div>
            {/* Button And Product Dummy Details End */}
          </div>
          {/* Right End */}
        </div>
      </Wrapper>
      <RelatedProducts products={products}></RelatedProducts>
    </div>
  );
};

export default ProductDetailsPage;

export async function getStaticPaths() {
  const products = await fetchDataFromApi("/api/products?populate=*");
  const paths = products.data.map((p) => ({
    params: {
      slug: p.attributes.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const product = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );
  const products = await fetchDataFromApi(
    `/api/products?populate=*&[filters][products][slug][$ne]=${slug}`
  );

  return {
    props: {
      product,
      products,
    },
  };
}
