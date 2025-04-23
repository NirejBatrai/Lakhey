"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import NavBar from "@/app/Navbar";
import Footer from "@/app/components/Footer";
import { CheckCircle } from "lucide-react";
// This would need to be implemented if you're using it
// import { useCart } from "../../../context/CartContext";

// Use the same products data as in your products page
const products = [
  {
    name: "Blue shirt",
    description:
      "Explore a wide range of acoustic, electric, and classical guitars for every skill level.",
    image: "/blueshirt.jpg",
    back_image: "/blueBackView.jpg",
    price: 200,
    like: 20,
    is_new: false,
    sizes: ["S", "M", "L", "XL"],
    color: "Blue",
    material: "100% Cotton",
    details: "Premium quality shirt with comfortable fit and durable fabric.",
  },
  {
    name: "Brown Shirt",
    description:
      "Explore a wide range of acoustic, electric, and classical guitars for every skill level.",
    image: "/brownshirt.jpg",
    back_image: "/brownshirtBackView.jpg",
    price: 200,
    like: 20,
    is_new: false,
    sizes: ["S", "M", "L", "XL"],
    color: "Brown",
    material: "100% Cotton",
    details: "Premium quality shirt with comfortable fit and durable fabric.",
  },
  {
    name: "Gray shirt",
    description:
      "Explore a wide range of acoustic, electric, and classical guitars for every skill level.",
    image: "/gray.jpg",
    back_image: "/grayBackView.jpg",
    price: 200,
    like: 20,
    is_new: false,
    sizes: ["S", "M", "L", "XL"],
    color: "Gray",
    material: "100% Cotton",
    details: "Premium quality shirt with comfortable fit and durable fabric.",
  },
  {
    name: "GrayShirt",
    description:
      "Explore a wide range of acoustic, electric, and classical guitars for every skill level.",
    image: "/Grayshirt.jpg",
    back_image: "/grayShirtBackview.jpg",
    price: 200,
    like: 20,
    is_new: false,
    sizes: ["S", "M", "L", "XL"],
    color: "Gray",
    material: "100% Cotton",
    details: "Premium quality shirt with comfortable fit and durable fabric.",
  },
  {
    name: "Harlet Shirt",
    description:
      "Explore a wide range of acoustic, electric, and classical guitars for every skill level.",
    image: "/harley.jpg",
    back_image: "/harleyBackView.jpg",
    price: 200,
    like: 20,
    is_new: true,
    sizes: ["S", "M", "L", "XL"],
    color: "Red",
    material: "100% Cotton",
    details: "Premium quality shirt with comfortable fit and durable fabric.",
  },
  {
    name: "Harley Shirt",
    description:
      "Explore a wide range of acoustic, electric, and classical guitars for every skill level.",
    image: "/harley.jpg",
    back_image: "/harleyBackView.jpg",
    price: 200,
    like: 20,
    is_new: true,
    sizes: ["S", "M", "L", "XL"],
    color: "Red",
    material: "100% Cotton",
    details: "Premium quality shirt with comfortable fit and durable fabric.",
  },
];

export interface cartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  // Comment out the cart context usage if you haven't implemented it yet
  // const { addToCart } = useCart();
  const productName = decodeURIComponent(params.name as string);

  const product = products.find((p) => p.name === productName);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState("front");

  // Add this inside your component:
  const [showSuccess, setShowSuccess] = useState(false);

  if (!product) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <button
            onClick={() => router.push("/products")}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Back to Products
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const cartItem = {
      id: `${product.name}-${selectedSize}`,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: quantity,
      image: product.image,
    };

    // If you haven't implemented cart context yet, comment this out
    // addToCart(cartItem);

    // For now, just use localStorage directly
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if item already exists
    const existingItemIndex = cart.findIndex(
      (item: cartItem) => item.id === cartItem.id
    );

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push(cartItem);
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    // Show the green success message
    setShowSuccess(true);

    // Auto-hide after 3 seconds
    setTimeout(() => setShowSuccess(false), 5000);
    // alert("Added to cart successfully!");
    // 🔁 Reload the page
    window.location.reload();
  };

  return (
    <>
      <NavBar />
      <div className="pt-20 px-4 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Images */}
            <div className="md:w-1/2">
              <div className="relative h-[500px] w-full rounded-lg overflow-hidden mb-4">
                <Image
                  src={
                    currentImage === "front"
                      ? product.image
                      : product.back_image
                  }
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.is_new && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </span>
                )}
              </div>
              <div className="flex gap-4">
                <div
                  className={`relative h-24 w-24 rounded-md overflow-hidden cursor-pointer ${
                    currentImage === "front" ? "ring-2 ring-black" : ""
                  }`}
                  onClick={() => setCurrentImage("front")}
                >
                  <Image
                    src={product.image}
                    alt={`${product.name} front`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div
                  className={`relative h-24 w-24 rounded-md overflow-hidden cursor-pointer ${
                    currentImage === "back" ? "ring-2 ring-black" : ""
                  }`}
                  onClick={() => setCurrentImage("back")}
                >
                  <Image
                    src={product.back_image}
                    alt={`${product.name} back`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <span className="text-xl font-semibold mb-4 block">
                ${product.price}
              </span>
              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Size</h3>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`w-10 h-10 flex items-center justify-center border ${
                        selectedSize === size
                          ? "bg-white text-black border-black rounded text-gray-700"
                          : "border-gray-600 hover:border-white"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Quantity</h3>
                <div className="flex border border-gray-300 w-max">
                  <button
                    className="px-4 py-2"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    className="px-4 py-2"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition mb-4"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              {showSuccess && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center text-green-700 bg-green-100 border border-green-300 px-4 py-2 rounded-md shadow-md">
                  <CheckCircle className="mr-2" />
                  <span>1 item added to cart</span>
                </div>
              )}

              <div className="border-t pt-6 mt-6">
                <h3 className="font-semibold mb-2">Product Details</h3>
                <p className="mb-2">{product.details}</p>
                <ul className="text-sm text-gray-600">
                  <li className="mb-1">
                    <span className="font-medium">Color:</span> {product.color}
                  </li>
                  <li className="mb-1">
                    <span className="font-medium">Material:</span>{" "}
                    {product.material}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
