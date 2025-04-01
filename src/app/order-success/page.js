'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button,
  Divider
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Link from 'next/link';
import { useOrders } from '../../context/OrderContext';

export default function OrderSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getOrderById } = useOrders();
  const [order, setOrder] = useState(null);
  
  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (orderId) {
      const foundOrder = getOrderById(orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      }
    }
  }, [searchParams, getOrderById]);
  
  if (!order) {
    return (
      <Container maxWidth="md">
        <Paper sx={{ p: 4, my: 8, textAlign: 'center' }}>
          <Typography variant="h5">Order information not found</Typography>
          <Button 
            variant="contained" 
            component={Link}
            href="/"
            sx={{ mt: 2 }}
          >
            Return to Home
          </Button>
        </Paper>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, my: 8, textAlign: 'center' }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        
        <Typography variant="h4" component="h1" gutterBottom>
          Order Confirmed!
        </Typography>
        
        <Typography variant="body1" paragraph>
          Thank you for your purchase. Your order has been successfully placed.
        </Typography>
        
        <Box sx={{ my: 4, py: 2, px: 4, bgcolor: 'background.default', borderRadius: 1, display: 'inline-block' }}>
          <Typography variant="h6">Order #{order.orderNumber}</Typography>
        </Box>
        
        <Typography variant="body1" paragraph>
          We've sent a confirmation email with your order details.
          You'll receive another notification when your order ships.
        </Typography>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            component={Link}
            href="/"
          >
            Continue Shopping
          </Button>
          <Button 
            variant="outlined" 
            component={Link}
            href="/products"
          >
            Browse More Products
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
