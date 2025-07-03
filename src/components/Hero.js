// src/components/Hero.js
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Colors for Dark Theme
const colors = {
  background: '#0d0d0d',
  primaryText: '#ffffff', // White for main title text
  secondaryText: '#a0c4ff', // Subtle blue-gray for rotating text
  accent: '#ffe600',
  buttonText: '#000000',
};

// Background fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Animation for rotating text
const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  20% { opacity: 1; transform: translateY(0); }
  80% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
`;

// Pop-in animation for text and button
const popIn = keyframes`
  0% { opacity: 0; transform: scale(0.8) translateY(20px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
`;

// Hero section styling
const HeroContainer = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primaryText};
  background: ${colors.background};
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
`;

// Video background styling
const VideoBackground = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: 0;
`;

// Dark overlay for improved readability
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

// Content styling
const HeroContent = styled.div`
  position: relative;
  text-align: center;
  z-index: 2;
  animation: ${fadeIn} 1s ease-out forwards;
`;

// Rotating Information Text styling
const RotatingText = styled.h2`
  font-size: 1.5rem;
  color: ${colors.secondaryText};
  margin-bottom: 1.5rem;
  animation: ${fadeInOut} 6s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

// Hero title with pop-in animation
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${colors.primaryText};
  margin-bottom: 1rem;
  line-height: 1.3;
  animation: ${popIn} 1s ease forwards;
  animation-delay: 0.5s;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// Call-to-action button with pop-in animation and scaling effect
const CTAButton = styled.button`
  padding: 0.75rem 2rem;
  font-size: 1rem;
  color: ${colors.buttonText};
  background-color: ${colors.accent};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  animation: ${popIn} 1s ease forwards;
  animation-delay: 1s;

  &:hover {
    background-color: #d4c300;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.7rem 1.5rem;
  }
`;

function Hero() {
  const [index, setIndex] = useState(0);
  const rotatingTexts = [
    "Gain Real-World Skills with Exclusive Hands-On Projects in Data Science",
    "Receive a Minimum Stipend of ₹10,000/Month and a 6-Month Internship Certificate from Inikola",
    "Learn from Top Data Science Mentors and Boost Your Career with Crafting Brain & Inikola",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length);
    }, 6000); // 6 seconds for each text to cycle
    return () => clearInterval(interval);
  }, [rotatingTexts.length]);

  const handleEnrollNow = () => {
    window.location.href = '/payment'; // Redirect to /payment
  };

  return (
    <HeroContainer>
      {/* Video Background */}
      <VideoBackground autoPlay loop muted playsInline>
        <source src={require("../assets/video.mp4")} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>

      {/* Dark Overlay */}
      <Overlay />

      {/* Content */}
      <HeroContent>
        <Title>
          Elevate Your Data Science Career <br />
          with Crafting Brain & Inikola
        </Title>
        <RotatingText key={index}>{rotatingTexts[index]}</RotatingText>
        <CTAButton onClick={handleEnrollNow}>Enroll Now</CTAButton>
      </HeroContent>
    </HeroContainer>
  );
}

export default Hero;
