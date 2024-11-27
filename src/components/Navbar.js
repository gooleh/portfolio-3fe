// src/components/Navbar.js
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = (section) => {
    if (location.pathname !== '/') {
      navigate(`/#${section}`);
    } else {
      scroller.scrollTo(section, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <motion.nav
      className="fixed top-0 w-full bg-surface shadow-md z-10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div
          className="text-2xl font-bold text-primary hover:text-secondary transition-colors duration-300 cursor-pointer"
          onClick={handleHomeClick} // 클릭 시 handleHomeClick 호출
        >
          My Portfolio
        </div>
        <div className="space-x-6 hidden md:flex">
          <button
            onClick={() => handleScroll('about')}
            className="cursor-pointer focus:outline-none text-textPrimary hover:text-secondary transition duration-300"
          >
            About
          </button>
          <button
            onClick={() => handleScroll('stack')}
            className="cursor-pointer focus:outline-none text-textPrimary hover:text-secondary transition duration-300"
          >
            Stack
          </button>
          <button
            onClick={() => handleScroll('projects')}
            className="cursor-pointer focus:outline-none text-textPrimary hover:text-secondary transition duration-300"
          >
            Projects
          </button>
          <button
            onClick={() => handleScroll('team-projects')}
            className="cursor-pointer focus:outline-none text-textPrimary hover:text-secondary transition duration-300"
          >
            Team Projects
          </button>
          <NavLink
            to="/blog"
            className="cursor-pointer text-textPrimary hover:text-secondary transition duration-300"
          >
            Blog
          </NavLink>
          <button
            onClick={() => handleScroll('contact')}
            className="cursor-pointer focus:outline-none text-textPrimary hover:text-secondary transition duration-300"
          >
            Contact
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
