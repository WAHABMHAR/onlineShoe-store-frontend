import React from "react";
import Wrapper from "./Wrapper";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ products }) => {
  const responsive = {
    //   superLargeDesktop: {
    //     // the naming can be any, depends on you.
    //     breakpoint: { max: 4000, min: 3000 },
    //     items: 5,
    //   },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };
  return (
    <Wrapper>
      <div className=" mt-[200px] mb-[200px] md:mt-[100px] md:mb-0  overflow-hidden md:max-w-screen-md lg:max-w-screen-xl ">
        <div className=" font-bold text-3xl "> You Might Also Like</div>

        <Carousel
          responsive={responsive}
          containerClass="my-[20px]"
          itemClass="px-[10px]">
          {products?.data?.map((product) => {
            return <ProductCard key={product?.id} data={product} />;
          })}
          {/* <ProductCard /> */}
        </Carousel>
      </div>
    </Wrapper>
  );
};

export default RelatedProducts;
