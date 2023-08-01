import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";
import { useEffect, useState } from "react";

export default function Home({ products }) {
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   const { data } = await fetchDataFromApi("/api/products");
  //   setData(data);
  // };
  return (
    <main>
      <HeroBanner></HeroBanner>
      <Wrapper>
        <div>
          {/* heading and paragraph start */}
          <div className=" mt-28 text-{40px } text-center flex flex-col  items-center gap-3 w-full">
            <h1 className="font-bold text-4xl">Cushioning for Your Mills</h1>
            <p className="max-w-[800px] font-medium text-xl">
              A LightWeight Nike ZoomX midsole combined with increased stack
              heights to help provide Cushioning during extended streches of
              running
            </p>
          </div>
          {/* heading and paragraph end */}
          {/* products section start */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5 my-14 md:px-0">
            {products?.data.map((product) => {
              return <ProductCard key={product?.id} data={product} />;
            })}
          </div>
        </div>
        {/* products section start */}
      </Wrapper>
    </main>
  );
}

export async function getStaticProps() {
  const products = await fetchDataFromApi("/api/products?populate=*");

  return {
    props: {
      products,
    },
  };
}
