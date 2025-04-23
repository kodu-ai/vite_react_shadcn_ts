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
import { Zap } from 'lucide-react'; // Changed icon to Zap for more energy!
import { useToast } from '@/components/ui/use-toast'; // Import toast for the Easter egg

export default function ItaewonMadnessPage() { // Renamed component
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const { toast } = useToast(); // Initialize toast

  const handleEnterClick = () => {
    if (isEntering) return;

    setIsEntering(true);
    setShowConfetti(true);

    setTimeout(() => {
      setShowConfetti(false);
      setTimeout(() => setIsEntering(false), 500);
    }, 5000);
  };

  // Easter Egg Handler
  const handleSojuClick = () => {
    toast({
      title: "🤫 Psst... Pro Tip:",
      description: "Tomorrow's survival kit: Haejangguk and maybe sunglasses indoors. You got this.",
      variant: "destructive", // Make it stand out a bit
    });
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
    // Added a subtle repeating background pattern for more visual noise
    // Note: Ensure placeholder.svg exists and is accessible via this path, or adjust path/remove bg-[url(...)]
    <div className="container flex flex-1 flex-col items-center justify-center py-12 text-center overflow-hidden min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-black text-white bg-[url('/placeholder.svg')] bg-repeat bg-opacity-5">
      {showConfetti && width && height && (
        <ReactConfetti
          width={width}
          height={height}
          numberOfPieces={400} // More confetti!
          gravity={0.2} // Slightly faster fall
          recycle={false}
          tweenDuration={4500}
          colors={['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#8b5cf6', '#ffffff']} // Added white
        />
      )}

      <motion.div
        className="w-full max-w-lg"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="bg-black/60 border-pink-500/60 shadow-xl shadow-pink-500/40 backdrop-blur-sm"> {/* More blur, more shadow */}
          <CardHeader>
            <motion.div
              initial={{ scale: 0, rotate: -180 }} // Added rotation
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 150 }} // Slightly bouncier
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-600/30 text-pink-400"
            >
              <Zap className="h-7 w-7" /> {/* Using Zap icon */}
            </motion.div>
            <CardTitle className="text-4xl font-extrabold tracking-tighter text-fuchsia-400"> {/* Crazier title */}
              Dive into Itaewon Madness!
            </CardTitle>
            <CardDescription className="text-lg text-purple-300 pt-2 italic"> {/* Crazier description */}
              Where the world collides in a neon blur, bass shakes the pavement, and every alley promises adventure (or maybe just really good tteokbokki).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base text-gray-200 font-medium"> {/* Crazier content */}
              Charge your phone, hydrate (seriously), and prepare your soul. This is just the loading screen for the main event. Click when you're ready to lose track of time (and maybe your friends).
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
                onClick={handleEnterClick}
                disabled={isEntering}
                className="disabled:opacity-70 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold text-lg shadow-lg shadow-fuchsia-600/50" // Bolder button
              >
                {isEntering ? 'BRACING...' : 'Unleash the Night!'} {/* Crazier button text */}
                <span className="ml-2 text-xl animate-pulse">🔥</span> {/* Pulsing fire emoji */}
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Easter Egg Trigger */}
      <p className="mt-8 text-sm text-purple-400/80">
        Powered by{' '}
        <span
          className="cursor-pointer font-bold text-pink-400 hover:text-pink-300 underline decoration-dotted"
          onClick={handleSojuClick} // Added onClick for Easter egg
        >
          Soju
        </span>{' '}
        & Azad.bot
      </p>

    </div>
  );
}

// Make sure you have a Toaster component set up in your App layout for the toast to appear.
// Example (add to your main layout/App.tsx if not present):
// import { Toaster } from "@/components/ui/toaster"
// ...
// return (
//   <ThemeProvider> {/* Or your main layout structure */}
//     {/* Your page content */}
//     <Toaster />
//   </ThemeProvider>
// )
