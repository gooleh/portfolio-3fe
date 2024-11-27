// src/components/StackSection.js
import React from 'react';
import { FaReact, FaNodeJs, FaSwift, FaGitAlt, FaJava, FaPython } from 'react-icons/fa';
import {
  SiFlutter,
  SiDart,
  SiFirebase,
  SiAndroidstudio,
  SiFramer,
  SiOpenai,
  SiSolidity,
} from 'react-icons/si';
import { motion } from 'framer-motion';

const technologies = [
  { name: 'React', icon: <FaReact size={48} className="text-blue-500" /> },
  { name: 'Node.js', icon: <FaNodeJs size={48} className="text-green-500" /> },
  { name: 'Swift', icon: <FaSwift size={48} className="text-red-500" /> },
  { name: 'Flutter', icon: <SiFlutter size={48} className="text-blue-400" /> },
  { name: 'Dart', icon: <SiDart size={48} className="text-blue-600" /> },
  { name: 'Java', icon: <FaJava size={48} className="text-red-600" /> },
  { name: 'Python', icon: <FaPython size={48} className="text-yellow-500" /> },
  { name: 'Solidity', icon: <SiSolidity size={48} className="text-gray-600" /> },
  { name: 'Android Studio', icon: <SiAndroidstudio size={48} className="text-green-400" /> },
  { name: 'Framer', icon: <SiFramer size={48} className="text-purple-500" /> },
  { name: 'ChatGPT', icon: <SiOpenai size={48} className="text-gray-800" /> },
  { name: 'Firebase', icon: <SiFirebase size={48} className="text-yellow-500" /> },
  { name: 'Git', icon: <FaGitAlt size={48} className="text-orange-500" /> },
];

const StackSection = () => {
  return (
    <section id="stack" className="py-20 px-6 bg-background text-textPrimary">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-primary">Tech Stack</h2>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="mb-2">{tech.icon}</div>
              <p className="text-lg font-medium text-textSecondary">{tech.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackSection;
