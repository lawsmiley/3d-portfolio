import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark-surface/90 backdrop-blur-lg shadow-2xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold gradient-text"
          >
            MyPortfolio
          </motion.div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8 text-gray-300">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="relative group"
              >
                <button
                  onClick={() => scrollToSection(item.href)}
                  data-cursor="pointer"
                  className="hover:text-white transition-colors duration-300 relative"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-blue group-hover:w-full transition-all duration-300"></span>
                </button>
              </motion.li>
            ))}
          </ul>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            data-cursor="pointer"
            className="hidden md:flex items-center gap-2 px-3 py-2 glass rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
          >
            {theme === 'dark' ? (
              <>
                <span>☀️</span>
                <span>Light</span>
              </>
            ) : (
              <>
                <span>🌙</span>
                <span>Dark</span>
              </>
            )}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-cursor="pointer"
            className="md:hidden text-white p-2"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`block h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}></span>
              <span className={`block h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`block h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}></span>
            </div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <ul className="py-4 space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-300 hover:text-white transition-colors duration-300 block w-full text-left"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
