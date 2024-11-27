// src/components/HeroSection.js
import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white h-screen flex flex-col justify-center items-center">
      <motion.h1
        className="text-6xl font-bold mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Lee Taekyue
      </motion.h1>
      <motion.p
        className="text-2xl mb-8 text-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Passionate iOS & Flutter Developer
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <Link
          to="about"
          smooth={true}
          duration={500}
          className="bg-white text-primary py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 font-medium"
        >
          Learn More About Me
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
