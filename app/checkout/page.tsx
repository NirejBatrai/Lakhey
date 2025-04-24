"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import CheckoutProgress from "../components/checkout/checkoutProgress";
import OrderSummary from "../components/checkout/orderSummary";
import PaymentForm from "../components/checkout/paymentForm";
import ShippingForm from "../components/checkout/shippingForm";
import OrderConfirmation from "../components/checkout/orderConfirmation";
import { getProfileFromToken, getToken } from "../utils/utilFunc";

// Define types for the component
type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  totalPrice: number;
  clearCart: () => void;
};

type CheckoutStep = 1 | 2 | 3;

export interface FormData {
  // Shipping details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // Payment details
  cardName: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  cardName?: string;
  cardNumber?: string;
  expMonth?: string;
  expYear?: string;
  cvv?: string;
  payment?: string;
}

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart() as CartContextType;
  const [step, setStep] = useState<CheckoutStep>(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [formData, setFormData] = useState<FormData>({
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>("");

  // Handle form field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prevState => {
      const newState = {
        ...prevState,
        [name]: value,
      };
      return newState;
    });
  };

  // Validate shipping form
  const validateShippingForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim())
      newErrors.phone = "Phone is required";
    if (!formData.address.trim())
      newErrors.address = "Address is required";
    if (!formData.city.trim())
      newErrors.city = "City is required";
    if (!formData.state.trim())
      newErrors.state = "State is required";
    if (!formData.zipCode.trim())
      newErrors.zipCode = "ZIP code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate payment form
  const validatePaymentForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.cardName.trim())
      newErrors.cardName = "Name on card is required";
    if (!formData.cardNumber.trim())
      newErrors.cardNumber = "Card number is required";
    else if (formData.cardNumber.replace(/\s/g, "").length !== 16)
      newErrors.cardNumber = "Card number must be 16 digits";
    if (!formData.expMonth.trim())
      newErrors.expMonth = "Expiration month is required";
    if (!formData.expYear.trim())
      newErrors.expYear = "Expiration year is required";
    if (!formData.cvv.trim())
      newErrors.cvv = "CVV is required";
    else if (formData.cvv.length < 3)
      newErrors.cvv = "CVV must be at least 3 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle shipping form submission
  const handleShippingSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateShippingForm()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };


  const handlePaymentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validatePaymentForm()) {
      setIsProcessing(true);
      setErrors({});

      try {
        const user = getProfileFromToken();
        const token = getToken();

        const orderItems = cart.map(item => ({
          productId: parseInt(item.id),
          quantity: item.quantity
        }));

        // Construct the shipping address from form data
        const shippingAddress = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        };

        const orderData = {
          userId: user.user_id,
          shippingAddress,
          orderItems,
          status: 'PENDING' // Assuming the API accepts the string value of enum
        };

        const response = await fetch('http://localhost:3000/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` // if required
          },
          body: JSON.stringify(orderData)
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }

        const createdOrder = await response.json();

        setOrderId(createdOrder.id || `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`);
        setIsProcessing(false);
        setStep(3);
        clearCart();
        setOrderComplete(true);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error creating order:', error);
        setIsProcessing(false);
        setErrors({
          payment: "Payment processing failed. Please try again."
        });
      }
    }
  };


  // Format card number with spaces
  const formatCardNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts: string[] = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    const formattedValue = parts.length ? parts.join(" ").substring(0, 19) : v;

    setFormData(prevState => ({
      ...prevState,
      cardNumber: formattedValue,
    }));
  };

  // Show empty cart message
  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center py-16">
          <h1 className="text-3xl font-extrabold text-black mb-4">
            Your cart is empty
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Looks like you haven&apos;t added any items to your cart yet.
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
      <CheckoutProgress step={step} />

      <div className="lg:flex lg:gap-8">
        {/* Main Form Area */}
        <div className="lg:w-2/3">
          {step === 1 && (
            <ShippingForm
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleShippingSubmit={handleShippingSubmit}
            />
          )}

          {step === 2 && (
            <PaymentForm
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              formatCardNumber={formatCardNumber}
              handlePaymentSubmit={handlePaymentSubmit}
              setStep={setStep}
              isProcessing={isProcessing}
            />
          )}

          {step === 3 && (
            <OrderConfirmation
              orderId={orderId}
              formData={formData}
            />
          )}
        </div>

        {/* Order Summary Sidebar */}
        <OrderSummary
          cart={cart}
          totalPrice={totalPrice}
          step={step}
        />
      </div>
    </div>
  );
}