'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car } from 'lucide-react';

const loadingMessages = [
  'Revving the engine...',
  'Checking trunk space...',
  'Finding the best route...',
  'Buckling up...',
];

export function CarLoader() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <div className="relative w-[200px]">
        <div className="h-1 w-full bg-gray-200 rounded-full" />
        <motion.div
          className="absolute -top-3"
          animate={{ x: [0, 170] }}
          transition={{
            x: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
            },
          }}
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{
              y: {
                duration: 0.3,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              },
            }}
          >
            <Car className="w-8 h-8 text-primary" />
          </motion.div>
        </motion.div>
      </div>
      <p className="text-sm text-gray-500 font-medium w-48 text-center h-5">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
}
