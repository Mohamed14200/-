import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-gradient-primary text-white p-2 rounded-lg">
                <i className="fas fa-store text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mr-3 font-display">
                متجر المدينة الرقمية
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              تجربة تسوق فريدة وآمنة مع تشكيلة واسعة من أفضل المنتجات العالمية بأسعار منافسة وخدمة عملاء متميزة.
            </p>
            
            {/* Social media */}
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              <i className="fas fa-link ml-2 text-primary"></i>
              روابط سريعة
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'الصفحة الرئيسية', icon: 'fa-home' },
                { label: 'من نحن', icon: 'fa-info-circle' },
                { label: 'المنتجات', icon: 'fa-box' },
                { label: 'العروض الخاصة', icon: 'fa-tags' },
                { label: 'اتصل بنا', icon: 'fa-phone' },
                { label: 'المدونة', icon: 'fa-blog' },
              ].map((link) => (
                <li key={link.label}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                    <i className={`fas ${link.icon} ml-2 text-primary group-hover:scale-110 transition-transform`}></i>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              <i className="fas fa-headset ml-2 text-primary"></i>
              خدمة العملاء
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'الأسئلة الشائعة', icon: 'fa-question-circle' },
                { label: 'طرق الدفع', icon: 'fa-credit-card' },
                { label: 'الشحن والتوصيل', icon: 'fa-truck' },
                { label: 'سياسة الإرجاع', icon: 'fa-undo' },
                { label: 'الضمان', icon: 'fa-shield-alt' },
                { label: 'تتبع الطلب', icon: 'fa-search' },
              ].map((link) => (
                <li key={link.label}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                    <i className={`fas ${link.icon} ml-2 text-primary group-hover:scale-110 transition-transform`}></i>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              <i className="fas fa-map-marker-alt ml-2 text-primary"></i>
              تواصل معنا
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3 space-x-reverse text-sm">
                <i className="fas fa-map-marker-alt text-primary mt-1"></i>
                <div>
                  <p className="text-gray-400">العنوان:</p>
                  <p className="text-white">الجزائر العاصمة، الجزائر</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 space-x-reverse text-sm">
                <i className="fas fa-phone text-primary"></i>
                <div>
                  <p className="text-gray-400">الهاتف:</p>
                  <p className="text-white" dir="ltr">+213 555 123 456</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 space-x-reverse text-sm">
                <i className="fas fa-envelope text-primary"></i>
                <div>
                  <p className="text-gray-400">البريد الإلكتروني:</p>
                  <p className="text-white" dir="ltr">info@digitalcitystore.dz</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse text-sm">
                <i className="fas fa-clock text-primary"></i>
                <div>
                  <p className="text-gray-400">ساعات العمل:</p>
                  <p className="text-white">السبت - الخميس: 9:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter subscription */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-right">
              <h5 className="text-lg font-semibold text-white mb-2">
                <i className="fas fa-envelope ml-2 text-primary"></i>
                اشترك في النشرة الإخبارية
              </h5>
              <p className="text-gray-400 text-sm">
                احصل على أحدث العروض والمنتجات الجديدة
              </p>
            </div>
            
            <div className="flex w-full md:w-auto max-w-md">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="bg-gradient-primary text-white px-6 py-3 rounded-l-lg hover:shadow-lg transition-all duration-300 btn-hover-glow">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © {currentYear} متجر المدينة الرقمية. جميع الحقوق محفوظة.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                تطوير وتصميم بواسطة فريق المدينة الرقمية
              </p>
            </div>

            {/* Legal links */}
            <div className="flex space-x-6 space-x-reverse text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                شروط الاستخدام
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                اتفاقية المستخدم
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Payment methods */}
      <div className="bg-gray-900 border-t border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm mb-2">طرق الدفع المقبولة:</p>
              <div className="flex space-x-3 space-x-reverse">
                <div className="bg-white p-2 rounded text-gray-800 text-xs font-bold">VISA</div>
                <div className="bg-white p-2 rounded text-gray-800 text-xs font-bold">CIB</div>
                <div className="bg-green-600 p-2 rounded text-white text-xs font-bold">الدفع عند الاستلام</div>
              </div>
            </div>

            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm mb-2">شهادات الأمان:</p>
              <div className="flex space-x-3 space-x-reverse">
                <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded text-xs">
                  <i className="fas fa-shield-alt ml-1"></i>
                  SSL آمن
                </div>
                <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded text-xs">
                  <i className="fas fa-lock ml-1"></i>
                  حماية البيانات
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 bg-gradient-primary text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40 btn-hover-glow"
        title="العودة لأعلى"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </footer>
  );
};

export default Footer;
