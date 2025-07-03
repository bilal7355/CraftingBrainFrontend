// src/components/Header.js
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FiSearch, FiMenu } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import Cookies from 'js-cookie';

// Colors and fonts
const colors = {
  background: '#0d0d0d',
  accent: '#ffe600',
  textLight: '#ffffff',
};
const fontFamily = "'Poppins', sans-serif";

// Animations
const letterPop = keyframes`
  0% { opacity: 0; transform: scale(0.3) rotate(-10deg); color: ${colors.textLight}; }
  50% { opacity: 0.5; transform: scale(1.3) rotate(10deg); color: ${colors.accent}; }
  100% { opacity: 1; transform: scale(1) rotate(0); color: ${colors.textLight}; }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Header styling
const HeaderContainer = styled.header`
  width: 95.5%;
  padding: 1rem 2rem;
  background: ${colors.background};
  color: ${colors.textLight};
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: ${fontFamily};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;  
  font-weight: bold;
  display: flex;
  gap: 0.1rem;
  cursor: pointer;

  span {
    display: inline-block;
    animation: ${letterPop} 0.7s ease forwards;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;

  a {
    color: ${colors.textLight};
    font-size: 1rem;
    font-weight: 500;
    position: relative;
    text-decoration: none;
    padding: 0.5rem;
    transition: color 0.3s ease;

    &:hover {
      color: ${colors.accent};
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: ${colors.background};
  padding: 0.3rem 1rem;
  border-radius: 20px;
  transition: width 0.4s ease;
  width: ${({ isOpen }) => (isOpen ? '200px' : '35px')};
  cursor: pointer;
  border: 1px solid ${colors.accent};

  input {
    background: transparent;
    border: none;
    outline: none;
    color: ${colors.textLight};
    width: ${({ isOpen }) => (isOpen ? '150px' : '0')};
    transition: width 0.4s ease;
    font-size: 1rem;
    margin-left: ${({ isOpen }) => (isOpen ? '10px' : '0')};
  }

  .search-icon {
    color: ${colors.textLight};
  }

  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? '180px' : '30px')};
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 1.4rem;

  .icon {
    color: ${colors.textLight};
    cursor: pointer;
    transition: color 0.3s ease, transform 0.3s ease;

    &:hover {
      color: ${colors.accent};
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
    font-size: 1.2rem;
  }
`;

const Loader = styled.div`
  border: 2px solid ${colors.textLight};
  border-top: 2px solid ${colors.accent};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
`;

const MenuToggle = styled(FiMenu)`
  display: none;
  color: ${colors.textLight};
  cursor: pointer;
  font-size: 1.8rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 60px;
  right: 20px;
  background: ${colors.background};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.7);
  gap: 1rem;

  a {
    color: ${colors.textLight};
    text-decoration: none;
    font-size: 1rem;

    &:hover {
      color: ${colors.accent};
    }
  }
`;

// Header component
function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added for loader
  const craftingBrainText = "Crafting Brain".split("");

  // Function to handle account icon click and call the auto-login API
  

  const handleLinkClick = (targetPath) => {
    if (pathname === targetPath) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <HeaderContainer>
      <Logo>
        {craftingBrainText.map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            {char}
          </span>
        ))}
      </Logo>

      <Nav>
        <Link to="/" onClick={() => handleLinkClick("/")}>Home</Link>
        <Link to="/courses" onClick={() => handleLinkClick("/courses")}>Courses</Link>
        <Link to="/about" onClick={() => handleLinkClick("/about")}>About</Link>
        <Link to="/contact" onClick={() => handleLinkClick("/contact")}>Contact</Link>
      </Nav>

      <Actions>
        <SearchBar isOpen={isSearchOpen} onClick={() => setSearchOpen(!isSearchOpen)}>
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            onBlur={() => setSearchOpen(false)}
          />
        </SearchBar>
       
      </Actions>

      <MenuToggle onClick={() => setMenuOpen(!isMenuOpen)} />

      <MobileMenu isOpen={isMenuOpen}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/courses" onClick={() => setMenuOpen(false)}>Courses</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
      </MobileMenu>
    </HeaderContainer>
  );
}

export default Header;