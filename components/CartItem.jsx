import { removeItem, updateCart } from "@/store/cartSlice";
import Image from "next/image";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";

const CartItem = ({ cartItem }) => {
  const c = cartItem.attributes;
  const dispatch = useDispatch();

  const updateCartItem = (e, key) => {
    let payload = {
      key,
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      id: cartItem.id,
    };
    dispatch(updateCart(payload));
  };

  return (
    <div className="h-[150px] w-full border-b ">
      <div className=" flex justify-between mt-3  w-full">
        <div className=" flex  gap-3">
          {/* image Start */}
          <div className=" w-[120px] h-[120px]">
            <Image
              src={c.thumbnail.data.attributes.url}
              width={120}
              height={120}
              alt={c.name}></Image>
          </div>
          {/* image End */}
          <div className="flex flex-col gap-2 py-3">
            {/* titles start  */}
            <h1 className="font-bold text-xl">{c.name}</h1>

            <h1 className="font-semibold text-black/[0.8]  text-sm">
              {c.subtitle}
            </h1>
            {/* titles end */}
            {/* option start */}
            <div className="flex items-center gap-3">
              <div className=" flex gap-2">
                <h1 className=" font-semibold text-sm  text-black/[0.7]">
                  Size:
                </h1>
                <div className=" border border-black/[0.4]">
                  <select
                    id="select"
                    onChange={(e) => updateCartItem(e, "selectSize")}>
                    {c.size.data.map((item, i) => (
                      <option
                        key={i}
                        disabled={!item.enabled ? true : false}
                        value={item.size}
                        selected={cartItem.selectSize === item.size}>
                        {item.size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className=" flex gap-2">
                <h1 className=" font-semibold text-sm text-black/[0.7]">
                  Quantity:
                </h1>
                <div className=" border border-black/[0.4]">
                  <select
                    id="select"
                    onChange={(e) => updateCartItem(e, "quantity")}>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => {
                      return (
                        <option
                          key={i}
                          selected={cartItem.quantity === q}
                          value={q}>
                          {q}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* option end */}
        </div>
        {/* title and delete Icon  Start*/}
        <div className="flex flex-col gap-8 items-center py-3 pr-8">
          <h1 className="font-medium text-sm text-black/[0.8]">
            MRP : &#8377;{c.price}
          </h1>
          <div onClick={() => dispatch(removeItem({ id: cartItem.id }))}>
            <RiDeleteBin6Line size={20} className=" cursor-pointer" />
          </div>
        </div>
        {/* title and delete Icon  End*/}
      </div>
    </div>
  );
};

export default CartItem;
