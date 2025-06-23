import React, { useState } from 'react';
import { useCart, useFavorites } from '../context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, onSearch, searchQuery }) => {
  const { getCartItemCount } = useCart();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const cartCount = getCartItemCount();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top bar with promotional message */}
      <div className="bg-gradient-primary text-white text-center py-2 text-sm">
        <div className="container mx-auto px-4">
          <span className="inline-flex items-center">
            <i className="fas fa-truck mr-2"></i>
            شحن مجاني للطلبات فوق 50,000 دج
            <i className="fas fa-gift mr-2 ml-4"></i>
            عروض حصرية يومياً
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-gradient-primary text-white p-3 rounded-xl shadow-lg">
              <i className="fas fa-store text-2xl"></i>
            </div>
            <div className="mr-3">
              <h1 className="text-2xl font-bold text-gradient-primary font-display">
                متجر المدينة الرقمية
              </h1>
              <p className="text-sm text-gray-600">تسوق آمن وموثوق</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'transform scale-105' : ''}`}>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="ابحث عن منتجاتك المفضلة..."
                className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 search-input font-arabic"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearch('')}
                  className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4 space-x-reverse">
            
            {/* Favorites */}
            <button className="relative p-3 text-gray-600 hover:text-primary transition-colors duration-300 hover:bg-gray-100 rounded-xl group">
              <i className="fas fa-heart text-xl group-hover:scale-110 transition-transform"></i>
              <span className="absolute -top-1 -right-1 bg-danger text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                0
              </span>
            </button>

            {/* Notifications */}
            <button className="relative p-3 text-gray-600 hover:text-primary transition-colors duration-300 hover:bg-gray-100 rounded-xl group">
              <i className="fas fa-bell text-xl group-hover:scale-110 transition-transform"></i>
              <span className="absolute -top-1 -right-1 bg-warning text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                3
              </span>
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className={`relative p-3 text-gray-600 hover:text-primary transition-all duration-300 hover:bg-gray-100 rounded-xl group ${cartCount > 0 ? 'cart-bounce' : ''}`}
            >
              <i className="fas fa-shopping-cart text-xl group-hover:scale-110 transition-transform"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold pulse-shadow">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* User menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 space-x-reverse p-3 text-gray-600 hover:text-primary transition-colors duration-300 hover:bg-gray-100 rounded-xl">
                <i className="fas fa-user-circle text-xl"></i>
                <span className="hidden md:block font-medium">حسابي</span>
                <i className="fas fa-chevron-down text-sm group-hover:rotate-180 transition-transform duration-300"></i>
              </button>
              
              {/* Dropdown menu */}
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <div className="py-2">
                  <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                    <i className="fas fa-user-edit ml-3 text-primary"></i>
                    تحرير الملف الشخصي
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                    <i className="fas fa-shopping-bag ml-3 text-primary"></i>
                    طلباتي
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                    <i className="fas fa-heart ml-3 text-primary"></i>
                    المفضلة
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                    <i className="fas fa-cog ml-3 text-primary"></i>
                    الإعدادات
                  </a>
                  <hr className="my-2" />
                  <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                    <i className="fas fa-sign-out-alt ml-3 text-danger"></i>
                    تسجيل الخروج
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 space-x-reverse py-3">
            <a href="#" className="flex items-center text-gray-700 hover:text-primary transition-colors duration-300 group">
              <i className="fas fa-home ml-2 group-hover:scale-110 transition-transform"></i>
              الرئيسية
            </a>
            <a href="#" className="flex items-center text-gray-700 hover:text-primary transition-colors duration-300 group">
              <i className="fas fa-mobile-alt ml-2 group-hover:scale-110 transition-transform"></i>
              الإلكترونيات
            </a>
            <a href="#" className="flex items-center text-gray-700 hover:text-primary transition-colors duration-300 group">
              <i className="fas fa-tshirt ml-2 group-hover:scale-110 transition-transform"></i>
              الملابس
            </a>
            <a href="#" className="flex items-center text-gray-700 hover:text-primary transition-colors duration-300 group">
              <i className="fas fa-palette ml-2 group-hover:scale-110 transition-transform"></i>
              التجميل
            </a>
            <a href="#" className="flex items-center text-gray-700 hover:text-primary transition-colors duration-300 group">
              <i className="fas fa-book ml-2 group-hover:scale-110 transition-transform"></i>
              الكتب
            </a>
            <a href="#" className="flex items-center text-gray-700 hover:text-primary transition-colors duration-300 group">
              <i className="fas fa-home ml-2 group-hover:scale-110 transition-transform"></i>
              المنزل
            </a>
            <a href="#" className="flex items-center text-gray-700 hover:text-primary transition-colors duration-300 group">
              <i className="fas fa-tags ml-2 group-hover:scale-110 transition-transform"></i>
              العروض
            </a>
            <a href="#" className="flex items-center text-gray-700 hover:text-primary transition-colors duration-300 group">
              <i className="fas fa-phone ml-2 group-hover:scale-110 transition-transform"></i>
              اتصل بنا
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
