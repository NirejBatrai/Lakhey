import React, { FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FormField from './formField';
import { FormData, FormErrors } from '@/app/checkout/page';

interface ShippingFormProps {
  formData: FormData;
  errors: FormErrors;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleShippingSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ 
  formData, 
  errors, 
  handleChange, 
  handleShippingSubmit 
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-6 text-black">
        Shipping Information
      </h2>
      <form onSubmit={handleShippingSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            name="firstName"
            label="First Name*"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            maxLength={50}
          />
          <FormField
            name="lastName"
            label="Last Name*"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            maxLength={50}
          />
          <FormField
            name="email"
            label="Email*"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            maxLength={100}
          />
          <FormField
            name="phone"
            label="Phone*"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            maxLength={20}
          />
          <div className="md:col-span-2">
            <FormField
              name="address"
              label="Address*"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              maxLength={100}
            />
          </div>
          <FormField
            name="city"
            label="City*"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
            maxLength={50}
          />
          <FormField
            name="state"
            label="State/Province*"
            value={formData.state}
            onChange={handleChange}
            error={errors.state}
            maxLength={50}
          />
          <FormField
            name="zipCode"
            label="ZIP / Postal Code*"
            value={formData.zipCode}
            onChange={handleChange}
            error={errors.zipCode}
            maxLength={20}
          />
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-black mb-1"
            >
              Country*
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
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
  );
};

export default ShippingForm;