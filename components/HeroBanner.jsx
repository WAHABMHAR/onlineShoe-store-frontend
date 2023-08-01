import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";

const HeroBanner = () => {
  return (
    <div className=" text-[20px] max-w-[1380px] mx-auto">
      <Carousel
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        showArrows={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className="w-[30px] md:[50px] h-[30px] md:h-[30px] right-[31px] md:right-[50px] absolute bottom-0 flex justify-center items-center bg-black z-10 hover:opacity-90 cursor-pointer">
            <BiArrowBack className=" text-sm text-white" />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            onClick={clickHandler}
            className="w-[30px] md:[50px] h-[30px] md:h-[30px] right-[15px] absolute bottom-0 flex justify-center items-center bg-black z-10 hover:opacity-90 cursor-pointer">
            <BiArrowBack className=" rotate-180 text-sm text-white" />
          </div>
        )}>
        <div>
          <img src="/slide-1.png" className="object-cover " />
          <div className=" font-oswald font-extrabold text-black bg-white absolute   flex items-center justify-center  bottom-10 w-24 h-10 md:w-44 md:h-16">
            <h1 className=" text-3xl">Shop Now</h1>
          </div>
        </div>
        <div>
          <img src="/slide-2.png" className="object-cover" />
          <div className=" font-oswald font-extrabold text-black bg-white absolute   flex items-center justify-center  bottom-10 w-44 h-16">
            <h1 className=" text-3xl">Shop Now</h1>
          </div>
        </div>
        <div>
          <img src="/slide-3.png" className="object-cover" />
          <div className=" font-oswald font-extrabold text-black bg-white absolute   flex items-center justify-center  bottom-10 w-44 h-16">
            <h1 className=" text-3xl">Shop Now</h1>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HeroBanner;
