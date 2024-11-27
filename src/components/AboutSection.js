// src/components/AboutSection.js
import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <motion.section
      id="about"
      className="py-20 px-6 bg-background text-textPrimary"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <motion.div
          className="w-full md:w-1/2 mb-10 md:mb-0 flex justify-center"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/portfolio-3fe.appspot.com/o/image1.jpeg?alt=media&token=ceb60e9d-37d6-48ee-96c5-d138de29472d"
            alt="Your Profile"
            className="w-65 h-65 md:w-70 md:h-70 rounded-full shadow-lg object-cover"
          />
        </motion.div>
        <motion.div
          className="w-full md:w-1/2 md:pl-10"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-primary">About Me</h2>
          <p className="text-lg mb-4 text-textSecondary leading-relaxed">
          저는 세련되고 직관적인 모바일 애플리케이션을 만드는 데 열정을 갖고 있는 모바일 앱 개발자입니다.
          저는 도전적인 문제를 해결하고 기술을 향상시키기 위해 끊임없이 새로운 기술을 배우는 것을 좋아합니다.
          </p>
          <p className="text-lg text-textSecondary leading-relaxed">
          코딩 외에도 그림 그리기, 독서, 자연 속에서 시간 보내는 것을 좋아합니다.
          저의 목표는 사람들의 삶에 긍정적인 영향을 미치는 제품을 만드는 것입니다.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
