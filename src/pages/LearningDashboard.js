import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

// Updated Theme colors (Yellow and Black Theme)
const colors = {
  background: '#0a0a0a', // Black background
  cardBackground: '#1a1a1a', // Darker card background
  accent: '#f0c808', // Classic yellow accent color
  text: '#f5f5f5', // Light text color
  sectionBackground: '#2c2c2c', // Slightly lighter black section background
  hoverBackground: '#333333', // Hover effect background
};

// Slide-down animation for dropdowns
const slideDown = keyframes`
  from { max-height: 0; opacity: 0; }
  to { max-height: 500px; opacity: 1; }
`;

// Page wrapper styling
const PageWrapper = styled.div`
  background: ${colors.background};
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
`;

// Card for main options
const OptionCard = styled.div`
  background: ${colors.cardBackground};
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: ${colors.hoverBackground};
  }
`;

// Main option title with updated font color
const OptionTitle = styled.h3`
  color: ${colors.accent}; // Changed to yellow
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Dropdown container
const Dropdown = styled.div`
  background: ${colors.sectionBackground};
  border-radius: 8px;
  margin-top: 1rem;
  animation: ${slideDown} 0.3s ease-out;
  overflow: hidden;
`;

// Sub-options styling
const SubOption = styled.div`
  padding: 0.8rem 1.5rem;
  border-bottom: 1px solid #444; // Subtle border
  color: ${colors.text};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${colors.hoverBackground};
    color: ${colors.accent};
  }

  &:nth-child(odd) {
    background: #1f1f1f; // Slightly alternating row color
  }

  &:nth-child(even) {
    background: #2c2c2c;
  }

  &:last-child {
    border-bottom: none;
  }
`;

// Community and Help Center Section
const HelpCenter = styled.div`
  background: ${colors.cardBackground};
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  text-align: center;

  h3 {
    color: ${colors.text};
    margin-bottom: 1rem;
  }

  button {
    background: ${colors.accent};
    color: ${colors.background};
    border: none;
    border-radius: 8px;
    padding: 0.8rem 1.2rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: background 0.3s ease, transform 0.2s ease;

    &:hover {
      background: #ffd700; // Brighter yellow on hover
      transform: scale(1.05);
    }
  }
`;

function LearningDashboard() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const toggleDropdown = (option) => {
    setActiveDropdown(activeDropdown === option ? null : option);
  };

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <PageWrapper>
      {/* Main Options */}
      <OptionCard onClick={() => toggleDropdown('learningDashboard')}>
        <OptionTitle>
          Learning Dashboard
          <span>{activeDropdown === 'learningDashboard' ? '-' : '+'}</span>
        </OptionTitle>
        {activeDropdown === 'learningDashboard' && (
          <Dropdown>
            <SubOption onClick={() => handleNavigation('/recordings')}>Recordings</SubOption>
            <SubOption>Upcoming Sessions</SubOption>
            <SubOption>Assignments</SubOption>
            <SubOption>Quizzes</SubOption>
          </Dropdown>
        )}
      </OptionCard>

      <OptionCard onClick={() => toggleDropdown('coursesProgression')}>
        <OptionTitle>
          Courses Progression
          <span>{activeDropdown === 'coursesProgression' ? '-' : '+'}</span>
        </OptionTitle>
        {activeDropdown === 'coursesProgression' && (
          <Dropdown>
            <SubOption>Attendance</SubOption>
            <SubOption>Grades</SubOption>
            <SubOption>Your Progress</SubOption>
            <SubOption>Notes</SubOption>
          </Dropdown>
        )}
      </OptionCard>

      {/* Community and Help Center */}
      <HelpCenter>
        <h3>Community and Help Center</h3>
        <p>Need assistance? Connect with our support team or join the community.</p>
        <button>Get Help</button>
      </HelpCenter>
    </PageWrapper>
  );
}

export default LearningDashboard;
