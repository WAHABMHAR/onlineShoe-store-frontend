import CartItem from "@/components/CartItem";
import Wrapper from "@/components/Wrapper";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";
import { makePaymentMethod } from "@/utils/api";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const subTotal = useMemo(() => {
    return cartItems.reduce((total, val) => total + val.attributes.price, 0);
  }, [cartItems]);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      const res = await makePaymentMethod("/api/orders", {
        products: cartItems,
      });
      await stripe.redirectToCheckout({
        sessionId: res.stripeSession.id,
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="flex flex-col justify-center my-6">
          <h1 className=" text-center font-extrabold sm:text-2xl lg:text-4xl">
            Shopping Cart
          </h1>

          <Wrapper>
            <div className="flex flex-col w-full lg:flex-row  my-10 gap-6">
              {/* LeftItem start */}
              <div className="lg:w-[75%] md:w-[100%]">
                <h1 className="font-bold text-xl ">Cart Items</h1>
                {cartItems.map((cartItem, i) => (
                  <CartItem key={i} cartItem={cartItem}></CartItem>
                ))}
                {/* <CartItem></CartItem>
                <CartItem></CartItem> */}
              </div>
              {/* LeftItem End */}
              {/* RightBox Start */}
              <div className="w-[25%]">
                <h1 className="font-bold text-xl"> Summary</h1>
                <div className=" p-5 flex flex-col  gap-16 my-5 rounded-lg bg-black/[0.1]">
                  <div className=" flex justify-between">
                    <h1 className=" font-bold text-base">SUB-TOTAL</h1>
                    <h1 className="font-semibold text-sm">&#8377;{subTotal}</h1>
                  </div>
                  <p className="font-light text-sm ">
                    The subtotal reflects the total price of your order
                    including duties taxes .Before any Applicable discounts. It
                    does not Includes deleivery coats and international
                    transaction charges
                  </p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full text-lg font-bold bg-black rounded-full flex justify-center items-center gap-2 text-white py-5 mt hover:opacity-75 active:scale-90 duration-300">
                  Checkout
                  {loading && (
                    <img src="/spinner.svg" alt="spinner_of_Checkout"></img>
                  )}
                </button>
              </div>
              {/* RightBox End */}
            </div>
          </Wrapper>
        </div>
      ) : (
        // /empty box start
        <div className=" flex flex-col justify-center items-center gap-4">
          <Image
            src="/empty-cart.jpg"
            width={300}
            height={300}
            alt="this is empty cart image"></Image>
          <div className=" text-center">
            <p className=" font-bold text-sm">Your Cart Is Empty</p>
            <p className=" font-bold text-sm">
              Looks like You have not added items in your cart
            </p>
          </div>
          <Link href="/" className=" w-[300px]">
            <button className="w-full text-lg font-bold bg-black rounded-full text-white py-5 mt hover:opacity-75 active:scale-90 duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
        // /empty box END
      )}
    </>
  );
};

export default cart;
