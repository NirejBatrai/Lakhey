"use client";

import { useEffect, useState } from "react";
import ProductItem from "../components/productItem";
import Footer from "../components/Footer";
import NavBar from "../Navbar";

// Product interface that matches your backend entity
interface Product {
  id: number;
  title: string;
  description: string | null;
  price: number;
  stock: number;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default function Products() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:3000/products/all");
        
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        
        const data = await res.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setProducts([]);
      } finally {
        setIsLoading(false);
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
        <div className="flex flex-wrap m-auto justify-center w-[80%] p-4 mb-10">
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : products && products.length > 0 ? (
            products.map((product, index) => (
              <ProductItem
                key={product.id || index}
                index={index}
                productName={product.title}
                description={product.description || ""}
                image={product.images[0] || ""}
                price={product.price}
                isNew={product.stock > 0}
                back_image={product.images[1] || ""}
              />
            ))
          ) : (
            <div className="text-center py-8">No products found</div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}