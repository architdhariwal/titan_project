import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import Header from '../components/Header';
import { addAddress, getUserById, updateUser } from '../services/userService';
import { clearCart, getCart } from '../services/cartService';
import { getProductById } from '../services/productService';
import { useAuth } from '../contexts/AuthContext';
import { CartItem } from '../models/Cart_types';
import { Product } from '../models/Product_types';
import { Address, User } from '../models/User_types';

interface CartItemWithDetails extends CartItem {
  product: Product;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [address, setAddress] = useState<Omit<Address, 'id'>>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isDefault: false
  });
  const [addressErrors, setAddressErrors] = useState<{[key: string]: string}>({});
  const [cartItems, setCartItems] = useState<CartItemWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (user) {
      const fetchUserAndCart = async () => {
        try {
          setLoading(true);
          const [updatedUserData, cart] = await Promise.all([
            getUserById(user.id),
            getCart(user.id)
          ]);
          setUpdatedUser(updatedUserData);
          if (updatedUserData?.addresses && updatedUserData.addresses.length > 0) {
            const defaultAddress = updatedUserData.addresses.find(addr => addr.isDefault) || updatedUserData.addresses[0];
            setSelectedAddress(defaultAddress);
          } else {
            setShowAddressForm(true);
          }
          const itemsWithDetails = await Promise.all(
            cart.items.map(async (item) => {
              const product = await getProductById(item.productId);
              return {
                ...item,
                product,
              };
            })
          );
          setCartItems(itemsWithDetails);
        } catch (error) {
          console.error('Error fetching user data or cart:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserAndCart();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const validateAddress = () => {
    const errors: {[key: string]: string} = {};
    
    if (!address.street.trim()) {
      errors.street = 'Street address is required';
    }
    
    if (!address.city.trim()) {
      errors.city = 'City is required';
    }
    
    if (!address.state.trim()) {
      errors.state = 'State is required';
    }
    
    if (!address.zipCode.trim()) {
      errors.zipCode = 'PIN Code is required';
    } else if (!/^\d{5,6}$/.test(address.zipCode.trim())) {
      errors.zipCode = 'PIN Code must be 5-6 digits';
    }
    
    if (!address.country.trim()) {
      errors.country = 'Country is required';
    }
    
    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  
    if (addressErrors[name]) {
      setAddressErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAddressSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value);
    const selected = updatedUser?.addresses?.find(addr => addr.id === selectedId) || null;
    setSelectedAddress(selected);
  };

  const calculateTotals = () => {
    const orderValue = cartItems.reduce(
      (sum, item) => sum + item.product.originalPrice * item.quantity,
      0
    );
    const discount = cartItems.reduce(
      (sum, item) => 
        sum + 
        (item.product.originalPrice - item.product.price) * item.quantity,
      0
    );
    const shipping = 0; 
    const grandTotal = orderValue - discount + shipping;

    return { orderValue, discount, shipping, grandTotal };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentUser = updatedUser || user;
    if (!currentUser) {
      console.error('No user data available');
      return;
    }

    if (!showAddressForm && !selectedAddress) {
      alert('Please select an address');
      return;
    }

    if (showAddressForm && !validateAddress()) {
      return;
    }

    try {
      const { grandTotal } = calculateTotals();
      if ((currentUser.balance ?? 0) < grandTotal) {
        alert('Insufficient balance');
        return;
      }

      if (showAddressForm) {
        await addAddress(currentUser.id, address);
      }

      const updatedBalance = (currentUser.balance ?? 0) - grandTotal;
      await updateUser(currentUser.id, { balance: updatedBalance });
      
      await clearCart(currentUser.id);
      
      setUser({ ...currentUser, balance: updatedBalance });
      
      navigate('/thank-you');
    } catch (error) {
      console.error('Error processing order:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const { orderValue, shipping, grandTotal } = calculateTotals();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Progress Steps */}
        <div className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="text-gray-400">01 Cart</div>
              <div className="h-px bg-gray-300 flex-1 mx-4"></div>
              <div className="flex items-center gap-2 text-amber-500">
                <span className="font-medium">02 Delivery Information</span>
              </div>
              <div className="h-px bg-gray-300 flex-1 mx-4"></div>
              <div className="text-gray-400">03 Confirmation</div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-medium">Checkout</h1>
              <div className="flex items-center gap-2 text-green-600">
                <Shield size={20} />
                <span>100% SECURE</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-medium mb-4">Delivery Address</h2>
                {updatedUser?.addresses && updatedUser.addresses.length > 0 && !showAddressForm && (
                  <div className="mb-4">
                    <select
                      onChange={handleAddressSelect}
                      value={selectedAddress?.id || ''}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    >
                      <option value="" disabled>Select an address</option>
                      {updatedUser.addresses.map((addr) => (
                        <option
                          key={addr.id}
                          value={addr.id}
                          className={addr.isDefault ? 'bg-amber-100' : ''}
                        >
                          {addr.street}, {addr.city}, {addr.state}, {addr.zipCode}, {addr.country}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        setShowAddressForm(true);
                        setSelectedAddress(null);
                      }}
                      className="mt-2 text-amber-500 hover:underline"
                    >
                      Add New Address
                    </button>
                  </div>
                )}
                {(showAddressForm || (!updatedUser?.addresses || updatedUser.addresses.length === 0)) && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        value={address.street}
                        onChange={handleAddressChange}
                        required
                        className={`w-full px-3 py-2 border rounded-md ${addressErrors.street ? 'border-red-500' : ''}`}
                      />
                      {addressErrors.street && (
                        <p className="text-red-500 text-sm mt-1">{addressErrors.street}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={address.city}
                        onChange={handleAddressChange}
                        required
                        className={`w-full px-3 py-2 border rounded-md ${addressErrors.city ? 'border-red-500' : ''}`}
                      />
                      {addressErrors.city && (
                        <p className="text-red-500 text-sm mt-1">{addressErrors.city}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={address.state}
                        onChange={handleAddressChange}
                        required
                        className={`w-full px-3 py-2 border rounded-md ${addressErrors.state ? 'border-red-500' : ''}`}
                      />
                      {addressErrors.state && (
                        <p className="text-red-500 text-sm mt-1">{addressErrors.state}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={address.zipCode}
                        onChange={handleAddressChange}
                        required
                        className={`w-full px-3 py-2 border rounded-md ${addressErrors.zipCode ? 'border-red-500' : ''}`}
                      />
                      {addressErrors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">{addressErrors.zipCode}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={address.country}
                        onChange={handleAddressChange}
                        required
                        className={`w-full px-3 py-2 border rounded-md ${addressErrors.country ? 'border-red-500' : ''}`}
                      />
                      {addressErrors.country && (
                        <p className="text-red-500 text-sm mt-1">{addressErrors.country}</p>
                      )}
                    </div>
                  </form>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={
                    (showAddressForm && Object.keys(addressErrors).length > 0) || 
                    (!showAddressForm && !selectedAddress)
                  }
                  className={`w-full py-3 mt-4 text-white rounded-md 
                    ${(showAddressForm && Object.keys(addressErrors).length > 0) || 
                      (!showAddressForm && !selectedAddress) 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-amber-500 hover:bg-amber-600'}`}
                >
                  PLACE ORDER
                </button>
              </div>
              <div>
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                <div className="border rounded-lg p-4">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.productId} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{item.product.title}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span>₹{orderValue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2 text-green-600">
                      <span>Discount</span>
                      </div>
                    <div className="flex justify-between mb-2">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between font-medium text-lg mt-2 pt-2 border-t">
                      <span>Total</span>
                      <span>₹{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;