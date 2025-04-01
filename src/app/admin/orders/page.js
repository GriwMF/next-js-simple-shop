'use client';

import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TablePagination,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField
} from '@mui/material';
import { useOrders } from '../../../context/OrderContext';

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useOrders();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Handle order selection for details
  const handleOpenOrderDetails = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  // Handle order status update
  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({...selectedOrder, status: newStatus});
    }
  };
  
  // Filter orders based on status and search query
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus ? order.status === filterStatus : true;
    const matchesSearch = searchQuery ? 
      (order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
       order.shippingDetails.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
       order.shippingDetails.lastName.toLowerCase().includes(searchQuery.toLowerCase())) : true;
    
    return matchesStatus && matchesSearch;
  });
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'primary';
      case 'Shipped':
        return 'info';
      case 'Delivered':
        return 'success';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  if (orders.length === 0) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
          Orders Management
        </Typography>
        <Paper sx={{ p: 4, my: 4, textAlign: 'center' }}>
          <Typography variant="h6">No orders found</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            There are no orders in the system yet.
          </Typography>
        </Paper>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Orders Management
        </Typography>
        
        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Search by Order # or Customer"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Filter by Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Filter by Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="Processing">Processing</MenuItem>
                  <MenuItem value="Shipped">Shipped</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Orders Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order #</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell>
                    {`${order.shippingDetails.firstName} ${order.shippingDetails.lastName}`}
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip 
                      label={order.status} 
                      color={getStatusColor(order.status)} 
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleOpenOrderDetails(order)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
      
      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog 
          open={openDialog} 
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Order #{selectedOrder.orderNumber}
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={3}>
              {/* Order Status */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">Status</Typography>
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                  <Chip 
                    label={selectedOrder.status} 
                    color={getStatusColor(selectedOrder.status)} 
                  />
                  <FormControl sx={{ ml: 2, minWidth: 120 }} size="small">
                    <Select
                      value={selectedOrder.status}
                      onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                    >
                      <MenuItem value="Processing">Processing</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              
              {/* Order Date */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">Date</Typography>
                <Typography variant="body1">{formatDate(selectedOrder.date)}</Typography>
              </Grid>
              
              {/* Customer Info */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">Customer</Typography>
                <Typography variant="body1">
                  {`${selectedOrder.shippingDetails.firstName} ${selectedOrder.shippingDetails.lastName}`}
                </Typography>
              </Grid>
              
              {/* Shipping Address */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">Shipping Address</Typography>
                <Typography variant="body2">
                  {selectedOrder.shippingDetails.address1}
                  {selectedOrder.shippingDetails.address2 && `, ${selectedOrder.shippingDetails.address2}`}
                </Typography>
                <Typography variant="body2">
                  {`${selectedOrder.shippingDetails.city}, ${selectedOrder.shippingDetails.state} ${selectedOrder.shippingDetails.zip}`}
                </Typography>
                <Typography variant="body2">
                  {selectedOrder.shippingDetails.country}
                </Typography>
              </Grid>
              
              {/* Payment Method */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">Payment Method</Typography>
                <Typography variant="body1">
                  {selectedOrder.paymentDetails.paymentMethod === 'credit' 
                    ? `Credit Card (${selectedOrder.paymentDetails.cardNumber})` 
                    : 'PayPal'}
                </Typography>
              </Grid>
              
              {/* Order Items */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                  Order Items
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Qty</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              
              {/* Order Summary */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '200px', mb: 1 }}>
                    <Typography variant="body2">Subtotal:</Typography>
                    <Typography variant="body2">${selectedOrder.subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '200px', mb: 1 }}>
                    <Typography variant="body2">Shipping:</Typography>
                    <Typography variant="body2">${selectedOrder.shipping.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '200px', mb: 1 }}>
                    <Typography variant="body2">Tax:</Typography>
                    <Typography variant="body2">${selectedOrder.tax.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '200px', mt: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">Total:</Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                      ${selectedOrder.total.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}
