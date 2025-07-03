// src/components/Footer.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Colors and Animations
const colors = {
  background: '#0a0a0a',
  primaryText: '#ffffff',
  accent: '#54a0ff',
  secondaryText: '#a0c4ff',
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const FooterContainer = styled.footer`
  background: ${colors.background};
  color: ${colors.primaryText};
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;

  @media (min-width: 768px) {
    padding: 4rem 3rem;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
  max-width: 1200px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

// Section for company description and logo
const CompanyInfo = styled.div`
  max-width: 300px;
  text-align: left;

  h2 {
    font-size: 1.8rem;
    color: ${colors.accent};
    margin-bottom: 1rem;
  }

  p {
    color: ${colors.secondaryText};
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

// Styled Navigation Links
const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    font-size: 1.5rem;
    color: ${colors.accent};
    margin-bottom: 1rem;
  }

  a {
    color: ${colors.primaryText};
    font-size: 1rem;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: ${colors.secondaryText};
    }
  }
`;

// Social Media Section
const SocialMedia = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h3 {
    font-size: 1.5rem;
    color: ${colors.accent};
    margin-bottom: 1rem;
  }

  div {
    display: flex;
    gap: 1rem;

    a {
      color: ${colors.primaryText};
      font-size: 1.5rem;
      transition: color 0.3s;

      &:hover {
        color: ${colors.secondaryText};
      }
    }
  }
`;

// Newsletter Signup Form
const Newsletter = styled.div`
  max-width: 300px;
  text-align: left;

  h3 {
    font-size: 1.5rem;
    color: ${colors.accent};
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  outline: none;
  background: #333;
  color: ${colors.primaryText};
`;

const Button = styled.button`
  padding: 0.8rem;
  font-size: 1rem;
  color: ${colors.primaryText};
  background: ${colors.accent};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${colors.secondaryText};
  }
`;

// Bottom Section
const FooterBottom = styled.div`
  margin-top: 2rem;
  width: 100%;
  border-top: 1px solid #333;
  padding-top: 1rem;
  font-size: 0.85rem;
  color: #a0a0a0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        {/* Company Information */}
        <CompanyInfo>
          <h2>Crafting Brain</h2>
          <p>
            Crafting Brain is committed to delivering advanced Data Science and AI training. Through expert mentorship and hands-on projects, we shape tomorrow's leaders in tech.
          </p>
        </CompanyInfo>

        {/* Navigation Links */}
        <NavLinks>
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </NavLinks>

        {/* Social Media Links */}
        <SocialMedia>
          <h3>Follow Us</h3>
          <div>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </SocialMedia>

        {/* Newsletter Signup */}
        <Newsletter>
          <h3>Subscribe</h3>
          <form>
            <Input type="email" placeholder="Your email" required />
            <Button type="submit">Subscribe</Button>
          </form>
        </Newsletter>
      </FooterContent>

      {/* Footer Bottom */}
      <FooterBottom>
        <p>&copy; 2024 Crafting Brain. All rights reserved.</p>
        <p>
          <Link to="/privacy-policy" style={{ color: '#a0c4ff', textDecoration: 'none' }}>Privacy Policy</Link> | 
          <Link to="/terms-of-service" style={{ color: '#a0c4ff', textDecoration: 'none' }}> Terms of Service</Link>
        </p>
      </FooterBottom>
    </FooterContainer>
  );
}

export default Footer;
