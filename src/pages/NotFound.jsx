import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Starry background component
const StarryBackground = () => {
    useEffect(() => {
        // Create stars dynamically
        const createStars = () => {
            const starsContainer = document.querySelector('.stars-container');
            if (!starsContainer) return;

            for (let i = 0; i < 60; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.width = `${1 + Math.random() * 2}px`;
                star.style.height = `${1 + Math.random() * 2}px`;
                star.style.animationDelay = `${Math.random() * 3}s`;
                star.style.animationDuration = `${2 + Math.random() * 3}s`;
                starsContainer.appendChild(star);
            }
        };

        createStars();
    }, []);

    return (
        <div className="stars-container absolute inset-0 z-0 pointer-events-none">
            <style>{`
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: twinkle 3s infinite ease-in-out;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 0; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.4; 
            transform: scale(1.1); 
          }
        }
      `}</style>
        </div>
    );
};

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gray-900 text-white">
            <StarryBackground />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60 z-10" />

            <div className="relative z-20 flex flex-col items-center justify-center text-center p-8 bg-black/30 rounded-2xl shadow-2xl shadow-purple-500/20 border border-purple-500/30 backdrop-blur-md">
                {/* Animated border effect */}
                <div
                    className="absolute inset-0 border-4 border-purple-600 rounded-2xl opacity-0"
                    data-aos="zoom-in"
                    data-aos-duration="3000"
                    data-aos-iteration="infinite"
                    style={{
                        animation: 'pulse 3s infinite ease-in-out'
                    }}
                />

                <h1
                    className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 relative group"
                    data-aos="fade-down"
                    data-aos-delay="200"
                >
                    Under Construction
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-pink-500/80 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                </h1>

                <p
                    className="text-lg text-gray-300 mb-8 max-w-md"
                    data-aos="fade-up"
                    data-aos-delay="500"
                >
                    Something amazing is being built here. We are working hard to bring
                    this page to life. Please check back soon!
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 px-6 py-3 bg-purple-600/80 text-white font-semibold rounded-lg hover:bg-purple-500 transition-all duration-300 shadow-lg shadow-purple-500/30 cursor-pointer z-20 hover:scale-105 active:scale-95"
                    data-aos="zoom-in"
                    data-aos-delay="800"
                >
                    <ArrowLeft size={20} />
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default NotFound;
