'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  
  // Initialize orders from localStorage (client-side only)
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error('Failed to parse orders data', e);
      }
    }
  }, []);
  
  // Save orders to localStorage whenever it changes
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders]);
  
  // Add a new order
  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORDER-${Date.now()}`,
      orderNumber: `2025-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toISOString(),
      status: 'Processing',
      ...orderData
    };
    
    setOrders(prevOrders => [...prevOrders, newOrder]);
    return newOrder;
  };
  
  // Update order status
  const updateOrderStatus = (orderId, status) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
  };
  
  // Get all orders
  const getAllOrders = () => {
    return orders;
  };
  
  // Get order by ID
  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };
  
  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      updateOrderStatus,
      getAllOrders,
      getOrderById
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
