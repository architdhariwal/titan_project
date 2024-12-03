import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Truck, Package, CreditCard, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-hot-toast';
import { getProductById } from '../services/productService';
import { Product } from '../models/Product_types';
import { format } from 'date-fns';
import { CartItem } from '../models/Cart_types';
import { addToCart } from '../services/cartService';
import { useAuth } from '../contexts/AuthContext';


const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);
    const { user } = useAuth();
    
    const currentDate: Date = new Date(Date.now());
    const dispatchDate: Date = new Date(currentDate);
    dispatchDate.setDate(dispatchDate.getDate() + 2); 
  
    const formattedDate: string = format(dispatchDate, "do MMM yyyy");
  
    useEffect(() => {
      if (id) {
        fetchProduct(parseInt(id));
      }
    }, [id]);
  
    const fetchProduct = async (productId: number) => {
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleAddToCart = async () => {
        if (!product || !user) return;
    
        setAddingToCart(true);
        try {
          const cartItem: CartItem = {
            productId: product.id,
            quantity: 1,
          };
          await addToCart(user.id, cartItem);
          setAddedToCart(true);
          
          toast.success('Item added to cart', {
            duration: 3000,
            position: 'bottom-center'
          });
        } catch (error) {
          console.error('Error adding to cart:', error);
          toast.error('Failed to add item to cart', {
            duration: 3000,
            position: 'bottom-center'
          });
        } finally {
          setAddingToCart(false);
        }
      };
  
    if (loading) {
      return (
        <div className="min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      );
    }
  
    if (!product) {
      return (
        <div className="min-h-screen flex justify-center items-center">
          <p>Product not found</p>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        
        <main className="flex-grow">
        
          <div className="bg-gray-50 py-3">
            <div className="container mx-auto px-4">
              <div className="flex items-center text-sm text-gray-600">
                <Link to="/" className="hover:text-gray-900">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/products" className="hover:text-gray-900">Products</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900">{product.title}</span>
              </div>
            </div>
          </div>
  
          <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Left Column - Images */}
              <div className="flex flex-col md:flex-row gap-4">
                
                <div className="flex md:flex-col order-2 md:order-1 gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[500px]">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border hover:border-gray-400 transition-colors ${
                        selectedImage === index ? 'border-black' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} view ${index + 1}`}
                        className="w-full h-full object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
  
                
                <div className="order-1 md:order-2 flex-1">
                  <div className="aspect-square max-w-[500px] overflow-hidden rounded-lg border bg-white">
                    <img
                      src={product.images[selectedImage]}
                      alt={product.title}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                </div>
              </div>
  
              {/* Right Column - Details */}
              <div className="space-y-6">
                <div>
                  <div className="mb-4">
                    <h2 className="text-sm text-gray-600 mb-2">Titan</h2>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`w-5 h-5 ${
                                index < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-gray-600">
                          {product.rating} | {product.reviewsCount} Reviews
                        </span>
                      </div>
                    </div>
                  </div>
  
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-3xl font-bold">₹{product.price}</span>
                    <span className="text-xl text-gray-500 line-through">MRP ₹{product.originalPrice}</span>
                    <span className="text-green-600 font-medium">{product.discount}% off</span>
                  </div>
  
                  <p className="text-sm text-gray-500 mb-4">Inclusive of all taxes*</p>
  
                  <div className="flex gap-4 mb-8">
                    {addedToCart ? (
                      <button
                        onClick={() => navigate('/cart')}
                        className="w-1/2 bg-green-600 text-white py-3 px-6 rounded hover:bg-green-700 transition-colors"
                      >
                        GO TO CART
                      </button>
                    ) : (
                      <button
                        onClick={handleAddToCart}
                        disabled={addingToCart || !user}
                        className="w-1/2 border border-green-600 text-green-600 py-3 px-6 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        {!user ? 'LOGIN TO ADD' : (addingToCart ? 'ADDING...' : 'ADD TO CART')}
                      </button>
                    )}
                  </div>
  
                 
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900 font-medium">Delivery Availability</span>
                      </div>
                      <button className="text-gray-600 hover:text-gray-900">→</button>
                    </div>
                    <p className="text-green-600 text-sm">Dispatch By {formattedDate}</p>
                  </div>
  
                 
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                    <div className="flex flex-col items-center text-center gap-2">
                      <Clock className="w-8 h-8 text-gray-600" />
                      <span className="text-sm">6 Months</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                      <Truck className="w-8 h-8 text-gray-600" />
                      <span className="text-sm">Free Shipping</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                      <Package className="w-8 h-8 text-gray-600" />
                      <span className="text-sm">Easy Returns</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                      <CreditCard className="w-8 h-8 text-gray-600" />
                      <span className="text-sm">Pay on Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
  
        <Footer />
      </div>
    );
  };
  


export default ProductDetails;