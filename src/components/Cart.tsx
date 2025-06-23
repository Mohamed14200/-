import React from 'react';
import { useCart } from '../context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  if (!isOpen) return null;

  const shippingCost = cart.total >= 50000 ? 0 : 1500;
  const totalWithShipping = cart.total + shippingCost;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 modal-overlay"
        onClick={onClose}
      />
      
      {/* Cart panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 slide-in-right">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-primary text-white">
          <h2 className="text-xl font-bold font-display">
            <i className="fas fa-shopping-cart ml-2"></i>
            سلة التسوق
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Cart content */}
        <div className="flex flex-col h-full">
          
          {/* Items list */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.items.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl text-gray-300 mb-4">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  سلة التسوق فارغة
                </h3>
                <p className="text-gray-500 mb-6">
                  ابدأ التسوق واكتشف منتجاتنا الرائعة
                </p>
                <button
                  onClick={onClose}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  ابدأ التسوق
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item, index) => (
                  <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="bg-gray-50 rounded-xl p-4 fade-in">
                    <div className="flex items-start space-x-4 space-x-reverse">
                      
                      {/* Product image */}
                      <div className="w-20 h-20 bg-white rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product details */}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm line-clamp-2">
                          {item.product.name}
                        </h4>
                        
                        {/* Variants */}
                        <div className="text-xs text-gray-500 mt-1 space-y-1">
                          {item.selectedColor && (
                            <div>اللون: {item.selectedColor}</div>
                          )}
                          {item.selectedSize && (
                            <div>المقاس: {item.selectedSize}</div>
                          )}
                        </div>

                        {/* Price and quantity */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="text-sm font-bold text-green-600">
                            {(item.product.price * item.quantity).toLocaleString()} دج
                          </div>
                          
                          {/* Quantity controls */}
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                            >
                              <i className="fas fa-minus text-xs"></i>
                            </button>
                            <span className="w-8 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                            >
                              <i className="fas fa-plus text-xs"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="حذف من السلة"
                      >
                        <i className="fas fa-trash text-sm"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart summary and actions */}
          {cart.items.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              
              {/* Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span>المجموع الفرعي:</span>
                  <span className="font-semibold">{cart.total.toLocaleString()} دج</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>رسوم التوصيل:</span>
                  <span className={`font-semibold ${shippingCost === 0 ? 'text-green-600' : ''}`}>
                    {shippingCost === 0 ? 'مجاني' : `${shippingCost.toLocaleString()} دج`}
                  </span>
                </div>

                {shippingCost > 0 && (
                  <div className="text-xs text-gray-500 bg-yellow-50 p-2 rounded">
                    <i className="fas fa-info-circle ml-1 text-yellow-600"></i>
                    أضف {(50000 - cart.total).toLocaleString()} دج أخرى للحصول على الشحن المجاني
                  </div>
                )}

                <hr />

                <div className="flex justify-between text-lg font-bold">
                  <span>المجموع الكلي:</span>
                  <span className="text-green-600">{totalWithShipping.toLocaleString()} دج</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <button
                  onClick={onCheckout}
                  className="w-full bg-gradient-primary text-white py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 btn-hover-glow"
                >
                  <i className="fas fa-credit-card ml-2"></i>
                  إتمام الطلب
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={onClose}
                    className="py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  >
                    متابعة التسوق
                  </button>
                  <button
                    onClick={clearCart}
                    className="py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                  >
                    <i className="fas fa-trash ml-1"></i>
                    إفراغ السلة
                  </button>
                </div>
              </div>

              {/* Security badges */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4 space-x-reverse text-xs text-gray-500">
                  <div className="flex items-center">
                    <i className="fas fa-shield-alt text-green-600 ml-1"></i>
                    دفع آمن
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-truck text-blue-600 ml-1"></i>
                    توصيل سريع
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-undo text-purple-600 ml-1"></i>
                    إرجاع مجاني
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
