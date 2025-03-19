// app/page.js
'use client';

import { Button, Typography, Container, Box, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          bgcolor: 'primary.light', 
          color: 'primary.contrastText',
          p: { xs: 4, md: 6 },
          mt: 4,
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome to NextShop
            </Typography>
            <Typography variant="h5" paragraph>
              Your one-stop destination for quality products
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4 }}>
              Browse our collection of premium items at competitive prices.
            </Typography>
            <Button 
              variant="contained" 
              component={Link} 
              href="/products"
              size="large"
            >
              Shop Now
            </Button>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
            <Box 
              sx={{ 
                position: 'relative', 
                height: '300px',
                width: '100%',
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Featured products" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Featured Categories */}
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Shop by Category
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {['electronics', 'clothing', 'home', 'accessories'].map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 4
                  },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Box 
                  sx={{ 
                    position: 'relative', 
                    height: '150px',
                    width: '100%',
                    mb: 2
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img 
                      src={`/api/placeholder/300/200`} 
                      alt={category}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                    />
                  </div>
                </Box>
                <Typography variant="h6" component="h3" gutterBottom sx={{ textTransform: 'capitalize' }}>
                  {category}
                </Typography>
                <Button 
                  variant="outlined" 
                  component={Link} 
                  href={`/products?category=${category}`}
                  sx={{ mt: 'auto' }}
                >
                  View Products
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
