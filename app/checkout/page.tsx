"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import { ArrowLeft, CreditCard, Check } from "lucide-react";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [formData, setFormData] = useState({
    // Shipping details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",

    // Payment details
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate shipping form
  const validateShippingForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate payment form
  const validatePaymentForm = () => {
    const newErrors = {};

    if (!formData.cardName.trim())
      newErrors.cardName = "Name on card is required";
    if (!formData.cardNumber.trim())
      newErrors.cardNumber = "Card number is required";
    if (formData.cardNumber.replace(/\s/g, "").length !== 16)
      newErrors.cardNumber = "Card number must be 16 digits";
    if (!formData.expMonth.trim())
      newErrors.expMonth = "Expiration month is required";
    if (!formData.expYear.trim())
      newErrors.expYear = "Expiration year is required";
    if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";
    if (formData.cvv.length < 3)
      newErrors.cvv = "CVV must be at least 3 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle shipping form submission
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (validateShippingForm()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  // Handle payment form submission
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (validatePaymentForm()) {
      setIsProcessing(true);

      // Simulate payment processing
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Generate a random order ID
        const newOrderId =
          "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
        setOrderId(newOrderId);

        setIsProcessing(false);
        setStep(3);
        clearCart(); // Clear the cart after successful order
        setOrderComplete(true);
        window.scrollTo(0, 0);
      } catch (error) {
        setIsProcessing(false);
        setErrors({ payment: "Payment processing failed. Please try again." });
      }
    }
  };

  // Format card number with spaces
  const formatCardNumber = (e) => {
    const { value } = e.target;
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      setFormData({
        ...formData,
        cardNumber: parts.join(" ").substr(0, 19),
      });
    } else {
      setFormData({
        ...formData,
        cardNumber: value,
      });
    }
  };

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center py-16">
          <h1 className="text-3xl font-extrabold text-black mb-4">
            Your cart is empty
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-block bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Checkout Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div
            className={`flex flex-col items-center ${
              step >= 1 ? "text-black" : "text-gray-400"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step >= 1 ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              1
            </div>
            <span className="text-sm font-medium text-white">Shipping</span>
          </div>
          <div
            className={`h-1 flex-1 mx-4 ${
              step >= 2 ? "bg-black" : "bg-gray-500"
            }`}
          ></div>
          <div
            className={`flex flex-col items-center ${
              step >= 2 ? "text-black" : "text-gray-400"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step >= 2 ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              2
            </div>
            <span className="text-sm font-medium">Payment</span>
          </div>
          <div
            className={`h-1 flex-1 mx-4 ${
              step >= 3 ? "bg-black" : "bg-gray-200"
            }`}
          ></div>
          <div
            className={`flex flex-col items-center ${
              step >= 3 ? "text-black" : "text-gray-400"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step >= 3 ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              3
            </div>
            <span className="text-sm font-medium">Confirmation</span>
          </div>
        </div>
      </div>

      <div className="lg:flex lg:gap-8">
        {/* Main Form Area */}
        <div className="lg:w-2/3">
          {step === 1 && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-bold mb-6 text-black">
                Shipping Information
              </h2>
              <form onSubmit={handleShippingSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-black mb-1"
                    >
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`text-black w-full px-4 py-2 border rounded-md ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="text-black block text-sm font-medium mb-1"
                    >
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md text-black ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-black mb-1"
                    >
                      Phone*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md text-black ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-black mb-1"
                    >
                      Address*
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md text-black ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.address}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-black mb-1"
                    >
                      City*
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md text-black ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-black mb-1"
                    >
                      State/Province*
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md text-black  ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.state}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium text-black mb-1"
                    >
                      ZIP / Postal Code*
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md text-black ${
                        errors.zipCode ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.zipCode}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 mb-1 text-black"
                    >
                      Country*
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-black "
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                      <option value="China">China</option>
                      <option value="India">India</option>
                      <option value="Brazil">Brazil</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Link
                    href="/products"
                    className="flex items-center text-black hover:underline"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    Continue Shopping
                  </Link>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-bold mb-6 text-black">
                Payment Information
              </h2>
              {errors.payment && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {errors.payment}
                </div>
              )}
              <form onSubmit={handlePaymentSubmit}>
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <CreditCard size={24} className="mr-2 text-gray-600" />
                    <h3 className="text-lg font-medium text-black">
                      Credit Card
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label
                        htmlFor="cardName"
                        className="block text-sm font-medium text-black mb-1"
                      >
                        Name on Card*
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md text-black ${
                          errors.cardName ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.cardName && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.cardName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Card Number*
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={formatCardNumber}
                        placeholder="XXXX XXXX XXXX XXXX"
                        maxLength="19"
                        className={`w-full px-4 py-2 border rounded-md text-black ${
                          errors.cardNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.cardNumber && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor="expMonth"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Exp. Month*
                        </label>
                        <select
                          id="expMonth"
                          name="expMonth"
                          value={formData.expMonth}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md text-black ${
                            errors.expMonth
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="">Month</option>
                          {Array.from({ length: 12 }, (_, i) => {
                            const month = i + 1;
                            return (
                              <option
                                key={month}
                                value={month.toString().padStart(2, "0")}
                              >
                                {month.toString().padStart(2, "0")}
                              </option>
                            );
                          })}
                        </select>
                        {errors.expMonth && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.expMonth}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="expYear"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Exp. Year*
                        </label>
                        <select
                          id="expYear"
                          name="expYear"
                          value={formData.expYear}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md text-black ${
                            errors.expYear
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="">Year</option>
                          {Array.from({ length: 10 }, (_, i) => {
                            const year = new Date().getFullYear() + i;
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                        {errors.expYear && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.expYear}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="cvv"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          CVV*
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          maxLength="4"
                          placeholder="123"
                          className={`w-full px-4 py-2 border rounded-md text-black ${
                            errors.cvv ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.cvv && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.cvv}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center text-black hover:underline"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    Back to Shipping
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition flex items-center"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Complete Order"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <Check size={48} className="text-green-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-green-800">
                Order Confirmed!
              </h2>
              <p className="text-gray-600 mb-6 text-green-800">
                Your order has been placed successfully.
              </p>

              <div className="mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium mb-2 text-black">Order Number:</p>
                  <p className="text-xl text-black">{orderId}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4 text-black">
                  Order Details
                </h3>
                <div className="border-t border-b py-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-left text-gray-600">Name:</div>
                    <div className="text-right text-black">
                      {formData.firstName} {formData.lastName}
                    </div>

                    <div className="text-left text-gray-600">Email:</div>
                    <div className="text-right text-black">
                      {formData.email}
                    </div>

                    <div className="text-left text-gray-600">
                      Shipping Address:
                    </div>
                    <div className="text-right text-black">
                      {formData.address}, {formData.city}, {formData.state}{" "}
                      {formData.zipCode}, {formData.country}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-gray-600 mb-6">
                  A confirmation email has been sent to {formData.email}.<br />
                  Thank you for shopping with Lakhey!
                </p>

                <Link
                  href="/"
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition inline-block"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-1/3 mt-6 lg:mt-0">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <h2 className="text-xl font-bold mb-4 text-black">Order Summary</h2>

            {/* Order Items */}
            <div className="mb-6 max-h-64 overflow-y-auto">
              {step < 3 &&
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center py-3 border-b"
                  >
                    <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium text-sm ">{item.name}</h3>
                      <p className="text-black text-x t">Size: {item.size}</p>
                      <div className="flex justify-between mt-1">
                        <p className="text-gray-500 text-xs">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-medium">
                          ${item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Pricing Summary */}
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between">
                <span className="text-black">Subtotal</span>
                <span className="text-black">${totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black">Shipping</span>
                <span className="text-black">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black">Tax</span>
                <span className="text-black">
                  ${(totalPrice * 0.07).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t text-black">
                <span>Total</span>
                <span>${(totalPrice + totalPrice * 0.07).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
