import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const colors = {
  background: "#0a0a0a",
  sectionBackground: "#181818",
  accent: "#ffe600",
  primaryText: "#ffffff",
  secondaryText: "#ffd966",
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  color: ${colors.primaryText};
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 500px;
  margin: 1rem auto;
  padding: 2rem;
  background: ${colors.sectionBackground};
  color: ${colors.primaryText};
  border-radius: 12px;
  box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.7);
  animation: ${fadeIn} 0.8s ease-out;
  text-align: center;

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
  font-size: 1.8rem;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.8rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
    font-size: 0.9rem;
    color: ${colors.secondaryText};

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }

  input {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #555;
    outline: none;
    background-color: #2c2c2c;
    color: ${colors.primaryText};

    @media (max-width: 480px) {
      padding: 8px;
      font-size: 0.9rem;
    }
  }
`;

const HorizontalInputGroup = styled.div`
  display: flex;
  gap: 1rem;

  > div {
    flex: 1;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #333;
  outline: none;
  background: #2c2c2c;
  color: ${colors.primaryText};
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0 0 10px ${colors.accent};
  }

  @media (max-width: 480px) {
    padding: 0.7rem;
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${colors.background};
  background: ${colors.accent};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #f5d700;
    transform: scale(1.05);
    box-shadow: 0px 4px 10px rgba(255, 230, 0, 0.6);
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.7rem;
  }
`;

const Footer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: ${colors.secondaryText};

  a {
    color: ${colors.accent};
    text-decoration: none;
  }
`;

const PopupLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;

  .spinner {
    width: 80px;
    height: 80px;
    border: 8px solid ${colors.primaryText};
    border-top: 8px solid ${colors.accent};
    border-radius: 50%;
    animation: ${spinAnimation} 1s linear infinite;
  }

  .loader-text {
    margin-top: 20px;
    font-size: 1.5rem;
    color: ${colors.accent};
    text-align: center;

    @media (max-width: 480px) {
      font-size: 1.2rem;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: ${colors.sectionBackground};
  color: ${colors.primaryText};
  padding: 2rem 3rem;
  border-radius: 12px;
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out;
  box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.7);

  h2 {
    color: ${colors.accent};
  }

  p {
    color: ${colors.primaryText};
    margin-bottom: 1.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    background: ${colors.accent};
    border: none;
    border-radius: 8px;
    color: ${colors.background};
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s ease;

    &:hover {
      background: #f5d700;
    }
  }
`;

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    setLoading(true);
    const payload = {
      firstname: firstName,
      lastname: lastName,
      dob: dateOfBirth,
      email: email,
      password: password,
      confirmpassword: confirmPassword,
    };

    try {
      const response = await fetch(
        "https://qlw95zx5ta.execute-api.eu-north-1.amazonaws.com/t/user/signup/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setShowModal(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        const data = await response.json();
        setErrorMessage(data.status || "Something went wrong. Try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      {loading && (
        <PopupLoader>
          <div className="spinner"></div>
          <div className="loader-text">Registering...</div>
        </PopupLoader>
      )}

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h2>Registration Successful</h2>
            <p>Welcome! Your account has been successfully created.</p>
            <button onClick={() => navigate("/login")}>Go to Login</button>
          </ModalContent>
        </ModalOverlay>
      )}

      <Container>
        <Title>Welcome to CraftingBrain</Title>
        <Form onSubmit={handleRegister}>
          {errorMessage && <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>}
          <HorizontalInputGroup>
            <InputGroup>
              <label>First Name</label>
              <Input
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <label>Last Name</label>
              <Input
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </InputGroup>
          </HorizontalInputGroup>
          <InputGroup>
            <label>Date of Birth</label>
            <Input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label>Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label>Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label>Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </InputGroup>
          <Button type="submit">Register</Button>
        </Form>
        <Footer>
          Already have an account? <a href="/login">Login</a>
        </Footer>
      </Container>
    </PageWrapper>
  );
};

export default RegisterPage;
