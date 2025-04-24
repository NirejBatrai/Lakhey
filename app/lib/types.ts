import { OrderStatus } from "../context/CartContext";

// Product interface that matches your backend entity
export interface Product {
    id: number;
    title: string;
    description: string | null;
    price: number;
    stock: number;
    images: string[];
    createdAt?: Date; // From timestamps: true
    updatedAt?: Date; // From timestamps: true
  }
  
  // Product DTO for creating new products
  export interface CreateProductDto {
    title: string;
    description?: string | null;
    price: number;
    stock: number;
    images?: string[];
  }
  
  // Product DTO for updating existing products
  export interface UpdateProductDto {
    title?: string;
    description?: string | null;
    price?: number;
    stock?: number;
    images?: string[];
  }
  
  // Response type for when fetching products
  export interface ProductResponse {
    products: Product[];
    totalCount: number;
    page: number;
    limit: number;
  }





  //---------------------------------------------------------------------------------------------------------------
  //Order types


  // Define interface for order item
export interface OrderItem {
  productId: number;
  quantity: number;
}

// Main interface for CreateOrderDto
export interface CreateOrderDto {
  userId: number;
  orderItems: OrderItem[];
  shippingAddressId: number;
  status: OrderStatus;
}