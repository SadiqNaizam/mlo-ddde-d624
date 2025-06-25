import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface AnimatedCounterProps {
  /**
   * The target value to animate to.
   */
  value: number;
  /**
   * Optional CSS class for styling the counter.
   */
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, className }) => {
  console.log('AnimatedCounter loaded with value:', value);

  // Create a motion value, initializing it with the first value passed in.
  const count = useMotionValue(value);

  // Create a new motion value that transforms the count to a rounded integer.
  const rounded = useTransform(count, (latest) => {
    return Math.round(latest);
  });

  useEffect(() => {
    // The `animate` function returns controls that can be used to stop the animation.
    // We'll use this in the cleanup function.
    const controls = animate(count, value, {
      duration: 0.7, // Adjust duration for a pleasant feel
      ease: 'easeInOut', // Use a gentle easing function
    });

    // Return a cleanup function that stops the animation when the component
    // unmounts or the `value` prop changes, preventing conflicting animations.
    return controls.stop;
  }, [value, count]); // Re-run the effect when the target `value` changes

  return (
    <motion.span className={className}>
      {rounded}
    </motion.span>
  );
};

export default AnimatedCounter;