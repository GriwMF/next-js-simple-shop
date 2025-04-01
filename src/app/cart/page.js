'use client';

import { useState } from 'react';
import { 
  Typography, 
  Container, 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  IconButton, 
  Grid, 
  Paper, 
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [clearCartDialog, setClearCartDialog] = useState(false);
  
  // Calculate subtotal, tax and total
  const subtotal = getCartTotal();
  const tax = subtotal * 0.07; // Assuming 7% tax rate
  const total = subtotal + tax;
  
  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, parseInt(newQuantity));
  };
  
  // Handle remove item
  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };
  
  // Handle clear cart dialog
  const handleOpenClearCartDialog = () => {
    setClearCartDialog(true);
  };
  
  const handleCloseClearCartDialog = () => {
    setClearCartDialog(false);
  };
  
  const handleClearCart = () => {
    clearCart();
    setClearCartDialog(false);
  };
  
  // If cart is empty
  if (cart.length === 0) {
    return (
      <Container maxWidth="md">
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            py: 8,
            textAlign: 'center'
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Looks like you haven&apos;t added any products to your cart yet.
          </Typography>
          <Button 
            variant="contained" 
            component={Link} 
            href="/products"
            size="large"
            sx={{ mt: 2 }}
          >
            Browse Products
          </Button>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Shopping Cart
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ overflow: 'hidden' }}>
            {cart.map((item, index) => (
              <Box key={item.id}>
                <Card sx={{ display: 'flex', boxShadow: 'none' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 150 }}
                    image={item.image}
                    alt={item.name}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="h2" variant="h6">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        ${item.price.toFixed(2)}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <TextField
                          size="small"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            handleQuantityChange(item.id, value);
                          }}
                          inputProps={{ 
                            min: 1, 
                            style: { textAlign: 'center', width: '40px' } 
                          }}
                          variant="outlined"
                          sx={{ mx: 1 }}
                        />
                        <IconButton 
                          size="small" 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 2 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                    <IconButton 
                      edge="end" 
                      aria-label="delete" 
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Card>
                {index < cart.length - 1 && <Divider />}
              </Box>
            ))}
          </Paper>
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              component={Link} 
              href="/products" 
              variant="outlined"
            >
              Continue Shopping
            </Button>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={handleOpenClearCartDialog}
              startIcon={<DeleteIcon />}
            >
              Clear Cart
            </Button>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ my: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Tax (7%)</Typography>
                <Typography variant="body1">${tax.toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary">${total.toFixed(2)}</Typography>
              </Box>
            </Box>
            <Button 
              variant="contained" 
              size="large" 
              fullWidth 
              sx={{ mt: 2 }}
              component={Link}
              href="/checkout"
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Clear Cart Confirmation Dialog */}
      <Dialog
        open={clearCartDialog}
        onClose={handleCloseClearCartDialog}
      >
        <DialogTitle>Clear your cart?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove all items from your cart? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClearCartDialog}>Cancel</Button>
          <Button onClick={handleClearCart} color="error" autoFocus>
            Clear Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
