import axios from 'axios';
import { AxiosError } from 'axios';

// Determine environment
const isDevelopment = import.meta.env.DEV;
console.log(`Running in ${isDevelopment ? 'development' : 'production'} mode`);

// Base URL for the API with protocol handling
const determineApiBaseUrl = () => {
  // Use environment variable if available
  if (import.meta.env.VITE_API_BASE_URL) {
    console.log(`Using configured API URL: ${import.meta.env.VITE_API_BASE_URL}`);
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // For local development
  if (isDevelopment) {
    console.log('Using development API URL: http://localhost:8000/api');
    return 'http://localhost:8000/api';
  }
  
  // For production, try to match the current protocol (http/https)
  const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
  const fallbackUrl = `${protocol}//api.kamulu-waters-hotel.com/api`;
  console.log(`Using production API URL with protocol ${protocol}: ${fallbackUrl}`);
  return fallbackUrl;
};

const API_BASE_URL = determineApiBaseUrl();

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
  total_price: number; // Required field
  special_requests?: string;
  status?: 'PENDING' | 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';
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

// Order data from menu submission form
export interface OrderData {
  customerName: string;
  phoneNumber: string;
  notes?: string;
  paymentMethod: 'pay_now' | 'pay_on_delivery';
  itemName: string;
  quantity: number;
  price: string;
  category: string;
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
  
  // Log full request URL for debugging
  const fullUrl = `${config.baseURL || ''}${config.url || ''}`;
  console.log(`API Request: ${config.method?.toUpperCase() || 'GET'} ${fullUrl}`);
  
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(`API Error ${error.response.status}: ${error.response.config?.url || 'unknown URL'}`);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error - No response received from server:', error.request);
      console.error('Requested URL:', error.config?.url);
      console.error('Full error:', error);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);
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

  // Get available rooms with retry logic
  getAvailable: async (
    checkIn: string,
    checkOut: string,
    roomType?: string,
    maxRetries = 2
  ): Promise<Room[]> => {
    try {
      console.log('=== FETCHING AVAILABLE ROOMS ===');
      console.log('Request parameters:', { checkIn, checkOut, roomType });
      
      // Get all rooms first
      const response = await api.get('/rooms/');
      console.log('Raw API response:', response.data);
      
      // Handle both array and paginated responses
      const rawRooms = Array.isArray(response.data) ? response.data : response.data.results || [];
      
      // Transform and filter the rooms
      const transformedRooms = rawRooms
        .map((room: any) => ({
        id: room.id,
        room_number: room.room_number,
        room_type: room.room_type,
        price_per_night: parseFloat(room.price_per_night),
        capacity: parseInt(room.capacity),
        is_available: Boolean(room.is_available),
        description: room.description || '',
        amenities: Array.isArray(room.amenities) ? room.amenities : [],
        image_urls: Array.isArray(room.image_urls) ? room.image_urls : []
      }))
      .filter(room => room.is_available); // Only return available rooms
      
      console.log('Transformed and filtered rooms:', transformedRooms);
      return transformedRooms;
      
    } catch (error: any) {
      console.error('Error in getAvailable:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
      
      // Check if it's a network error
      if (!error.response && error.request) {
        throw {
          message: 'Network error. Please check your internet connection.',
          status: 0,
          details: error
        } as ApiError;
      }
      
      // Handle specific error cases
      if (error.response?.status === 500) {
        throw {
          message: 'Server error while fetching rooms. Please try again later.',
          status: 500,
          details: error.response.data
        } as ApiError;
      }
      
      // Handle other errors
      throw {
        message: error.message || 'Failed to fetch available rooms',
        status: error.response?.status,
        details: error.response?.data
      } as ApiError;
    }
  },
};

export const reservationApi = {
  // Create a new reservation
  create: async (reservationData: Omit<Reservation, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<Reservation> => {
    try {
      console.log('=== RESERVATION API DEBUG ===');
      console.log('API Base URL:', API_BASE_URL);
      console.log('Endpoint:', '/reservations/');
      console.log('Request data:', reservationData);
      
      // Add CORS headers to the request
      const response = await api.post('/reservations/', reservationData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      
      console.log('Reservation created successfully');
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      
      return response.data;
    } catch (error: any) {
      console.error('=== RESERVATION ERROR DEBUG ===');
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      
      if (error.response) {
        // The request was made and the server responded with a status
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received');
        console.error('Request details:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Request setup error');
      }
      
      // Check if it's a network error
      const isNetworkError = !error.response && error.request;
      const errorMessage = isNetworkError 
        ? 'Network error: Unable to connect to the server. Please check your internet connection.'
        : error.response?.data?.message || 'Failed to create reservation. Please try again.';
      
      throw {
        message: errorMessage,
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
  
  // Submit order (for menu ordering)
  submitOrder: async (orderData: OrderData): Promise<any> => {
    try {
      // Format the order data for the API
      const formattedOrder = {
        customer_name: orderData.customerName,
        phone_number: orderData.phoneNumber,
        special_instructions: orderData.notes,
        payment_method: orderData.paymentMethod === 'pay_now' ? 'MPESA' : 'CASH',
        order_items: [
          {
            name: orderData.itemName,
            quantity: orderData.quantity,
            price: parseInt(orderData.price.replace(/[^0-9]/g, '')) || 0,
            category: orderData.category.toUpperCase().includes('DRINK') ? 'DRINK' : 'FOOD'
          }
        ],
        total_amount: (parseInt(orderData.price.replace(/[^0-9]/g, '')) || 0) * orderData.quantity
      };
      
      const response = await api.post('/orders/', formattedOrder);
      return response.data;
    } catch (error: any) {
      console.error('Error submitting order:', error);
      throw {
        message: 'Failed to submit order',
        status: error.response?.status,
        details: error.response?.data,
      } as ApiError;
    }
  }
};
// Utilities
export const formatDateForApi = (date: Date): string => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

export default {
  room: roomApi,
  reservation: reservationApi,
  order: orderApi,
  // Export utility functions
  formatDateForApi
};

