import ProductItem from "../components/productItem";
import Footer from "../components/Footer";
import NavBar from "../Navbar";

export default function Products() {
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
    },
    {
      name: "Blue shirt",
      description:
        "Explore a wide range of acoustic, electric, and classical guitars for every skill level.",
      image: "/blueshirt.jpg",
      back_image: "/blueBackView.jpg",
      price: 200,
      like: 20,
      is_new: false,
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
    },
    {
      name: "Gray shirt",
      description:
        "Explore a wide range of acoustic, electric, and classical guitars for every skill level.",
      image: "/gray.jpg",
      back_image: "/grayBackView.jpg",
      price: 200,
      like: 20,
      is_new: true,
    },
    {
      name: "GrayShirt",
      description:
        "Explore a wide range of acoustic, electric, and classical guitars for every skill level.",
      image: "/Grayshirt.jpg",
      back_image: "/grayShirtBackview.jpg",
      price: 200,
      like: 20,
      is_new: true,
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
    },
  ];

  return (
    <>
      <NavBar />
      <div className="pt-14 px-4">
        <h1 className="font-bold text-2xl text-center my-4">
          Lakhey WorkShop Shirt
        </h1>
        <div className="flex flex-wrap m-auto justify-center w-[80%] m-4 p-4 mb-10">
          {products.map((product, index) => (
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
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}
