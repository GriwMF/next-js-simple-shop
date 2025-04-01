import { Geist, Geist_Mono } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { CartProvider } from '../context/CartContext';
import Navigation from '../components/Navigation';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NextShop - Simple E-commerce",
  description: "A simple e-commerce shop built with Next.js, MUI, and Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                <Navigation />
                <main className="flex-grow container mx-auto px-4 py-6">
                  {children}
                </main>
                <footer className="bg-gray-100 py-4">
                  <div className="container mx-auto px-4 text-center text-gray-600">
                    © {new Date().getFullYear()} NextShop - Simple E-commerce
                  </div>
                </footer>
              </div>
            </CartProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
