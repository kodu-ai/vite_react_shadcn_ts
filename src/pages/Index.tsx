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
import { Sparkles } from 'lucide-react';

export default function FancyMotionStartPage() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);

  const handleCelebrationClick = () => {
    if (isCelebrating) return;

    setIsCelebrating(true);
    setShowConfetti(true);

    setTimeout(() => {
      setShowConfetti(false);
      setTimeout(() => setIsCelebrating(false), 500);
    }, 5000);
  };

  // Animation Variants with CORRECTED easing
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
    <div className="container flex flex-1 flex-col items-center justify-center py-12 text-center overflow-hidden min-h-screen">
      {/* Confetti logic remains the same */}
      {showConfetti && width && height && (
        <ReactConfetti
          width={width}
          height={height}
          numberOfPieces={250}
          gravity={0.15}
          recycle={false}
          tweenDuration={4500}
        />
      )}

      {/* Wrap the Card structure in motion.div */}
      <motion.div
        className="w-full max-w-lg"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card>
          <CardHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
            >
              <Sparkles className="h-6 w-6" />
            </motion.div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              Welcome Aboard!
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
              Your new project canvas is ready and waiting for innovation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base">
              This is the starting line. From here, our agent will begin
              crafting your unique application experience. Click the button
              below to celebrate the start!
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
                onClick={handleCelebrationClick}
                disabled={isCelebrating}
                className="disabled:opacity-70"
              >
                {isCelebrating ? 'Celebrating...' : 'Start the Celebration!'}
                <span className="ml-2 text-xl">🎉</span>
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>

      <p className="mt-8 text-sm text-muted-foreground">Powered by Azad.bot</p>
    </div>
  );
}
