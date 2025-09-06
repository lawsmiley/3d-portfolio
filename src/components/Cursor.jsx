import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrame;
    
    const updateMousePosition = (e) => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      
      animationFrame = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      });
    };

    const handleMouseEnter = (e) => {
      if (e.target.matches('a, button, [data-cursor="pointer"], input, textarea')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.matches('a, button, [data-cursor="pointer"], input, textarea')) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeaveWindow = () => setIsVisible(false);

    // Throttled event listeners for better performance
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter, true);
    window.addEventListener('mouseleave', handleMouseLeave, true);
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeaveWindow);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseenter', handleMouseEnter, true);
      window.removeEventListener('mouseleave', handleMouseLeave, true);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isClicking ? 0.6 : isHovering ? 1.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 30,
        }}
      >
        <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full shadow-lg" />
      </motion.div>

      {/* Trailing Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <div className="w-10 h-10 border-2 border-green-400 rounded-full opacity-40 animate-pulse" />
      </motion.div>

      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-30"
        animate={{
          x: mousePosition.x - 30,
          y: mousePosition.y - 30,
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 25,
        }}
      >
        <div className="w-16 h-16 border border-blue-400 rounded-full opacity-30 animate-ping" />
      </motion.div>

      {/* Click Effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-50"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              x: mousePosition.x - 20,
              y: mousePosition.y - 20,
            }}
          >
            <div className="w-10 h-10 border-2 border-green-400 rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Effect */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-45"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              x: mousePosition.x - 25,
              y: mousePosition.y - 25,
            }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-sm animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text Effect */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          style={{
            x: mousePosition.x + 20,
            y: mousePosition.y - 10,
          }}
        >
          <div className="text-xs text-green-400 font-semibold bg-black/50 px-2 py-1 rounded">
            Click
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Cursor;
