
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const fetchProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

const fetchCategories = async () => {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};

const fetchProductsByCategory = async (category: string) => {
  const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products for category");
  }
  return response.json();
};

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  
  const {
    data: products = [],
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = useQuery<Product[]>({
    queryKey: ["products", selectedCategory],
    queryFn: () => 
      selectedCategory 
        ? fetchProductsByCategory(selectedCategory) 
        : fetchProducts(),
  });
  
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };
  
  const isLoading = categoriesLoading || productsLoading;
  
  return (
    <div className="min-h-screen bg-store-secondary pb-10">
      <Header />
      
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-store-dark mb-8">Our Products</h1>
        
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => handleCategoryChange(null)}
              variant={selectedCategory === null ? "default" : "outline"}
              className={
                selectedCategory === null 
                  ? "bg-store-primary hover:bg-store-primary-hover" 
                  : ""
              }
            >
              All
            </Button>
            
            {!categoriesLoading &&
              categories.map((category: string) => (
                <Button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={
                    selectedCategory === category 
                      ? "bg-store-primary hover:bg-store-primary-hover" 
                      : ""
                  }
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
          </div>
        </div>
        
        {isLoading ? (
          <div className="product-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="card">
                <Skeleton className="w-full pt-[100%]" />
                <div className="p-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-6 w-20 mt-2" />
                </div>
                <div className="p-4 pt-0">
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium text-store-dark">No products found</h2>
                <p className="text-store-muted mt-2">Try a different search term or category</p>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
