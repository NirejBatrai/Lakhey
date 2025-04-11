"use client";

import ProductItem from "../components/productItem";
import Footer from "../components/Footer";
import NavBar from "../Navbar";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState(null); // use null to check loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3002/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <NavBar />
      <div className="pt-14 px-4">
        <h1 className="font-bold text-2xl text-center my-4">
          Lakhey WorkShop Shirt
        </h1>
        <div className="flex flex-wrap m-auto justify-center w-[80%] m-4 p-4 mb-10">
          {products === null ? (
            <div>Loading...</div>
          ) : (
            products.map((product, index) => (
              <ProductItem
                key={index}
                index={index}
                productName={product.name}
                description={product.description}
                image={product.image}
                price={product.price}
                isNew={product.is_new}
                back_image={product.back_image}
              />
            ))
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
