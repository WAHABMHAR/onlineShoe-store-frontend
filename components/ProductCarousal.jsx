import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ProductCarousal = ({ images }) => {
  return (
    <div className="max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        showThumbs={30}
        showIndicators={false}
        showStatus={false}
        infiniteLoop={true}
        showArrows={false}
        className="productCarousel">
        {images?.data.map((img) => {
          return (
            <img
              key={img.id}
              src={img?.attributes?.url}
              alt={img?.attributes?.name}
            />
          );
        })}
        {/* <img src="/p1.png" alt="carousal_images" />
        
        <img src="/p3.png" alt="carousal_images" />
        <img src="/p4.png" alt="carousal_images" />
        <img src="/p5.png" alt="carousal_images" />
        <img src="/p6.png" alt="carousal_images" />
        <img src="/p7.png" alt="carousal_images" /> */}
      </Carousel>
    </div>
  );
};

export default ProductCarousal;
