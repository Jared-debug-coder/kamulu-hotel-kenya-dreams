import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'http://localhost:8000/api';

// Define TypeScript interfaces to match Django models
export interface Room {
  id: number;
  room_number: string;
  room_type: 'STANDARD' | 'DELUXE' | 'SUITE' | 'EXECUTIVE';
  price_per_night: number;
  capacity: number;
  is_available: boolean;
  description: string;
  amenities: string[]; // JSON field in Django
  image_urls: string[]; // JSON field in Django
}

export interface Reservation {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  room: number; // Room ID
  check_in_date: string; // ISO date string
  check_out_date: string; // ISO date string
  number_of_guests: number;
  special_requests?: string;
  status?: 'PENDING' | 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';
  total_price?: number; // Will be calculated by backend
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id?: number;
  name: string;
  quantity: number;
  price: number;
  category: 'FOOD' | 'DRINK';
}

export interface Order {
  id?: number;
  customer_name: string;
  phone_number: string;
  order_items: OrderItem[];
  total_amount: number;
  payment_method: 'CASH' | 'MPESA' | 'CARD';
  table_number?: string;
  room_number?: string;
  special_instructions?: string;
  status?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  created_at?: string;
  updated_at?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to ensure trailing slashes
api.interceptors.request.use((config) => {
  // Only add trailing slash if URL doesn't already have one and isn't empty
  if (config.url && config.url !== '/' && !config.url.endsWith('/')) {
    config.url += '/';
    console.log(`Added trailing slash to URL: ${config.url}`);
  }
  return config;
});

// API functions
export const roomApi = {
  // Get all rooms
  getAll: async (): Promise<Room[]> => {
    try {
      const response = await api.get('/rooms/');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching rooms:', error);
      throw {
        message: 'Failed to fetch rooms',
        status: error.response?.status,
        details: error.response?.data,
      } as ApiError;
    }
  },

  // Get room by ID
  getById: async (id: number): Promise<Room> => {
    try {
      const response = await api.get(`/rooms/${id}/`);
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching room ${id}:`, error);
      throw {
        message: `Failed to fetch room ${id}`,
        status: error.response?.status,
        details: error.response?.data,
      } as ApiError;
    }
  },

  // Get available rooms
  getAvailable: async (
    checkIn: string,
    checkOut: string,
    roomType?: string
  ): Promise<Room[]> => {
    try {
      let url = `/rooms/available/?check_in=${checkIn}&check_out=${checkOut}`;
      if (roomType) {
        url += `&type=${roomType}`;
      }
      const response = await api.get(url);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching available rooms:', error);
      throw {
        message: 'Failed to fetch available rooms',
        status: error.response?.status,
        details: error.response?.data,
      } as ApiError;
    }
  },
};

export const reservationApi = {
  // Create a new reservation
  create: async (reservationData: Omit<Reservation, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<Reservation> => {
    try {
      const response = await api.post('/reservations/', reservationData);
      return response.data;
    } catch (error: any) {
      console.error('Error creating reservation:', error);
      throw {
        message: 'Failed to create reservation',
        status: error.response?.status,
        details: error.response?.data,
      } as ApiError;
    }
  },

  // Get reservation by ID
  getById: async (id: number): Promise<Reservation> => {
    try {
      const response = await api.get(`/reservations/${id}/`);
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching reservation ${id}:`, error);
      throw {
        message: `Failed to fetch reservation ${id}`,
        status: error.response?.status,
        details: error.response?.data,
      } as ApiError;
    }
  },

  // Cancel a reservation
  cancel: async (id: number): Promise<any> => {
    try {
      const response = await api.post(`/reservations/${id}/cancel/`);
      return response.data;
    } catch (error: any) {
      console.error(`Error cancelling reservation ${id}:`, error);
      throw {
        message: `Failed to cancel reservation ${id}`,
        status: error.response?.status,
        details: error.response?.data,
      } as ApiError;
    }
  },
};

export const orderApi = {
  // Create a new order
  create: async (orderData: Omit<Order, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<Order> => {
    try {
      const response = await api.post('/orders/', orderData);
      console.log('Order API response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error creating order:', error);
      throw {
        message: 'Failed to create order',
        status: error.response?.status,
        details: error.response?.data,
      } as ApiError;
    }
  },

  // Get order by ID
  getById: async (id: number): Promise<Order> => {
    try {
      const response = await api.get(`/orders/${id}/`);
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching order ${id}:`, error);
      throw {
        message: `Failed to fetch order ${id}`,
        status: error.response?.status,
        details: error.response?.data,
      } as ApiError;
    }
  },

  // Get all orders
  getAll: async (): Promise<Order[]> => {
    try {
      const response = await api.get('/orders/');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      throw {
        message: 'Failed to fetch orders',
        status: error.response?.status,
        details: error.response?.data,
      } as ApiError;
    }
  },
};

// Utilities
export const formatDateForApi = (date: Date): string => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

export default {
  room: roomApi,
  reservation: reservationApi,
  order: orderApi,
};

