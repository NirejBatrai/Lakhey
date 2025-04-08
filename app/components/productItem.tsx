"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function ProductItem({
  index,
  productName,
  description,
  image,
  back_image,
  price,
  isNew,
}: {
  index: number;
  productName: string;
  description: string;
  image: string;
  back_image: string;
  price: number;
  isNew: boolean;
}) {
  const { addToCart } = useCart();

  const handleBuyNow = () => {
    // For Buy Now, we need to add the item to cart
    // Since we don't have size selection here, we'll default to "M"
    const cartItem = {
      id: `${productName}-M-quickbuy`,
      name: productName,
      price: price,
      size: "M",
      quantity: 1,
      image: image,
    };

    addToCart(cartItem);
    alert("Item added to cart!");
  };

  return (
    <div
      key={index}
      className="group relative shadow-md rounded-xl w-64 p-4 m-2 transition-transform duration-300 hover:scale-105"
    >
      <Link href={`/product/${encodeURIComponent(productName)}`}>
        <div className="relative w-full h-[250px] mb-3 rounded-md overflow-hidden">
          <Image
            className="rounded-md w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300 group-hover:opacity-0"
            src={image}
            fill
            alt={productName}
          />
          <Image
            className="rounded-md w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            src={back_image}
            fill
            alt={`${productName} back`}
          />
        </div>
      </Link>

      <h2 className="text-lg font-bold text-white-800 mb-1">{productName}</h2>
      <p className="text-sm text-gray-500 mb-2">{description}</p>
      <div className="flex items-center justify-between">
        <button
          className="cursor-pointer bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
        <span className="text-sm bg-yellow-300 px-3 py-1 rounded-full font-semibold text-black">
          ${price}
        </span>
      </div>
      {isNew && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          NEW
        </span>
      )}
    </div>
  );
}
