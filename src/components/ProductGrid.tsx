import React, { useState } from 'react';
import { Product, Category } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

type SortOption = 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular' | 'name';
type ViewMode = 'grid' | 'list';

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState(0);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
        return b.views - a.views;
      case 'name':
        return a.name.localeCompare(b.name, 'ar');
      case 'newest':
      default:
        return b.id - a.id; // Assuming higher ID means newer
    }
  });

  // Filter products by price range and rating
  const filteredProducts = sortedProducts.filter(product => {
    const withinPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    const aboveMinRating = product.rating >= minRating;
    return withinPriceRange && aboveMinRating;
  });

  const getIconForCategory = (categoryId: string) => {
    switch (categoryId) {
      case 'الكل': return 'fa-th-large';
      case 'الكترونيات': return 'fa-mobile-alt';
      case 'ملابس': return 'fa-tshirt';
      case 'مستحضرات تجميل': return 'fa-heart';
      case 'كتب ومجلات': return 'fa-book';
      case 'إكسسوارات وساعات': return 'fa-watch';
      case 'منتجات منزلية': return 'fa-home';
      default: return 'fa-tag';
    }
  };

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gradient-primary font-display mb-2">
          منتجاتنا المميزة
        </h2>
        <p className="text-gray-600 font-arabic">
          اكتشف تشكيلة واسعة من أفضل المنتجات بأسعار منافسة
        </p>
        <div className="mt-4 w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
      </div>

      {/* Category filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-gradient-primary text-white shadow-lg btn-hover-glow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <i className={`fas ${getIconForCategory(category.id)} ml-2`}></i>
              {category.name}
              <span className={`mr-2 text-xs px-2 py-1 rounded-full ${
                selectedCategory === category.id 
                  ? 'bg-white bg-opacity-20' 
                  : 'bg-gray-200'
              }`}>
                {products.filter(p => category.id === 'الكل' || p.category === category.id).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Results info */}
          <div className="flex items-center text-gray-600">
            <i className="fas fa-box ml-2 text-primary"></i>
            <span className="font-semibold">
              {filteredProducts.length} منتج
            </span>
            {selectedCategory !== 'الكل' && (
              <span className="mr-2">
                في فئة "{categories.find(c => c.id === selectedCategory)?.name}"
              </span>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            
            {/* View mode toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="عرض شبكي"
              >
                <i className="fas fa-th-large"></i>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="عرض قائمة"
              >
                <i className="fas fa-list"></i>
              </button>
            </div>

            {/* Sort dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="newest">الأحدث</option>
              <option value="popular">الأكثر شعبية</option>
              <option value="price-low">السعر: من الأقل للأعلى</option>
              <option value="price-high">السعر: من الأعلى للأقل</option>
              <option value="rating">التقييم الأعلى</option>
              <option value="name">الاسم: أ-ي</option>
            </select>

            {/* Filters toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                showFilters
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <i className="fas fa-filter ml-2"></i>
              فلترة
            </button>
          </div>
        </div>

        {/* Advanced filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200 fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Price range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  نطاق السعر (دج)
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="الحد الأدنى"
                    />
                    <span className="text-gray-500">إلى</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="الحد الأقصى"
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} دج
                  </div>
                </div>
              </div>

              {/* Rating filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  التقييم الأدنى
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`flex items-center px-3 py-2 rounded-lg text-sm transition-all ${
                        minRating === rating
                          ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <i className="fas fa-star text-yellow-400 ml-1"></i>
                      {rating}+
                    </button>
                  ))}
                  <button
                    onClick={() => setMinRating(0)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      minRating === 0
                        ? 'bg-gray-200 text-gray-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    الكل
                  </button>
                </div>
              </div>

              {/* Reset filters */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setPriceRange([0, 500000]);
                    setMinRating(0);
                    setSortBy('newest');
                  }}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <i className="fas fa-undo ml-2"></i>
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products grid/list */}
      <div className={`${
        viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-4'
      }`}>
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <div className="text-6xl text-gray-300 mb-4">
              <i className="fas fa-search"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              لم نجد منتجات مطابقة
            </h3>
            <p className="text-gray-500 mb-6">
              جرب تغيير معايير البحث أو الفلترة
            </p>
            <button
              onClick={() => {
                onCategoryChange('الكل');
                setPriceRange([0, 500000]);
                setMinRating(0);
              }}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
            >
              عرض جميع المنتجات
            </button>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="fade-in">
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>

      {/* Load more button */}
      {filteredProducts.length > 0 && filteredProducts.length >= 20 && (
        <div className="text-center pt-8">
          <button className="bg-gradient-primary text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 btn-hover-glow">
            <i className="fas fa-plus ml-2"></i>
            عرض المزيد من المنتجات
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
