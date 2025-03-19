'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  TextField, 
  Divider,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Alert,
  Snackbar,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { useCart } from '../../context/CartContext';

// Step components
const steps = ['Shipping Address', 'Payment Details', 'Review Order'];

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  
  // Form state
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    saveAddress: false
  });
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    paymentMethod: 'credit'
  });
  
  // Calculate order totals
  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;
  
  // Handle shipping form change
  const handleShippingChange = (e) => {
    const { name, value, checked } = e.target;
    setShippingDetails({
      ...shippingDetails,
      [name]: name === 'saveAddress' ? checked : value
    });
  };
  
  // Handle payment form change
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value
    });
  };
  
  // Handle form validation
  const validateShippingForm = () => {
    const required = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'country'];
    return required.every(field => shippingDetails[field].trim() !== '');
  };
  
  const validatePaymentForm = () => {
    const required = ['cardName', 'cardNumber', 'expDate', 'cvv'];
    return required.every(field => paymentDetails[field].trim() !== '');
  };
  
  // Handle next step
  const handleNext = () => {
    if (activeStep === 0 && !validateShippingForm()) {
      setNotification({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }
    
    if (activeStep === 1 && !validatePaymentForm()) {
      setNotification({
        open: true,
        message: 'Please fill in all payment details',
        severity: 'error'
      });
      return;
    }
    
    if (activeStep === steps.length - 1) {
      // Place order
      handlePlaceOrder();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  
  // Handle back
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  // Handle place order
  const handlePlaceOrder = () => {
    // Clear cart and show success message
    setNotification({
      open: true,
      message: 'Order placed successfully!',
      severity: 'success'
    });

    // Redirect to success page after a delay
    router.push('/order-success');
    clearCart();
  };
  
  // Handle close notification
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };
  
  // If cart is empty, redirect to cart page
  if (cart.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Your cart is empty.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => router.push('/products')}
          sx={{ mt: 2 }}
        >
          Shop Products
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: { xs: 2, md: 4 }, mt: 4, mb: 8 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Checkout
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {activeStep === steps.length ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Thank you for your order!
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2024-{Math.floor(Math.random() * 10000)}. We have emailed your order
              confirmation, and will send you an update when your order has shipped.
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => router.push('/')}
              sx={{ mt: 3 }}
            >
              Return to Home
            </Button>
          </Box>
        ) : (
          <>
            {/* Shipping Address Step */}
            {activeStep === 0 && (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="given-name"
                    variant="outlined"
                    value={shippingDetails.firstName}
                    onChange={handleShippingChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    fullWidth
                    autoComplete="family-name"
                    variant="outlined"
                    value={shippingDetails.lastName}
                    onChange={handleShippingChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address1"
                    name="address1"
                    label="Address line 1"
                    fullWidth
                    autoComplete="shipping address-line1"
                    variant="outlined"
                    value={shippingDetails.address1}
                    onChange={handleShippingChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address2"
                    name="address2"
                    label="Address line 2"
                    fullWidth
                    autoComplete="shipping address-line2"
                    variant="outlined"
                    value={shippingDetails.address2}
                    onChange={handleShippingChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="shipping address-level2"
                    variant="outlined"
                    value={shippingDetails.city}
                    onChange={handleShippingChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    variant="outlined"
                    value={shippingDetails.state}
                    onChange={handleShippingChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="shipping postal-code"
                    variant="outlined"
                    value={shippingDetails.zip}
                    onChange={handleShippingChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="shipping country"
                    variant="outlined"
                    value={shippingDetails.country}
                    onChange={handleShippingChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        name="saveAddress" 
                        color="primary" 
                        checked={shippingDetails.saveAddress}
                        onChange={handleShippingChange}
                      />
                    }
                    label="Use this address for payment details"
                  />
                </Grid>
              </Grid>
            )}
            
            {/* Payment Details Step */}
            {activeStep === 1 && (
              <>
                <Typography variant="h6" gutterBottom>
                  Payment method
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Select Payment Method</FormLabel>
                      <RadioGroup
                        row
                        name="paymentMethod"
                        value={paymentDetails.paymentMethod}
                        onChange={handlePaymentChange}
                      >
                        <FormControlLabel 
                          value="credit" 
                          control={<Radio />} 
                          label="Credit Card" 
                        />
                        <FormControlLabel 
                          value="paypal" 
                          control={<Radio />} 
                          label="PayPal" 
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  
                  {paymentDetails.paymentMethod === 'credit' && (
                    <>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          id="cardName"
                          name="cardName"
                          label="Name on card"
                          fullWidth
                          autoComplete="cc-name"
                          variant="outlined"
                          value={paymentDetails.cardName}
                          onChange={handlePaymentChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          id="cardNumber"
                          name="cardNumber"
                          label="Card number"
                          fullWidth
                          autoComplete="cc-number"
                          variant="outlined"
                          value={paymentDetails.cardNumber}
                          onChange={handlePaymentChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          id="expDate"
                          name="expDate"
                          label="Expiry date"
                          fullWidth
                          autoComplete="cc-exp"
                          variant="outlined"
                          value={paymentDetails.expDate}
                          onChange={handlePaymentChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          id="cvv"
                          name="cvv"
                          label="CVV"
                          helperText="Last three digits on signature strip"
                          fullWidth
                          autoComplete="cc-csc"
                          variant="outlined"
                          value={paymentDetails.cvv}
                          onChange={handlePaymentChange}
                        />
                      </Grid>
                    </>
                  )}
                  
                  {paymentDetails.paymentMethod === 'paypal' && (
                    <Grid item xs={12}>
                      <Alert severity="info">
                        You will be redirected to PayPal to complete your payment after review.
                      </Alert>
                    </Grid>
                  )}
                </Grid>
              </>
            )}
            
            {/* Review Order Step */}
            {activeStep === 2 && (
              <>
                <Typography variant="h6" gutterBottom>
                  Order summary
                </Typography>
                <List disablePadding>
                  {cart.map((item) => (
                    <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
                      <ListItemText
                        primary={item.name}
                        secondary={`Quantity: ${item.quantity}`}
                      />
                      <Typography variant="body2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </ListItem>
                  ))}
                  <Divider sx={{ my: 2 }} />
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Subtotal" />
                    <Typography variant="body1">
                      ${subtotal.toFixed(2)}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Shipping" />
                    <Typography variant="body1">
                      ${shipping.toFixed(2)}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Tax (7%)" />
                    <Typography variant="body1">
                      ${tax.toFixed(2)}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      ${total.toFixed(2)}
                    </Typography>
                  </ListItem>
                </List>
                
                <Grid container spacing={2} sx={{ mt: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                      Shipping
                    </Typography>
                    <Typography gutterBottom>
                      {shippingDetails.firstName} {shippingDetails.lastName}
                    </Typography>
                    <Typography gutterBottom>
                      {shippingDetails.address1}
                      {shippingDetails.address2 && `, ${shippingDetails.address2}`}
                    </Typography>
                    <Typography gutterBottom>
                      {shippingDetails.city}, {shippingDetails.state} {shippingDetails.zip}
                    </Typography>
                    <Typography gutterBottom>{shippingDetails.country}</Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                      Payment details
                    </Typography>
                    <Typography gutterBottom>
                      {paymentDetails.paymentMethod === 'credit' 
                        ? `Credit Card ending in ${paymentDetails.cardNumber.slice(-4)}` 
                        : 'PayPal'}
                    </Typography>
                  </Grid>
                </Grid>
              </>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Paper>
      
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
