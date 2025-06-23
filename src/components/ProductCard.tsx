import React, { useState } from 'react';
import { Product } from '../types';
import { useCart, useFavorites } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const isProductFavorite = isFavorite(product.id);
  const isProductInCart = isInCart(product.id);
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, 1, selectedColor, selectedSize);
  };

  const handleToggleFavorite = () => {
    if (isProductFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
        ))}
        {hasHalfStar && <i className="fas fa-star-half-alt text-yellow-400 text-sm"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={i} className="far fa-star text-gray-300 text-sm"></i>
        ))}
        <span className="text-xs text-gray-500 mr-1">({product.reviews})</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden product-card group hover:shadow-2xl transition-all duration-300 border border-gray-100">
      {/* Image container */}
      <div className="relative overflow-hidden">
        {/* Product image */}
        <div className="relative h-64 bg-gray-100">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } group-hover:scale-110`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/placeholder-product.jpg';
              setImageLoaded(true);
            }}
          />
          
          {/* Overlay with quick actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300 space-x-2 space-x-reverse">
              <button
                onClick={() => setShowQuickView(true)}
                className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                title="عرض سريع"
              >
                <i className="fas fa-eye"></i>
              </button>
              <button
                onClick={handleToggleFavorite}
                className={`p-2 rounded-full shadow-lg transition-colors ${
                  isProductFavorite 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
                title={isProductFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
              >
                <i className={`fas fa-heart ${isProductFavorite ? 'text-white' : 'text-gray-400'}`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 space-y-1">
          {product.tags.includes('جديد') && (
            <span className="badge-new text-white text-xs px-2 py-1 rounded-full font-bold">
              جديد
            </span>
          )}
          {product.tags.includes('الأكثر مبيعاً') && (
            <span className="badge-bestseller text-white text-xs px-2 py-1 rounded-full font-bold">
              الأكثر مبيعاً
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="badge-sale text-white text-xs px-2 py-1 rounded-full font-bold">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Stock status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold">
              نفد المخزون
            </span>
          </div>
        )}

        {/* Views counter */}
        <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
          <i className="fas fa-eye mr-1"></i>
          {product.views.toLocaleString()}
        </div>
      </div>

      {/* Product info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-primary font-semibold mb-1">
          {product.category}
        </div>

        {/* Product name */}
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mb-3">
          {renderStars(product.rating)}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-3">
            <span className="text-xs text-gray-500 block mb-1">الألوان المتاحة:</span>
            <div className="flex space-x-1 space-x-reverse">
              {product.colors.slice(0, 4).map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    selectedColor === color 
                      ? 'border-primary scale-110' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ 
                    backgroundColor: color === 'أبيض' ? '#ffffff' : 
                                   color === 'أسود' ? '#000000' :
                                   color === 'أحمر' ? '#dc3545' :
                                   color === 'أزرق' ? '#007bff' :
                                   color === 'أخضر' ? '#28a745' :
                                   color === 'أصفر' ? '#ffc107' :
                                   color === 'وردي' ? '#e83e8c' :
                                   color === 'بني' ? '#6f4e37' :
                                   color === 'رمادي' ? '#6c757d' :
                                   '#8b5a3c'
                  }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500 flex items-center">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-600">
              {product.price.toLocaleString()} دج
            </div>
            {product.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                {product.originalPrice.toLocaleString()} دج
              </div>
            )}
          </div>
          
          {/* Stock indicator */}
          <div className="text-right">
            <div className={`text-xs font-semibold ${
              product.stock > 10 ? 'text-green-600' : 
              product.stock > 0 ? 'text-yellow-600' : 
              'text-red-600'
            }`}>
              {product.stock > 10 ? 'متوفر' : 
               product.stock > 0 ? `${product.stock} قطعة متبقية` : 
               'نفد المخزون'}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
              product.inStock
                ? isProductInCart
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-primary text-white hover:bg-primary-dark btn-hover-scale'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <i className={`fas ${isProductInCart ? 'fa-check' : 'fa-cart-plus'} ml-1`}></i>
            {isProductInCart ? 'في السلة' : 'أضف للسلة'}
          </button>

          <button
            onClick={() => {/* Handle buy now */}}
            disabled={!product.inStock}
            className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
              product.inStock
                ? 'bg-warning text-white hover:bg-yellow-600 btn-hover-scale'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <i className="fas fa-bolt ml-1"></i>
            اشتري الآن
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
