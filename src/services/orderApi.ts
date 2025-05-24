import axios from 'axios';

// Create Axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
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

// Type for the order request that matches backend expectations
interface OrderRequest {
  item_name: string;
  category: string;
  price: string;
  quantity: number;
  notes: string;
  customer_name: string;
  phone_number: string;
  delivery_address: string;
  payment_method: 'pay_now' | 'pay_on_delivery';
}

export const orderApi = {
  submitOrder: async (orderData: {
    itemName: string;
    category: string;
    price: string;
    quantity: number;
    notes: string;
    customerName: string;
    phoneNumber: string;
    deliveryAddress: string;
    paymentMethod: 'pay_now' | 'pay_on_delivery';
  }) => {
    // Convert frontend camelCase to backend snake_case
    const requestData: OrderRequest = {
      item_name: orderData.itemName,
      category: orderData.category,
      price: orderData.price,
      quantity: orderData.quantity,
      notes: orderData.notes,
      customer_name: orderData.customerName,
      phone_number: orderData.phoneNumber,
      delivery_address: orderData.deliveryAddress,
      payment_method: orderData.paymentMethod
    };

    try {
      const response = await api.post('/orders/', requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to submit order:', error);
      throw new Error('Failed to submit order');
    }
  }
};

