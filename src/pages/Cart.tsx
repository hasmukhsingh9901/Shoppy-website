
import Header from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Minus, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase!",
      });
      clearCart();
      setIsCheckingOut(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-store-secondary">
      <Header />
      
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-store-dark mb-8">Your Cart</h1>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-medium text-store-dark mb-4">Your cart is empty</h2>
            <p className="text-store-muted mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/">
              <Button className="btn-primary">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <li key={item.id} className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-center">
                        <div className="w-20 h-20 flex-shrink-0 bg-white rounded mr-6 mb-4 sm:mb-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-store-dark truncate">
                            {item.title}
                          </h3>
                          <p className="text-sm text-store-muted mt-1">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                        
                        <div className="flex items-center mt-4 sm:mt-0">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="ml-4 text-right">
                          <p className="text-sm font-medium text-store-dark">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="mt-1 text-xs text-store-error hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-lg font-medium text-store-dark mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-store-muted">Subtotal</span>
                    <span className="text-store-dark">${getCartTotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-store-muted">Shipping</span>
                    <span className="text-store-dark">Free</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-medium text-store-dark">Total</span>
                      <span className="text-lg font-bold text-store-primary">
                        ${getCartTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full btn-primary flex items-center justify-center mt-6"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      "Processing..."
                    ) : (
                      <>
                        Checkout <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
