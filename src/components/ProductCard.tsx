
import { Product } from "@/types";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  return (
    <Card className="card h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="flex-grow">
        <div className="relative pt-[100%] bg-white">
          <img 
            src={product.image} 
            alt={product.title} 
            className="absolute inset-0 w-full h-full object-contain p-4"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-store-dark line-clamp-1">{product.title}</h3>
          <p className="text-lg font-bold text-store-dark mt-1">${product.price.toFixed(2)}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product, 1);
          }}
          className="w-full btn-primary flex items-center justify-center"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
