import React, { useState, useEffect } from 'react';
import { SliderData } from '../types';

interface SliderProps {
  slides: SliderData[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden rounded-2xl mx-4 my-6 shadow-2xl">
      {/* Slides container */}
      <div 
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(${currentSlide * -100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="relative w-full h-full flex-shrink-0"
          >
            {/* Background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center text-white px-6 max-w-4xl">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 font-display slide-in-right">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-2xl mb-8 font-arabic slide-in-left" style={{animationDelay: '0.3s'}}>
                  {slide.subtitle}
                </p>
                <div className="space-x-4 space-x-reverse bounce-in" style={{animationDelay: '0.6s'}}>
                  <button 
                    onClick={() => window.location.hash = slide.link}
                    className="bg-gradient-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 btn-hover-glow"
                  >
                    <i className="fas fa-shopping-cart ml-2"></i>
                    تسوق الآن
                  </button>
                  <button className="border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-300">
                    <i className="fas fa-eye ml-2"></i>
                    استكشف المزيد
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20"
      >
        <i className="fas fa-chevron-left text-xl"></i>
      </button>

      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20"
      >
        <i className="fas fa-chevron-right text-xl"></i>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 space-x-reverse z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Play/Pause button */}
      <button
        onClick={togglePlayPause}
        className="absolute top-4 left-4 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-300 z-20"
        title={isPlaying ? 'إيقاف العرض التلقائي' : 'تشغيل العرض التلقائي'}
      >
        <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
      </button>

      {/* Slide counter */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-20">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black bg-opacity-30 z-20">
        <div 
          className="h-full bg-gradient-primary transition-all duration-300"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};

export default Slider;
