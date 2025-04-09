
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { ShoppingCart, Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const cartCount = getCartCount();
  
  if (!user) return null;
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-store-dark">ShopStore</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center text-store-dark hover:text-store-primary transition-colors">
              <Home className="w-5 h-5 mr-1" />
              <span>Home</span>
            </Link>
            <Link to="/cart" className="flex items-center text-store-dark hover:text-store-primary transition-colors relative">
              <ShoppingCart className="w-5 h-5 mr-1" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-store-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Button 
              variant="ghost" 
              onClick={logout} 
              className="flex items-center text-store-dark hover:text-store-primary transition-colors"
            >
              <LogOut className="w-5 h-5 mr-1" />
              <span>Logout</span>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-store-dark"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link 
              to="/" 
              className="flex items-center text-store-dark hover:text-store-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="w-5 h-5 mr-2" />
              <span>Home</span>
            </Link>
            <Link 
              to="/cart" 
              className="flex items-center text-store-dark hover:text-store-primary transition-colors py-2 relative"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="ml-2 bg-store-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                logout();
              }} 
              className="flex items-center text-store-dark hover:text-store-primary transition-colors py-2 w-full text-left"
            >
              <LogOut className="w-5 h-5 mr-2" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
