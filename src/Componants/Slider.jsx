import React, { useState, useEffect } from 'react';
import Food06 from '../assets/images/food6.webp'
import Food05 from '../assets/images/food5.webp'
import Food04 from '../assets/images/food4.webp'
import Food03 from '../assets/images/food3.webp'
import Food02 from '../assets/images/food2.webp'
import Food01 from '../assets/images/food0.webp'


const FoodCarousel = () => {
  const [slides, setSlides] = useState([
    {
      id: 1,
      title: "Spicy Chili Soup",
      image: Food01 ,
      ingredients: [
        "1/2 Cup of Mixed Herbs",
        "2 Pieces of Baguette",
        "3 Large Tomatoes",
        "4 Fresh Salads",
        "1 Red Chili"
      ],
      description: "Quis autem velis et reprehender etims quiste voluptate velit esse quam nihil etsa illum sit sedit consequatur quias voluptas nets."
    },
    {
      id: 2,
      title: "Classic Bolognese",
      image: Food02,
      ingredients: [
        "1/2 Cup of Mixed Herbs",
        "2 Pieces of Baguette",
        "3 Large Tomatoes",
        "4 Fresh Salads",
        "1 Red Chili"
      ],
      description: "Quis autem velis et reprehender etims quiste voluptate velit esse quam nihil etsa illum sit sedit consequatur quias voluptas nets."
    },
    {
      id: 3,
      title: "Cottage Cheese & Chives",
      image: Food03,
      ingredients: [
        "1/2 Cup of Mixed Herbs",
        "2 Pieces of Baguette",
        "3 Large Tomatoes",
        "4 Fresh Salads",
        "1 Red Chili"
      ],
      description: "Quis autem velis et reprehender etims quiste voluptate velit esse quam nihil etsa illum sit sedit consequatur quias voluptas nets."
    },
    {
      id: 4,
      title: "Colorful Salad",
      image: Food04,
      ingredients: [
        "1/2 Cup of Mixed Herbs",
        "2 Pieces of Baguette",
        "3 Large Tomatoes",
        "4 Fresh Salads",
        "1 Red Chili"
      ],
      description: "Quis autem velis et reprehender etims quiste voluptate velit esse quam nihil etsa illum sit sedit consequatur quias voluptas nets."
    },
    {
      id: 5,
      title: "Strawberry Cheesecake",
      image: Food06,
      ingredients: [
        "1/2 Cup of Mixed Herbs",
        "2 Pieces of Baguette",
        "3 Large Tomatoes",
        "4 Fresh Salads",
        "1 Red Chili"
      ],
      description: "Quis autem velis et reprehender etims quiste voluptate velit esse quam nihil etsa illum sit sedit consequatur quias voluptas nets."
    },
    {
      id: 6,
      title: "Tasty Muesli",
      image: Food05,
      ingredients: [
        "1/2 Cup of Mixed Herbs",
        "2 Pieces of Baguette",
        "3 Large Tomatoes",
        "4 Fresh Salads",
        "1 Red Chili"
      ],
      description: "Quis autem velis et reprehender etims quiste voluptate velit esse quam nihil etsa illum sit sedit consequatur quias voluptas nets."
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activePopup, setActivePopup] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  // Check if we're in a small screen
  const isSmallScreen = windowWidth < 768;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const getVisibleSlides = () => {
    const totalSlides = slides.length;
    
    // For small screens, only show the center slide
    if (isSmallScreen) {
      return [
        { ...slides[currentIndex], position: 'center' }
      ];
    }
    
    // For larger screens, show left, center, right
    const centerIndex = currentIndex;
    const leftIndex = (centerIndex - 1 + totalSlides) % totalSlides;
    const rightIndex = (centerIndex + 1) % totalSlides;
    
    return [
      { ...slides[leftIndex], position: 'left' },
      { ...slides[centerIndex], position: 'center' },
      { ...slides[rightIndex], position: 'right' },
    ];
  };

  const visibleSlides = getVisibleSlides();

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleViewRecipe = (slideId) => {
    setActivePopup(slideId);
  };

  const handleClosePopup = () => {
    setActivePopup(null);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // Swipe functionality for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Get the slide with the current popup
  const activeSlide = activePopup ? slides.find(slide => slide.id === activePopup) : null;

  return (
    <div className="py-6 md:py-12 bg-white">
      {/* Section Title */}
      <div className="text-center mb-8 md:mb-12">
        <span className="inline-block text-lg md:text-xl font-bold text-orange-500 mb-1 md:mb-2">Chef's Pick</span>
        <h2 className="text-2xl md:text-4xl font-bold">Cooking Recipes</h2>
      </div>
      
      {/* Carousel Container */}
      <div 
        className="relative w-full max-w-6xl mx-auto h-64 md:h-80"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Carousel Slides */}
        <div className="flex items-center justify-center w-full h-full relative">
          {visibleSlides.map((slide, index) => {
            // Set different styles based on the position and screen size
            let slideStyles = "transition-all duration-500 ease-in-out rounded-lg shadow-lg overflow-hidden";
            let positionStyles = "";
            
            if (isSmallScreen) {
              // For small screens, center slide takes full width
              positionStyles = "w-full h-64 absolute left-1/2 -translate-x-1/2 z-20";
            } else {
              // For larger screens, position accordingly
              switch(slide.position) {
                case 'left':
                  positionStyles = "absolute left-16 w-64 h-64 transform perspective-1000 -skew-x-12 z-10 opacity-70";
                  break;
                case 'center':
                  positionStyles = "absolute left-1/2 -translate-x-1/2 w-80 h-80 z-20";
                  break;
                case 'right':
                  positionStyles = "absolute right-16 w-64 h-64 transform perspective-1000 skew-x-12 z-10 opacity-70";
                  break;
                default:
                  break;
              }
            }

            return (
              <div 
                key={slide.id} 
                className={`${slideStyles} ${positionStyles}`}
                onClick={() => slide.position === 'center' ? handleViewRecipe(slide.id) : null}
              >
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover"
                />
                
                {slide.position === 'center' && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewRecipe(slide.id);
                      }}
                      className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      VIEW RECIPE
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons - Hidden on small screens */}
        {!isSmallScreen && (
          <>
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 bg-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center z-30 hover:bg-gray-100"
              onClick={handlePrev}
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            
            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 bg-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center z-30 hover:bg-gray-100"
              onClick={handleNext}
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </>
        )}
      </div>
      
      {/* Navigation Dots - Adjust size based on screen */}
      <div className="flex justify-center mt-4 md:mt-8 space-x-1 md:space-x-2 overflow-x-auto px-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => handleDotClick(index)}
            className={`w-10 md:w-16 h-8 md:h-12 overflow-hidden rounded transition-all flex-shrink-0 ${
              index === currentIndex ? 'border-2 border-orange-500' : 'opacity-50'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Recipe Popup */}
      {activePopup && activeSlide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden relative">
            <button 
              onClick={handleClosePopup}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 z-10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <div className="p-4 md:p-6">
              <span className="foodcarousel-headline text-lg md:text-xl font-bold border-b border-gray-800 pb-1">{activeSlide.title}</span>
              <div className="mt-4 space-y-1">
                {activeSlide.ingredients.map((ingredient, idx) => (
                  <div key={idx}>{ingredient}</div>
                ))}
              </div>
              <hr className="my-4 border-t border-gray-300" />
              <p>{activeSlide.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodCarousel;