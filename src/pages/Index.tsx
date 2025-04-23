'use client';

import React, { useState } from 'react';
import ReactConfetti from 'react-confetti';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useWindowSize } from '@/hooks/use-window-size';
import { Sparkles } from 'lucide-react'; // Keeping Sparkles, fits the vibe!

export default function ItaewonNightlifePage() { // Renamed component for clarity
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isEntering, setIsEntering] = useState(false); // Renamed state

  const handleEnterClick = () => { // Renamed handler
    if (isEntering) return;

    setIsEntering(true);
    setShowConfetti(true); // Let's keep the confetti!

    setTimeout(() => {
      setShowConfetti(false);
      setTimeout(() => setIsEntering(false), 500);
    }, 5000);
  };

  // Animation Variants remain the same
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const buttonHoverTap = {
    hover: { scale: 1.05, transition: { type: 'spring', stiffness: 300 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="container flex flex-1 flex-col items-center justify-center py-12 text-center overflow-hidden min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white"> {/* Added a night vibe background */}
      {showConfetti && width && height && (
        <ReactConfetti
          width={width}
          height={height}
          numberOfPieces={250}
          gravity={0.15}
          recycle={false}
          tweenDuration={4500}
          colors={['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#8b5cf6']} // Neon-ish confetti
        />
      )}

      <motion.div
        className="w-full max-w-lg"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Using Card component with adjusted styling for dark theme */}
        <Card className="bg-black/50 border-purple-500/50 shadow-lg shadow-purple-500/30">
          <CardHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600/20 text-purple-400"
            >
              <Sparkles className="h-6 w-6" />
            </motion.div>
            <CardTitle className="text-3xl font-bold tracking-tight text-pink-400">
              Ready to Itaewon the Night? {/* Pun Title */}
            </CardTitle>
            <CardDescription className="text-lg text-indigo-300 pt-2">
              {/* Pun Description */}
              Where the neon lights are brighter than your future plans, and the only thing steeper than the hills are the bar tabs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base text-gray-300">
              {/* Pun Content */}
              This page is your digital pre-game. Fuel up on pixels before you hit the real streets. Click below when you're ready to embrace the glorious chaos.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center pt-4">
            <motion.div
              variants={buttonHoverTap}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                size="lg"
                onClick={handleEnterClick} // Use renamed handler
                disabled={isEntering} // Use renamed state
                className="disabled:opacity-70 bg-pink-500 hover:bg-pink-600 text-white font-semibold" // Themed button
              >
                {isEntering ? 'Entering...' : 'Enter the Neon Jungle'} {/* Pun Button Text */}
                <span className="ml-2 text-xl">🚀</span> {/* Changed emoji */}
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>

      <p className="mt-8 text-sm text-purple-400/70">Powered by Soju & Azad.bot</p> {/* Adjusted footer */}
    </div>
  );
}
