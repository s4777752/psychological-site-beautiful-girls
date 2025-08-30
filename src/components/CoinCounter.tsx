import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CoinCounterProps {
  onCoinDeduction?: (coins: number) => void;
}

const CoinCounter: React.FC<CoinCounterProps> = ({ onCoinDeduction }) => {
  const [coins, setCoins] = useState<number>(() => {
    const savedCoins = localStorage.getItem('goldCoins');
    return savedCoins ? parseInt(savedCoins) : 100;
  });

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    localStorage.setItem('goldCoins', coins.toString());
  }, [coins]);

  const handleCoinClick = () => {
    if (coins >= 13) {
      setCoins(prevCoins => {
        const newCoins = prevCoins - 13;
        onCoinDeduction?.(13);
        return newCoins;
      });
      
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={handleCoinClick}
        disabled={coins < 13}
        className={`
          bg-gradient-to-r from-yellow-400 to-amber-500 
          hover:from-yellow-500 hover:to-amber-600 
          text-amber-900 font-bold shadow-lg 
          transition-all duration-300 
          ${isAnimating ? 'scale-110 shadow-xl' : 'scale-100'}
          ${coins < 13 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        size="lg"
      >
        <div className="flex items-center space-x-2">
          <Icon 
            name="Coins" 
            size={20} 
            className={`text-amber-800 ${isAnimating ? 'animate-spin' : ''}`} 
          />
          <span className="text-lg font-bold">{coins}</span>
        </div>
      </Button>
      
      {coins < 13 && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Недостаточно монет
          </div>
        </div>
      )}
      
      {isAnimating && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6">
          <div className="bg-red-600 text-white font-bold text-sm px-2 py-1 rounded animate-bounce">
            -13
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinCounter;