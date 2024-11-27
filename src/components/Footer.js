// src/components/Footer.js
import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto text-center">
        <div className="mb-4 flex justify-center space-x-6">
          <motion.a
            href="https://github.com/gooleh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
            aria-label="GitHub"
            whileHover={{ scale: 1.2 }}
          >
            <FaGithub size={24} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/태규-이-81822b334"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
            aria-label="LinkedIn"
            whileHover={{ scale: 1.2 }}
          >
            <FaLinkedin size={24} />
          </motion.a>
          <motion.a
            href="mailto:your.email@example.com"
            className="hover:text-white"
            aria-label="Email"
            whileHover={{ scale: 1.2 }}
          >
            <FaEnvelope size={24} />
          </motion.a>
        </div>
        <p>&copy; {new Date().getFullYear()} Taekyue Lee. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
