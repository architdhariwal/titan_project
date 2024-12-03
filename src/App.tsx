import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import AdminDashboard from "./pages/AdminDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ProductPage from "./pages/ProductPage";
import ProductDetails from "./pages/ProductDetails";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
         
          <Toaster 
            position="bottom-center"
            toastOptions={{
            
              duration: 3000,
              style: {
                background: '#4CAF50',
                color: '#fff',
              },
            }}
          />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />

            <Route 
              element={<ProtectedRoute allowedRoles={['admin']} />}
            >
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Route>

            <Route 
              element={<ProtectedRoute allowedRoles={['customer']} />}
            >
              <Route path="/products" element={<ProductPage />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/thank-you" element={<ThankYou />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;