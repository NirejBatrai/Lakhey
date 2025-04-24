/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, FileText, ShoppingBag, ExternalLink } from "lucide-react";
import Link from "next/link";

// Define interfaces outside of component for better organization
interface OrderItem {
  id: number;
  name: string | null;
  description: string;
  price: number; // Changed to number for calculations
  quantity: number; // Added quantity
  stock: number;
  image: string | null;
  back_image: string | null;
  size?: string; // Added optional properties referenced in JSX
  color?: string;
  like: number;
  is_new: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Order {
  id: number;
  userId: number;
  status: "canceled" | "processing" | "shipped" | "completed";
  shippingAddressId: string;
  shippingAddress?: ShippingAddress;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[]; // Changed from orderItems to items based on usage
  totalAmount?: number; // Made optional since it may be undefined
  subtotal?: number;
  tax?: number;
  shippingCost?: number;
  paymentMethod?: string;
}

const UserOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        // Replace with your actual API endpoint
        const response = await fetch("http://localhost:3000/orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.message || `Failed to fetch orders (${response.status})`
          );
        }

        const data: Order[] = await response.json();
        setOrders(data);
      } catch (err: any) {
        console.error("Error fetching orders:", err);
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrder((prevId) => (prevId === orderId ? null : orderId));
  };

  // Calculate total amount for an order if not provided
  const calculateTotal = (order: Order): number => {
    if (order.totalAmount !== undefined) {
      return order.totalAmount;
    }

    // If items exist, calculate based on them
    if (order.items && order.items.length > 0) {
      return order.items.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    }

    // Fallback value
    return 0;
  };

  // Format date from ISO string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format currency
  const formatCurrency = (amount?: number): string => {
    if (amount === undefined || amount === null) {
      return "$0.00";
    }
    return `$${amount.toFixed(2)}`;
  };

  // Helper function to render status badge
  const renderStatusBadge = (status: Order["status"]) => {
    const statusConfig = {
      completed: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Delivered",
      },
      processing: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "Processing",
      },
      canceled: { bg: "bg-red-100", text: "text-red-800", label: "Canceled" },
      shipped: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        label: "Shipped",
      },
    };

    const config = statusConfig[status];

    return config ? (
      <span
        className={`ml-3 px-2 py-1 text-xs rounded-full ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    ) : null;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
          <p className="mt-4 text-gray-400">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-red-50 p-6 rounded-lg text-center">
          <p className="text-red-700 mb-2">Unable to load your orders</p>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Link
          href="/account"
          className="flex items-center text-gray-600 hover:text-white transition"
        >
          <ArrowLeft size={16} className="mr-2 text-white" />
          <span className="text-white">Back to Account</span>
        </Link>
      </div>

      <div className="flex items-center mb-8">
        <ShoppingBag size={24} className="mr-3 text-white" />
        <h1 className="text-3xl font-bold text-white">My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full mb-4">
            <FileText size={24} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-white">
            No Orders Yet
          </h2>
          <p className="text-gray-400 mb-6">
            You haven&apos;t placed any orders yet.
          </p>
          <Link
            href="/shop"
            className="px-6 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition inline-block"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const totalAmount = calculateTotal(order);

            return (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition flex flex-col md:flex-row md:items-center justify-between"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">
                        Order #{order.id}
                      </span>
                      {renderStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <span className="font-bold mr-8">
                      {formatCurrency(totalAmount)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {order.items?.length || 0} items
                    </span>
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div className="border-t border-gray-200 bg-gray-50 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">
                          Order Details
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Order Number:</span>
                            <span className="font-medium">{order.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date:</span>
                            <span>{formatDate(order.createdAt)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className="capitalize">{order.status}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Payment Method:
                            </span>
                            <span>{order.paymentMethod || "Credit Card"}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">
                          Shipping Address
                        </h3>
                        {order.shippingAddress ? (
                          <div className="text-sm text-gray-700">
                            <p>
                              {order.shippingAddress.firstName}{" "}
                              {order.shippingAddress.lastName}
                            </p>
                            <p>{order.shippingAddress.address}</p>
                            <p>
                              {order.shippingAddress.city},{" "}
                              {order.shippingAddress.state}{" "}
                              {order.shippingAddress.zipCode}
                            </p>
                            <p>{order.shippingAddress.country}</p>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">
                            No shipping information available
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="font-medium text-gray-900 mb-4">
                        Order Items
                      </h3>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="grid grid-cols-12 bg-gray-100 p-4 text-sm font-medium text-gray-700">
                          <div className="col-span-6">Product</div>
                          <div className="col-span-2 text-center">Price</div>
                          <div className="col-span-2 text-center">Quantity</div>
                          <div className="col-span-2 text-right">Total</div>
                        </div>
                        <div className="divide-y">
                          {order.items && order.items.length > 0 ? (
                            order.items.map((item) => (
                              <div
                                key={item.id}
                                className="grid grid-cols-12 p-4 text-sm"
                              >
                                <div className="col-span-6 flex items-center">
                                  <div className="w-12 h-12 rounded bg-gray-100 mr-3 overflow-hidden">
                                    {item.image && (
                                      <img
                                        src={item.image}
                                        alt={item.name || "Product"}
                                        className="w-full h-full object-cover"
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">
                                      {item.name || "Unnamed Product"}
                                    </p>
                                    <p className="text-gray-500 text-xs mt-1">
                                      {item.size && `Size: ${item.size}`}
                                      {item.color && item.size && " - "}
                                      {item.color && `Color: ${item.color}`}
                                    </p>
                                  </div>
                                </div>
                                <div className="col-span-2 flex items-center justify-center">
                                  {formatCurrency(item.price)}
                                </div>
                                <div className="col-span-2 flex items-center justify-center">
                                  {item.quantity}
                                </div>
                                <div className="col-span-2 flex items-center justify-end font-medium">
                                  {formatCurrency(item.price * item.quantity)}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-4 text-center text-gray-500">
                              No items found in this order
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 bg-white p-6 rounded-lg border">
                      <h3 className="font-medium text-gray-900 mb-4">
                        Order Summary
                      </h3>
                      <div className="space-y-2">
                        {/* Calculate subtotal */}
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal</span>
                          <span>
                            {formatCurrency(
                              order.subtotal ||
                                totalAmount -
                                  (order.tax || 0) -
                                  (order.shippingCost || 0)
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Shipping</span>
                          <span>
                            {order.shippingCost && order.shippingCost > 0
                              ? formatCurrency(order.shippingCost)
                              : "Free"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tax</span>
                          <span>
                            {formatCurrency(order.tax || totalAmount * 0.07)}
                          </span>
                        </div>
                        <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                          <span>Total</span>
                          <span>{formatCurrency(totalAmount)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <div>
                        <Link
                          href={`/order/track/${order.id}`}
                          className="flex items-center text-blue-600 hover:text-blue-800 transition"
                        >
                          <ExternalLink size={16} className="mr-1" />
                          <span>Track Order</span>
                        </Link>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleOrderDetails(order.id);
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                      >
                        Close Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
