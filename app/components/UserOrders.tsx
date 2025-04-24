import { useState, useEffect } from "react";
import { ArrowLeft, FileText, ShoppingBag, ExternalLink } from "lucide-react";
import Link from "next/link";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("http://localhost:3002/orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store auth token in localStorage
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  // Format date from ISO string
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Link
          href="/account"
          className="flex items-center text-gray-600 hover:text-black transition"
        >
          <ArrowLeft size={16} className="mr-2" />
          <span>Back to Account</span>
        </Link>
      </div>

      <div className="flex items-center mb-8">
        <ShoppingBag size={24} className="mr-3 text-gray-700" />
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-6 rounded-lg text-center">
          <p className="text-red-700 mb-2">Unable to load your orders</p>
          <p className="text-gray-600">{error}</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <FileText size={24} className="text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">
            You haven't placed any orders yet.
          </p>
          <Link
            href="/shop"
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition inline-block"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
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
                    {order.status === "completed" && (
                      <span className="ml-3 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        Delivered
                      </span>
                    )}
                    {order.status === "processing" && (
                      <span className="ml-3 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        Processing
                      </span>
                    )}
                    {order.status === "canceled" && (
                      <span className="ml-3 px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                        Canceled
                      </span>
                    )}
                    {order.status === "shipped" && (
                      <span className="ml-3 px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                        Shipped
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="font-bold mr-8">
                    ${order.totalAmount.toFixed(2)}
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
                          <span className="text-gray-600">Payment Method:</span>
                          <span>{order.paymentMethod || "Credit Card"}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">
                        Shipping Address
                      </h3>
                      <div className="text-sm text-gray-700">
                        <p>
                          {order.shippingAddress?.firstName}{" "}
                          {order.shippingAddress?.lastName}
                        </p>
                        <p>{order.shippingAddress?.address}</p>
                        <p>
                          {order.shippingAddress?.city},{" "}
                          {order.shippingAddress?.state}{" "}
                          {order.shippingAddress?.zipCode}
                        </p>
                        <p>{order.shippingAddress?.country}</p>
                      </div>
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
                        {order.items?.map((item) => (
                          <div
                            key={item.id}
                            className="grid grid-cols-12 p-4 text-sm"
                          >
                            <div className="col-span-6 flex items-center">
                              <div className="w-12 h-12 rounded bg-gray-100 mr-3 overflow-hidden">
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {item.name}
                                </p>
                                <p className="text-gray-500 text-xs mt-1">
                                  {item.size && `Size: ${item.size}`}
                                  {item.color && item.size && " - "}
                                  {item.color && `Color: ${item.color}`}
                                </p>
                              </div>
                            </div>
                            <div className="col-span-2 flex items-center justify-center">
                              ${item.price?.toFixed(2)}
                            </div>
                            <div className="col-span-2 flex items-center justify-center">
                              {item.quantity}
                            </div>
                            <div className="col-span-2 flex items-center justify-end font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-white p-6 rounded-lg border">
                    <h3 className="font-medium text-gray-900 mb-4">
                      Order Summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span>
                          $
                          {order.subtotal?.toFixed(2) ||
                            (order.totalAmount - order.tax).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span>
                          {order.shippingCost > 0
                            ? `$${order.shippingCost.toFixed(2)}`
                            : "Free"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax</span>
                        <span>
                          $
                          {order.tax?.toFixed(2) ||
                            (order.totalAmount * 0.07).toFixed(2)}
                        </span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>${order.totalAmount.toFixed(2)}</span>
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
                      onClick={() => toggleOrderDetails(order.id)}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
