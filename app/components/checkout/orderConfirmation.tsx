import Link from 'next/link';
import { Check } from 'lucide-react';

interface OrderConfirmationProps {
  orderId: string;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderId, formData }) => {
  return (
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
  );
};

export default OrderConfirmation;