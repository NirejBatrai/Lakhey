import React from "react";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8 bg-black text-white">
      {/* Header with Navigation */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-red-600">Lakhey Traditions</h1>
        <div className="space-x-4">
          <Link
            href="/"
            className="bg-red-700 hover:bg-red-800 text-white font-medium py-2 px-4 rounded"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="bg-red-700 hover:bg-red-800 text-white font-medium py-2 px-4 rounded"
          >
            Shop
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-64 md:h-96 mb-12 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
            Where Tradition Meets Fashion
          </h2>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-black" />
      </div>

      {/* Our Story Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h3 className="text-2xl font-semibold mb-4 text-red-600">
          The Lakhey Traditions Story
        </h3>
        <p className="text-gray-300 mb-6">
          Founded in 2018, Lakhey Traditions was born from a deep appreciation
          for Nepal's rich cultural heritage and a passion for contemporary
          fashion. Our name draws inspiration from the iconic Lakhey dance, a
          centuries-old tradition that represents protection and cultural
          identity in Nepalese folklore.
        </p>
        <p className="text-gray-300 mb-6">
          What began as a small collection of handcrafted shirts has evolved
          into a diverse clothing line that celebrates the fusion of traditional
          craftsmanship with modern design aesthetics. Each garment tells a
          story—a story of skilled artisans, cultural symbolism, and timeless
          style that transcends trends.
        </p>
        <p className="text-gray-300 mb-6">
          At Lakhey Traditions, we believe that clothing is more than just
          fabric—it's an expression of identity, a canvas for cultural
          appreciation, and a medium through which we can preserve traditional
          techniques while embracing contemporary fashion sensibilities.
        </p>
      </div>

      {/* Our Collections Section */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-6 text-center text-red-100">
          Our Collections
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-red-100">
            <div className="h-48 bg-gray-800"></div>
            <div className="p-6">
              <h4 className="font-semibold text-xl mb-2 text-red-500">
                Everyday Essentials
              </h4>
              <p className="text-gray-400 mb-4">
                Our signature collection of refined casual wear featuring
                premium shirts and versatile basics crafted for comfort and
                style.
              </p>
              <Link
                href="/products"
                className="text-red-500 hover:text-red-400 font-medium"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-red-100">
            <div className="h-48 bg-gray-800"></div>
            <div className="p-6">
              <h4 className="font-semibold text-xl mb-2 text-red-500">
                Heritage Collection
              </h4>
              <p className="text-gray-400 mb-4">
                Modern apparel featuring traditional Nepalese patterns, symbols,
                and textile techniques reimagined for contemporary wardrobes.
              </p>
              <Link
                href="/products"
                className="text-red-500 hover:text-red-400 font-medium"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-red-100">
            <div className="h-48 bg-gray-800"></div>
            <div className="p-6">
              <h4 className="font-semibold text-xl mb-2 text-red-500">
                Artisan Series
              </h4>
              <p className="text-gray-400 mb-4">
                Limited edition pieces showcasing specialized handcrafting
                techniques and collaborative designs with local master artisans.
              </p>
              <Link
                href="/products"
                className="text-red-500 hover:text-red-400 font-medium"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-red-100">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h4 className="text-xl font-semibold mb-2 text-red-500">
            Quality Craftsmanship
          </h4>
          <p className="text-gray-400">
            Every stitch matters. We collaborate with skilled local tailors and
            textile artists who bring decades of expertise to create garments of
            exceptional quality and durability.
          </p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-red-100">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </div>
          <h4 className="text-xl font-semibold mb-2 text-red-500">
            Cultural Preservation
          </h4>
          <p className="text-gray-400">
            We're committed to documenting and preserving traditional Nepalese
            textile techniques and designs through modern fashion applications
            and educational initiatives.
          </p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-red-100">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h4 className="text-xl font-semibold mb-2 text-red-500">
            Ethical Production
          </h4>
          <p className="text-gray-400">
            We ensure fair wages, safe working conditions, and sustainable
            practices throughout our production process, creating positive
            impact for our artisan partners and the environment.
          </p>
        </div>
      </div>

      {/* Our Process Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h3 className="text-2xl font-semibold mb-6 text-center text-red-600">
          Our Process
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h4 className="font-semibold mb-2 text-red-500">Design</h4>
            <p className="text-gray-400 text-sm">
              Researching traditional motifs and collaborating with local
              artists to create unique designs
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h4 className="font-semibold mb-2 text-red-500">Source</h4>
            <p className="text-gray-400 text-sm">
              Selecting premium sustainable fabrics and traditional materials
              from ethical sources
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h4 className="font-semibold mb-2 text-red-500">Craft</h4>
            <p className="text-gray-400 text-sm">
              Hand-crafting each garment with precision and care by our skilled
              artisan partners
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              4
            </div>
            <h4 className="font-semibold mb-2 text-red-500">Deliver</h4>
            <p className="text-gray-400 text-sm">
              Packaging sustainably and delivering quality garments to customers
              worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-900 p-8 rounded-lg mb-16 border border-red-800">
        <h3 className="text-2xl font-semibold mb-6 text-center text-red-600">
          What Our Customers Say
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-black p-6 rounded-lg shadow-sm border-l-2 border-red-600">
            <p className="text-gray-300 mb-4">
              "The quality of Lakhey's shirts is outstanding. I love how they
              combine traditional elements with modern designs. These pieces
              have quickly become favorites in my wardrobe."
            </p>
            <p className="font-semibold text-red-500">- Prakash M.</p>
          </div>
          <div className="bg-black p-6 rounded-lg shadow-sm border-l-2 border-red-600">
            <p className="text-gray-300 mb-4">
              "As someone who appreciates both fashion and cultural heritage,
              I've found Lakhey Traditions to be the perfect blend of both
              worlds. The attention to detail is remarkable."
            </p>
            <p className="font-semibold text-red-500">- Sarah L.</p>
          </div>
          <div className="bg-black p-6 rounded-lg shadow-sm border-l-2 border-red-600">
            <p className="text-gray-300 mb-4">
              "Beyond the beautiful clothes, I appreciate Lakhey's commitment to
              supporting local artisans. It's fashion with purpose, and that
              makes a difference."
            </p>
            <p className="font-semibold text-red-500">- Amrit K.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-700 text-white p-8 rounded-lg mb-16 text-center">
        <h3 className="text-2xl font-bold mb-4">
          Experience Lakhey Traditions
        </h3>
        <p className="mb-6 max-w-2xl mx-auto">
          Discover our collection of thoughtfully crafted garments that bring
          together Nepal's rich textile heritage with contemporary design
          sensibilities.
        </p>
        <Link
          href="/products"
          className="inline-block bg-black text-white font-medium py-3 px-6 rounded hover:bg-gray-900 border border-red-500"
        >
          Shop Our Collection
        </Link>
      </div>

      {/* Contact Section */}
      <div className="max-w-2xl mx-auto mb-16">
        <h3 className="text-2xl font-semibold mb-6 text-center text-red-600">
          Visit Us
        </h3>
        <div className="bg-gray-900 p-8 rounded-lg border border-red-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-red-500">
                Flagship Store
              </h4>
              <p className="text-gray-300 mb-1">45 Jyatha Road, Thamel</p>
              <p className="text-gray-300 mb-1">Kathmandu, Nepal</p>
              <p className="text-gray-300 mb-4">44600</p>

              <h4 className="font-semibold mb-2 text-red-500">Store Hours</h4>
              <p className="text-gray-300 mb-1">
                Monday - Saturday: 10am - 8pm
              </p>
              <p className="text-gray-300">Sunday: 12pm - 6pm</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-red-500">
                Contact Information
              </h4>
              <p className="text-gray-300 mb-1">
                Email: info@lakheytraditional.com
              </p>
              <p className="text-gray-300 mb-4">Phone: +977 1 456 7890</p>

              <h4 className="font-semibold mb-2 text-red-500">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-red-500 hover:text-red-400">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-red-500 hover:text-red-400">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" />
                  </svg>
                </a>
                <a href="#" className="text-red-500 hover:text-red-400">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
