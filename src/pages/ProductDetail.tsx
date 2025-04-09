
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react";
import { useState } from "react";

const fetchProduct = async (id: string) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }
  return response.json();
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  
  if (error) {
    return (
      <div className="min-h-screen bg-store-secondary">
        <Header />
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold text-store-dark mb-4">Product not found</h1>
          <Button onClick={() => navigate("/")} className="btn-primary">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-store-secondary">
      <Header />
      
      <div className="container-custom py-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center text-store-dark"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        {isLoading ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="w-full pt-[100%]" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="pt-4">
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </div>
          </div>
        ) : product ? (
          <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center bg-white p-4 rounded-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-80 object-contain"
                />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-store-dark">{product.title}</h1>
                <p className="text-2xl font-bold text-store-primary">${product.price.toFixed(2)}</p>
                
                <div className="pt-2 pb-4">
                  <p className="text-store-dark/80">{product.description}</p>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-store-dark">Quantity:</span>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className="h-8 w-8"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={incrementQuantity}
                        className="h-8 w-8"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <Button onClick={handleAddToCart} className="btn-primary flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductDetail;
