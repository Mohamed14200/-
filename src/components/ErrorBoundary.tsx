import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            {/* Error icon */}
            <div className="text-6xl text-red-500 mb-6">
              <i className="fas fa-exclamation-triangle"></i>
            </div>

            {/* Error message */}
            <h1 className="text-2xl font-bold text-gray-800 mb-4 font-display">
              حدث خطأ غير متوقع
            </h1>
            
            <p className="text-gray-600 mb-6 font-arabic">
              نعتذر، حدث خطأ في النظام. يرجى إعادة تحديث الصفحة أو العودة للصفحة الرئيسية.
            </p>

            {/* Error details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-red-600 font-mono">
                  {this.state.error.message}
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="space-y-3">
              <button
                onClick={this.handleRefresh}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                <i className="fas fa-sync-alt ml-2"></i>
                إعادة تحديث الصفحة
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
              >
                <i className="fas fa-home ml-2"></i>
                العودة للصفحة الرئيسية
              </button>
            </div>

            {/* Contact support */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">
                إذا استمر المشكل، تواصل معنا:
              </p>
              <div className="flex items-center justify-center space-x-4 space-x-reverse">
                <a 
                  href="mailto:support@digitalcitystore.dz"
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  <i className="fas fa-envelope ml-1"></i>
                  البريد الإلكتروني
                </a>
                <a 
                  href="tel:+213555123456"
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  <i className="fas fa-phone ml-1"></i>
                  الهاتف
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
