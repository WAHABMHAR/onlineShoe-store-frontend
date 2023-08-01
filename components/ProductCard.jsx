import { getDiscountedPrice } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const ProductCard = ({ data: { attributes: p, id } }) => {
  const router = useRouter();
  let { slug } = router.query;
  return (
    <Link
      href={`/product/${p.slug}`}
      className=" hover:scale-105 transform duration-300 bg-white overflow-hidden cursor-pointer">
      <Image
        width={500}
        height={500}
        src={p?.thumbnail?.data?.attributes?.url}
        alt={p.name}></Image>
      <div className=" font-medium text-lg p-4">
        <h1>{p.name}</h1>
        <div className=" flex gap-4 items-center font-medium">
          <p className=" font-semibold text-lg">&#8377;{p.price}</p>
          {p.original_price && (
            <>
              <p className=" font-semibold text-lg line-through">
                &#8377;{p.original_price}
              </p>
              <p className="ml-auto text-green-500">
                &#8377;{getDiscountedPrice(p.original_price, p.price)}% off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
