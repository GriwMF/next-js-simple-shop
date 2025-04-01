'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { products, getProductsByCategory } from '../../lib/productData';
import { useCart } from '../../context/CartContext';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState(categoryFilter || '');
  const [notification, setNotification] = useState({ open: false, message: '' });
  const { addToCart } = useCart();
  
  // Set filtered products when component mounts or category changes
  useEffect(() => {
    setFilteredProducts(getProductsByCategory(category));
  }, [category]);
  
  // Handle category filter change
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  
  // Handle add to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification({ 
      open: true, 
      message: `${product.name} added to cart!` 
    });
  };
  
  // Close notification
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };
  
  // Get unique categories
  const categories = [...new Set(products.map(product => product.category))];
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products
          {category && (
            <Chip 
              label={category} 
              color="primary" 
              onDelete={() => setCategory('')} 
              sx={{ ml: 2, textTransform: 'capitalize' }} 
            />
          )}
        </Typography>
        
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="category-select-label">Filter by Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={category}
            label="Filter by Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat} sx={{ textTransform: 'capitalize' }}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 4
                }
              }}
            >
              <CardMedia
                component="img"
                height="100"
                image={product.image}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  variant="contained" 
                  startIcon={<AddShoppingCartIcon />}
                  onClick={() => handleAddToCart(product)}
                  fullWidth
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', my: 8 }}>
          <Typography variant="h6">No products found.</Typography>
        </Box>
      )}
      
      <Snackbar 
        open={notification.open} 
        autoHideDuration={3000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
