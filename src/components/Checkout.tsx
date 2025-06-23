import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShippingAddress, Wilaya } from '../types';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose }) => {
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [wilayas, setWilayas] = useState<Wilaya[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  const [shippingForm, setShippingForm] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    wilaya: '',
    postalCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer'>('cod');
  const [orderNotes, setOrderNotes] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Load wilayas data
  useEffect(() => {
    if (isOpen) {
      fetch('/data/dz.json')
        .then(res => res.json())
        .then(data => setWilayas(data.wilayas))
        .catch(err => console.error('Error loading wilayas:', err));
    }
  }, [isOpen]);

  const shippingCost = cart.total >= 50000 ? 0 : 1500;
  const totalWithShipping = cart.total + shippingCost;

  const validateShippingForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!shippingForm.firstName.trim()) errors.firstName = 'الاسم الأول مطلوب';
    if (!shippingForm.lastName.trim()) errors.lastName = 'اسم العائلة مطلوب';
    if (!shippingForm.email.trim()) errors.email = 'البريد الإلكتروني مطلوب';
    else if (!/\S+@\S+\.\S+/.test(shippingForm.email)) errors.email = 'البريد الإلكتروني غير صحيح';
    if (!shippingForm.phone.trim()) errors.phone = 'رقم الهاتف مطلوب';
    else if (!/^(0)(5|6|7)\d{8}$/.test(shippingForm.phone)) errors.phone = 'رقم الهاتف غير صحيح';
    if (!shippingForm.address.trim()) errors.address = 'العنوان مطلوب';
    if (!shippingForm.city.trim()) errors.city = 'المدينة مطلوبة';
    if (!shippingForm.wilaya) errors.wilaya = 'الولاية مطلوبة';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShippingForm()) {
      setStep('payment');
    }
  };

  const handleOrderSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order object
      const order = {
        id: `ORDER-${Date.now()}`,
        items: cart.items,
        total: totalWithShipping,
        shippingAddress: shippingForm,
        paymentMethod,
        orderNotes,
        orderDate: new Date(),
        status: 'pending' as const,
      };

      // Save order to localStorage (in real app, send to API)
      const existingOrders = JSON.parse(localStorage.getItem('digital-city-orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('digital-city-orders', JSON.stringify(existingOrders));

      setOrderSuccess(true);
      setStep('confirmation');
      clearCart();
      
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetCheckout = () => {
    setStep('shipping');
    setOrderSuccess(false);
    setShippingForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      wilaya: '',
      postalCode: '',
    });
    setPaymentMethod('cod');
    setOrderNotes('');
    setFormErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 modal-overlay"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl modal-content">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-primary text-white rounded-t-2xl">
            <h2 className="text-2xl font-bold font-display">
              <i className="fas fa-credit-card ml-2"></i>
              إتمام الطلب
            </h2>
            <button
              onClick={() => {
                onClose();
                resetCheckout();
              }}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          {/* Progress steps */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-center space-x-8 space-x-reverse">
              {[
                { id: 'shipping', label: 'معلومات الشحن', icon: 'fa-truck' },
                { id: 'payment', label: 'طريقة الدفع', icon: 'fa-credit-card' },
                { id: 'confirmation', label: 'تأكيد الطلب', icon: 'fa-check-circle' },
              ].map((stepInfo, index) => {
                const isActive = step === stepInfo.id;
                const isCompleted = 
                  (step === 'payment' && stepInfo.id === 'shipping') ||
                  (step === 'confirmation' && (stepInfo.id === 'shipping' || stepInfo.id === 'payment'));
                
                return (
                  <div key={stepInfo.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                      isCompleted 
                        ? 'bg-green-500 border-green-500 text-white'
                        : isActive 
                          ? 'bg-primary border-primary text-white'
                          : 'border-gray-300 text-gray-500'
                    }`}>
                      <i className={`fas ${isCompleted ? 'fa-check' : stepInfo.icon}`}></i>
                    </div>
                    <span className={`mr-3 font-semibold ${
                      isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {stepInfo.label}
                    </span>
                    {index < 2 && (
                      <div className={`w-16 h-0.5 mx-4 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main content */}
              <div className="lg:col-span-2">
                
                {/* Shipping form */}
                {step === 'shipping' && (
                  <form onSubmit={handleShippingSubmit} className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      <i className="fas fa-shipping-fast ml-2 text-primary"></i>
                      معلومات الشحن
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          الاسم الأول *
                        </label>
                        <input
                          type="text"
                          value={shippingForm.firstName}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, firstName: e.target.value }))}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                            formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="أدخل الاسم الأول"
                        />
                        {formErrors.firstName && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          اسم العائلة *
                        </label>
                        <input
                          type="text"
                          value={shippingForm.lastName}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, lastName: e.target.value }))}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                            formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="أدخل اسم العائلة"
                        />
                        {formErrors.lastName && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          البريد الإلكتروني *
                        </label>
                        <input
                          type="email"
                          value={shippingForm.email}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, email: e.target.value }))}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                            formErrors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="example@email.com"
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          رقم الهاتف *
                        </label>
                        <input
                          type="tel"
                          value={shippingForm.phone}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, phone: e.target.value }))}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                            formErrors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="0555123456"
                        />
                        {formErrors.phone && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        العنوان الكامل *
                      </label>
                      <textarea
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm(prev => ({ ...prev, address: e.target.value }))}
                        rows={3}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                          formErrors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="أدخل العنوان الكامل مع تفاصيل الشارع والحي"
                      />
                      {formErrors.address && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          الولاية *
                        </label>
                        <select
                          value={shippingForm.wilaya}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, wilaya: e.target.value }))}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                            formErrors.wilaya ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">اختر الولاية</option>
                          {wilayas.map((wilaya) => (
                            <option key={wilaya.id} value={wilaya.arabic_name}>
                              {wilaya.code} - {wilaya.arabic_name}
                            </option>
                          ))}
                        </select>
                        {formErrors.wilaya && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.wilaya}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          المدينة *
                        </label>
                        <input
                          type="text"
                          value={shippingForm.city}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, city: e.target.value }))}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                            formErrors.city ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="أدخل اسم المدينة"
                        />
                        {formErrors.city && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          الرمز البريدي
                        </label>
                        <input
                          type="text"
                          value={shippingForm.postalCode}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, postalCode: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="اختياري"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-primary text-white py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 btn-hover-glow"
                    >
                      <i className="fas fa-arrow-left ml-2"></i>
                      التالي: طريقة الدفع
                    </button>
                  </form>
                )}

                {/* Payment method */}
                {step === 'payment' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      <i className="fas fa-credit-card ml-2 text-primary"></i>
                      طريقة الدفع
                    </h3>

                    <div className="space-y-4">
                      <div className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        paymentMethod === 'cod' ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`} onClick={() => setPaymentMethod('cod')}>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            checked={paymentMethod === 'cod'}
                            onChange={() => setPaymentMethod('cod')}
                            className="ml-3"
                          />
                          <div className="flex-1">
                            <div className="flex items-center">
                              <i className="fas fa-money-bill-wave text-green-600 ml-3 text-xl"></i>
                              <div>
                                <h4 className="font-semibold">الدفع عند الاستلام</h4>
                                <p className="text-sm text-gray-600">ادفع نقداً عند استلام طلبك</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        paymentMethod === 'bank_transfer' ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`} onClick={() => setPaymentMethod('bank_transfer')}>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            checked={paymentMethod === 'bank_transfer'}
                            onChange={() => setPaymentMethod('bank_transfer')}
                            className="ml-3"
                          />
                          <div className="flex-1">
                            <div className="flex items-center">
                              <i className="fas fa-university text-blue-600 ml-3 text-xl"></i>
                              <div>
                                <h4 className="font-semibold">تحويل بنكي</h4>
                                <p className="text-sm text-gray-600">ادفع عبر التحويل البنكي المباشر</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ملاحظات إضافية (اختياري)
                      </label>
                      <textarea
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="أضف أي ملاحظات خاصة بطلبك..."
                      />
                    </div>

                    <div className="flex space-x-4 space-x-reverse">
                      <button
                        onClick={() => setStep('shipping')}
                        className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                      >
                        <i className="fas fa-arrow-right ml-2"></i>
                        رجوع
                      </button>
                      <button
                        onClick={() => setStep('confirmation')}
                        className="flex-1 bg-gradient-primary text-white py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 btn-hover-glow"
                      >
                        <i className="fas fa-arrow-left ml-2"></i>
                        مراجعة الطلب
                      </button>
                    </div>
                  </div>
                )}

                {/* Order confirmation */}
                {step === 'confirmation' && !orderSuccess && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      <i className="fas fa-check-circle ml-2 text-primary"></i>
                      مراجعة وتأكيد الطلب
                    </h3>

                    {/* Order summary */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold mb-4">معلومات الشحن:</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><span className="font-medium">الاسم:</span> {shippingForm.firstName} {shippingForm.lastName}</div>
                        <div><span className="font-medium">الهاتف:</span> {shippingForm.phone}</div>
                        <div><span className="font-medium">البريد:</span> {shippingForm.email}</div>
                        <div><span className="font-medium">الولاية:</span> {shippingForm.wilaya}</div>
                        <div className="col-span-2"><span className="font-medium">العنوان:</span> {shippingForm.address}, {shippingForm.city}</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold mb-4">طريقة الدفع:</h4>
                      <div className="flex items-center">
                        <i className={`fas ${paymentMethod === 'cod' ? 'fa-money-bill-wave' : 'fa-university'} ml-2 text-primary`}></i>
                        {paymentMethod === 'cod' ? 'الدفع عند الاستلام' : 'تحويل بنكي'}
                      </div>
                    </div>

                    <div className="flex space-x-4 space-x-reverse">
                      <button
                        onClick={() => setStep('payment')}
                        className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                      >
                        <i className="fas fa-arrow-right ml-2"></i>
                        رجوع
                      </button>
                      <button
                        onClick={handleOrderSubmit}
                        disabled={isSubmitting}
                        className="flex-1 bg-gradient-success text-white py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 btn-hover-glow disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <i className="fas fa-spinner fa-spin ml-2"></i>
                            جاري الإرسال...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-check ml-2"></i>
                            تأكيد الطلب
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Success message */}
                {orderSuccess && (
                  <div className="text-center py-8">
                    <div className="text-6xl text-green-500 mb-4">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-green-600 mb-2">
                      تم تأكيد طلبك بنجاح!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      شكراً لك! سيتم الاتصال بك قريباً لتأكيد التوصيل
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        resetCheckout();
                      }}
                      className="bg-gradient-primary text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 btn-hover-glow"
                    >
                      العودة للمتجر
                    </button>
                  </div>
                )}
              </div>

              {/* Order summary sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
                  <h4 className="font-bold text-lg mb-4">ملخص الطلب</h4>
                  
                  <div className="space-y-3 mb-4">
                    {cart.items.map((item) => (
                      <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex items-center space-x-3 space-x-reverse">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-sm line-clamp-1">{item.product.name}</h5>
                          <p className="text-xs text-gray-500">الكمية: {item.quantity}</p>
                        </div>
                        <div className="text-sm font-bold">
                          {(item.product.price * item.quantity).toLocaleString()} دج
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="my-4" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>المجموع الفرعي:</span>
                      <span>{cart.total.toLocaleString()} دج</span>
                    </div>
                    <div className="flex justify-between">
                      <span>رسوم التوصيل:</span>
                      <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                        {shippingCost === 0 ? 'مجاني' : `${shippingCost.toLocaleString()} دج`}
                      </span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>المجموع الكلي:</span>
                      <span className="text-green-600">{totalWithShipping.toLocaleString()} دج</span>
                    </div>
                  </div>

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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
