import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SimpleScene from './r3f/SimpleScene';
import { Stars, Html, OrbitControls } from '@react-three/drei';


const Hero = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={ref}
      id="hero" 
      className="h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          
          <Stars
            radius={100}
            depth={50}
            count={1000}
            factor={4}
            fade
            speed={0.5}
          />
          
          <Suspense fallback={
            <Html center>
              <div className="text-2xl text-blue-400 animate-pulse">Loading 3D Scene...</div>
            </Html>
          }>
            <SimpleScene />
          </Suspense>
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6">
            Hi, I'm{' '}
            <span className="gradient-text-animated">
              Your Name
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          Full-Stack Developer | Gamer | Tech Enthusiast | Code Warrior
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProjects}
            data-cursor="pointer"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300"
          >
            View My Work
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            data-cursor="pointer"
            className="px-8 py-4 border-2 border-blue-500 rounded-full font-semibold text-lg hover:bg-blue-500 hover:bg-opacity-10 transition-all duration-300"
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center cursor-pointer"
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          data-cursor="pointer"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-blue-500 rounded-full mt-2"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
