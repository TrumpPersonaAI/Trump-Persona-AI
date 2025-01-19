import React, { useState, useEffect } from 'react';
import { TRUMP_STICKERS } from '../lib/constants';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [currentStickerIndex, setCurrentStickerIndex] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const stickerInterval = setInterval(() => {
      setCurrentStickerIndex(prev => (prev + 1) % TRUMP_STICKERS.length);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stickerInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#FED90F] flex flex-col items-center justify-center z-50">
      {/* Decorative Stickers */}
      <div className="absolute top-10 left-10 transform -rotate-12">
        <img
          src={TRUMP_STICKERS[1]}
          alt="Trump Sticker"
          className="w-48 h-48 object-contain animate-float"
          style={{ animationDuration: '4s' }}
        />
      </div>
      <div className="absolute top-20 right-12 transform rotate-12">
        <img
          src={TRUMP_STICKERS[2]}
          alt="Trump Sticker"
          className="w-44 h-44 object-contain animate-float"
          style={{ animationDuration: '5s', animationDelay: '1s' }}
        />
      </div>
      <div className="absolute bottom-16 left-16 transform -rotate-6">
        <img
          src={TRUMP_STICKERS[3]}
          alt="Trump Sticker"
          className="w-52 h-52 object-contain animate-float"
          style={{ animationDuration: '4.5s', animationDelay: '0.5s' }}
        />
      </div>
      <div className="absolute bottom-20 right-20 transform rotate-6">
        <img
          src={TRUMP_STICKERS[4]}
          alt="Trump Sticker"
          className="w-48 h-48 object-contain animate-float"
          style={{ animationDuration: '5.5s', animationDelay: '1.5s' }}
        />
      </div>

      {/* Main Loading Content */}
      <div className="relative w-80 h-80 mb-8">
        <img
          src={TRUMP_STICKERS[currentStickerIndex]}
          alt="Trump Loading"
          className="w-full h-full object-contain animate-float"
          style={{ animationDuration: '3s' }}
        />
      </div>
      
      <h2 className="text-4xl font-bold mb-8" style={{ 
        fontFamily: 'Comic Sans MS, cursive',
        textShadow: '2px 2px 0px #000000',
        color: '#FF6B3D'
      }}>
        Making Chat Great Again!
      </h2>
      
      <div className="w-80 h-8 bg-white rounded-full border-4 border-black shadow-cartoon overflow-hidden">
        <div 
          className="h-full bg-[#FF6B3D] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="mt-4 text-lg font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
        Loading... {progress}%
      </p>
    </div>
  );
}