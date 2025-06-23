import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Slider from './components/Slider';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import Loading from './components/Loading';
import { CartProvider, FavoritesProvider } from './context/CartContext';
import { Product, Category, SliderData } from './types';
import './App.css';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sliders, setSliders] = useState<SliderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/data/products.json');
      const data = await response.json();
      
      setProducts(data.products);
      setCategories([{ id: 'الكل', name: 'جميع المنتجات', icon: 'grid' }, ...data.categories]);
      setSliders(data.sliders);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'الكل' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <CartProvider>
      <FavoritesProvider>
        <div className="min-h-screen bg-gray-50 font-arabic">
        <Header 
          onCartClick={() => setIsCartOpen(true)}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />
        
        <main>
          <Slider slides={sliders} />
          
          <div className="container mx-auto px-4 py-8">
            <ProductGrid
              products={filteredProducts}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </main>

        <Footer />

        <Cart 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />

        <Checkout
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />
        </div>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
