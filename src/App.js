// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import StackSection from './components/StackSection';
import ProjectsSection from './components/ProjectsSection';
import TeamProjectsSection from './components/TeamProjectsSection';
import BlogSection from './components/BlogSection';
import BlogPost from './components/BlogPost';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import NotFound from './components/NotFound'; // 404 페이지 컴포넌트 추가

function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' && !location.hash) {
      // 해시가 없고 홈 페이지일 경우 최상단으로 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (location.hash) {
      // 해시가 있을 경우 해당 섹션으로 스크롤
      const section = location.hash.replace('#', '');
      scroller.scrollTo(section, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    }
  }, [location]);

  return null;
}

function Home() {
  return (
    <div id="top"> {/* 최상단을 식별할 수 있도록 id="top" 추가 */}
      <HeroSection />
      <AboutSection />
      <StackSection />
      <ProjectsSection />
      <TeamProjectsSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToSection />
      <Routes>
        {/* 홈 페이지 경로 */}
        <Route path="/" element={<Home />} />

        {/* 블로그 목록 페이지 경로 */}
        <Route path="/blog" element={<BlogSection />} />

        {/* 개별 블로그 포스트 페이지 경로 */}
        <Route path="/blog/:id" element={<BlogPost />} />

        {/* 404 페이지 경로 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
