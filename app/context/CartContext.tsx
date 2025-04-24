"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
};

export type Address = {
  street: string;
  city: string;
  state?: string; // optional
  postalCode: string;
  country: string;
};

export interface CreateOrderDto {
  userId: number;
  orderItems: OrderItemDto[];
  shippingAddressId?: number;
  shippingAddress?: ShippingAddressDto;
  status: OrderStatus;
}

export interface OrderItemDto {
  productId: number;
  quantity: number;
}

export interface ShippingAddressDto {
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

// Match your backend enum (adjust values to your actual enum if needed)
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

type CartContextType = {
  cart: CartItem[];

  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
  address: Address;
  getCreateOrderDto: (
    userId: number,
    userInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    }
  ) => CreateOrderDto;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const [address, setaddress] = useState<Address | null>(null);

  // Load cart from localStorage on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += item.quantity;
        return newCart;
      } else {
        // Item doesn't exist, add new item
        return [...prevCart, item];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const addAddress = (address: Address) => {
    setaddress(address);
  };

  const getCreateOrderDto = (
    userId: number,
    userInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    }
  ): CreateOrderDto => {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    if (!address) {
      throw new Error("Shipping address is required.");
    }

    if (cart.length === 0) {
      throw new Error("Cart is empty.");
    }

    return {
      userId,
      orderItems: cart.map((item) => ({
        productId: parseInt(item.id, 10), // Make sure this matches backend expectations
        quantity: item.quantity,
      })),
      shippingAddress: {
        ...userInfo,
        address: address.street,
        city: address.city,
        state: address.state ?? "",
        zipCode: address.postalCode,
        country: address.country,
      },
      status: "PENDING", // or make this configurable
    };
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    totalPrice,
    addAddress,
    getCreateOrderDto,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
