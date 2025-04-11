import NavBar from "./Navbar";
import Link from "next/link";
import Image from "next/image";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <NavBar></NavBar>
      <div className="pt-14 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2  w-full h-[500px] mb-6 px-4 ">
          {/* First Image */}
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-center px-6">
              <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
                New Arrivals
              </h2>
              <Link href="/products">
                <button className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition text-lg shadow-lg cursor-pointer">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>

          {/* Second Image */}
          <div className="relative w-full h-full">
            <Image
              src="/mainImg2.jpg"
              alt="Hero Image 2"
              fill
              className="object-cover "
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  w-full h-[500px] mb-6 px-4 ">
          {/* First Image */}
          <div className="relative w-full h-full">
            <Image
              src="/MainImg.jpg"
              alt="Hero Image 2"
              fill
              className="object-cover "
            />
          </div>

          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-center px-6">
              <h1>Celebrating 20 years of premium blanks</h1>
              <p>
                Proudly New Zealand owned and operated since 2005. We're
                passionate about designing premium blank apparel for the
                creators and makers of today.
              </p>
              <Link href="/aboutus">
                <button className="cursor-pointer group pt-10">
                  <span
                    className="
      relative inline-block
      after:content-[''] after:absolute after:left-0 after:bottom-0
      after:h-[2px] after:bg-current
      after:w-0
      after:transition-all after:duration-700 after:ease-out
      group-hover:after:w-full
    "
                  >
                    learn more about us
                  </span>

                  <span> →</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
