import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated logo */}
        <div className="mb-8">
          <div className="relative">
            <div className="bg-gradient-primary text-white p-6 rounded-2xl shadow-2xl float">
              <i className="fas fa-store text-4xl"></i>
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-warning rounded-full animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-success rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading spinner */}
        <div className="relative mb-6">
          <div className="spinner mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fas fa-shopping-bag text-primary text-lg"></i>
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gradient-primary font-display">
            متجر المدينة الرقمية
          </h2>
          <p className="text-gray-600 font-arabic">
            جاري تحميل المتجر...
          </p>
          
          {/* Loading steps */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse mr-2"></div>
              تحميل المنتجات
            </div>
            <div className="flex items-center justify-center text-sm text-gray-500">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-2" style={{animationDelay: '0.2s'}}></div>
              إعداد السلة
            </div>
            <div className="flex items-center justify-center text-sm text-gray-500">
              <div className="w-2 h-2 bg-warning rounded-full animate-pulse mr-2" style={{animationDelay: '0.4s'}}></div>
              تحضير الواجهة
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-primary h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
          </div>
        </div>

        {/* Fun facts while loading */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
          <p className="text-sm text-gray-600 font-arabic">
            <i className="fas fa-lightbulb text-warning mr-2"></i>
            هل تعلم؟ نوفر أكثر من 1000 منتج عالي الجودة
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
