import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Footer from '../components/Footer';

// Theme colors
const colors = {
  background: '#0a0a0a',
  sectionBackground: '#181818',
  accent: '#54a0ff',
  primaryText: '#ffffff',
  secondaryText: '#a0c4ff',
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const glowEffect = keyframes`
  0% { box-shadow: 0 0 5px ${colors.accent}; }
  50% { box-shadow: 0 0 15px ${colors.accent}; }
  100% { box-shadow: 0 0 5px ${colors.accent}; }
`;

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Poppins', sans-serif;
  padding: 1rem;
`;

const Container = styled.div`
  width: 90%;
  max-width: 500px;
  margin: 2rem auto; // Center container vertically and horizontally
  padding: 2rem;
  background: ${colors.sectionBackground};
  color: ${colors.primaryText};
  border-radius: 12px;
  box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.7);
  animation: ${fadeIn} 0.8s ease-out;

  display: flex;
  flex-direction: column;
  align-items: center; // Center align form content horizontally
  justify-content: center; // Center content vertically within the container

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: ${colors.accent};
  font-size: 2rem;
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 1s ease-out forwards;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Form = styled.form`
  width: 100%; // Ensure the form spans the container width
  display: flex;
  flex-direction: column;
  gap: 1rem; // Add spacing between form fields

  /* Remove default padding/margins to ensure proper alignment */
  margin: 0;
  padding: 0;
`;

const Input = styled.input`
  width: calc(100% - 20px); // Fix alignment issues
  margin: 0 auto; // Center horizontally
  padding: 0.9rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #333;
  outline: none;
  background: #2c2c2c;
  color: ${colors.primaryText};
  transition: box-shadow 0.3s ease;

  &:focus {
    animation: ${glowEffect} 1.5s infinite;
  }

  @media (max-width: 480px) {
    padding: 0.7rem;
    font-size: 0.9rem;
  }
`;

const TextArea = styled.textarea`
  width: calc(100% - 20px); // Fix alignment issues
  margin: 0 auto; // Center horizontally
  padding: 0.9rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #333;
  outline: none;
  background: #2c2c2c;
  color: ${colors.primaryText};
  resize: vertical;
  transition: box-shadow 0.3s ease;

  &:focus {
    animation: ${glowEffect} 1.5s infinite;
  }

  @media (max-width: 480px) {
    padding: 0.7rem;
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  width: calc(100% - 20px); // Fix alignment issues
  margin: 0 auto; // Center horizontally
  padding: 0.9rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${colors.background};
  background: ${colors.accent};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  animation: ${fadeIn} 1.2s ease forwards;

  &:hover {
    background: #3b82d1;
    transform: scale(1.05);
    box-shadow: 0px 4px 10px rgba(84, 160, 255, 0.6);
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 1rem;
  }
`;

const ResponseMessage = styled.p`
  margin-top: 1.5rem;
  font-size: 1rem;
  text-align: center;
  color: ${(props) => (props.success ? '#4CAF50' : '#f44336')};
  animation: ${fadeIn} 0.8s ease-out forwards;
`;

// Component
function Contact({ showFooter = true }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResponseMessage("Thank you! We'll get back to you soon.");
    setIsSuccess(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <PageWrapper>
      <Container>
        <Title>Contact Us</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextArea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></TextArea>
          <Button type="submit">Send Message</Button>
        </Form>
        {responseMessage && (
          <ResponseMessage success={isSuccess}>{responseMessage}</ResponseMessage>
        )}
      </Container>
      {showFooter && <Footer />}
    </PageWrapper>
  );
}

export default Contact;
