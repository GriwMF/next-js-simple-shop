export const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 129.99,
    image: "/api/placeholder/400/300",
    category: "electronics"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smartwatch",
    price: 89.99,
    image: "/api/placeholder/400/300",
    category: "electronics"
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and eco-friendly t-shirt made from organic cotton",
    price: 24.99,
    image: "/api/placeholder/400/300",
    category: "clothing"
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    description: "Keep your drinks hot or cold with this insulated bottle",
    price: 19.99,
    image: "/api/placeholder/400/300",
    category: "home"
  },
  {
    id: 5,
    name: "Bluetooth Portable Speaker",
    description: "Compact speaker with powerful sound for on-the-go",
    price: 59.99,
    image: "/api/placeholder/400/300",
    category: "electronics"
  },
  {
    id: 6,
    name: "Leather Wallet",
    description: "Stylish and durable genuine leather wallet",
    price: 34.99,
    image: "/api/placeholder/400/300",
    category: "accessories"
  }
];

export function getProductById(id) {
  return products.find(product => product.id === Number(id)) || null;
}

export function getProductsByCategory(category) {
  return category ? products.filter(product => product.category === category) : products;
}
