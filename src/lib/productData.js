export const products = [
  {
    id: 1,
    name: "SHORTENED DOUBLE-BREASTED GREY TRENCH COAT",
    description: "Color: grey",
    price: 99.99,
    image: "/images/products/grey-coat.jpg",
    category: "COATS"
  },
  {
    id: 2,
    name: "BEIGE TRENCH COAT",
    description: "Color: beige",
    price: 110.99,
    image: "/images/products/beige-coat.jpg",
    category: "COATS"
  },
  {
    id: 3,
    name: "PLAID COAT",
    description: "Color: grey",
    price: 49.99,
   image: "/images/products/plaid-grey-coat.jpg",
    category: "COATS"
  },
  {
    id: 4,
    name: "BASIC UNISEX GREY T-SHIRT",
    description: "Color: grey",
    price: 5.99,
    image: "/images/products/grey-basic-tshirt.jpg",
    category: "T-SHIRTS"
  },
  {
    id: 5,
    name: "BASIC UNISEX WHITE T-SHIRT",
    description: "Color: white",
    price: 5.99,
    image: "/images/products/white-basic-tshirt.jpg",
    category: "T-SHIRTS"
  },
  {
    id: 6,
    name: "BASIC UNISEX PEACH T-SHIRT",
    description: "Color: peach",
    price: 5.99,
    image: "/images/products/peach-basic-tshirt.jpg",
    category: "T-SHIRTS"
  },
  {
    id: 7,
    name: "FLARED JEANS",
    description: "Color: navy",
    price: 10.99,
    image: "/images/products/flared-jeans.jpg",
    category: "JEANS"
  },
  {
    id: 8,
    name: "HIGH-WAISTED MOM JEANS",
    description: "Color: blue",
    price: 10.99,
    image: "/images/products/mom-jeans.jpg",
    category: "JEANS"
  },
  {
    id: 9,
    name: "HIGH-WAISTED SKINNY JEANS",
    description: "Color: grey",
    price: 10.99,
    image: "/images/products/skinny-jeans.jpg",
    category: "JEANS"
  },
  {
    id: 10,
    name: "BASIC SILVER EARRINGS",
    description: "Color: silver",
    price: 20.99,
    image: "/images/products/silver-earrings.jpg",
    category: "ACCESSORIES"
  },
  {
    id: 11,
    name: "GOLD-COLORED STAR EARRINGS",
    description: "Color: gold",
    price: 20.99,
    image: "/images/products/gold-earrings.jpg",
    category: "ACCESSORIES"
  },
  {
    id: 12,
    name: "PINK GEM-STONE EARRINGS",
    description: "Color: PINK",
    price: 20.99,
    image: "/images/products/gemstone-earrings.jpg",
    category: "ACCESSORIES"
  },
  {
    id: 13,
    name: "BROWN TRENCH COAT",
    description: "Color: brown",
    price: 99.99,
    image: "/images/products/brown-coat.jpg",
    category: "COATS"
  },
  {
    id: 14,
    name: "WHITE WINTER COAT",
    description: "Color: white",
    price: 119.99,
    image: "/images/products/white-winter-coat.jpg",
    category: "COATS"
  },
  {
    id: 15,
    name: "YELLOW COAT",
    description: "Color: yellow",
    price: 89.99,
    image: "/images/products/yellow-coat.jpg",
    category: "COATS"
  },
  {
    id: 16,
    name: "SUNGLASSES",
    description: "Color: brown",
    price: 9.99,
    image: "/images/products/sunglasses.jpg",
    category: "ACCESSORIES"
  },
  {
    id: 17,
    name: "SILVER NECKLACE",
    description: "Color: silver",
    price: 9.99,
    image: "/images/products/silver-necklace.jpg",
    category: "ACCESSORIES"
  },
  {
    id: 18,
    name: "GOLD-COLORED RINGS",
    description: "Color: golden",
    price: 27.99,
    image: "/images/products/gold-colored-rings.jpg",
    category: "ACCESSORIES"
  }
];

export function getProductById(id) {
  return products.find(product => product.id === Number(id)) || null;
}

export function getProductsByCategory(category) {
  return category ? products.filter(product => product.category === category) : products;
}
