type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    size: string;
    quantity: number;
  };
  
  interface OrderSummaryProps {
    cart: CartItem[];
    totalPrice: number;
    step: number;
  }
  
  const OrderSummary: React.FC<OrderSummaryProps> = ({ cart, totalPrice, step }) => {
    return (
      <div className="lg:w-1/3 mt-6 lg:mt-0">
        <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
          <h2 className="text-xl font-bold mb-4 text-black">Order Summary</h2>
  
          {/* Order Items */}
          <div className="mb-6 max-h-64 overflow-y-auto">
            {step < 3 &&
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center py-3 border-b text-black"
                >
                  <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-black text-sm">Size: {item.size}</p>
                    <div className="flex justify-between mt-1">
                      <p className="text-gray-500 text-xs">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
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
              <span className="text-black">${totalPrice.toFixed(2)}</span>
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
    );
  };
  
  export default OrderSummary;