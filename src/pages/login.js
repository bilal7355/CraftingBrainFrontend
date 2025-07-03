import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie to manage cookies

const colors = {
  background: "#0a0a0a",
  sectionBackground: "#181818",
  accent: "#ffe600", // Yellow accent color
  primaryText: "#ffffff",
  secondaryText: "#ffd966", // Light yellow for secondary text
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  width: 250px;
  margin: 2rem auto;
  padding: 3rem;
  background: ${colors.sectionBackground};
  color: ${colors.primaryText};
  border-radius: 12px;
  box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.7);
  animation: ${fadeIn} 0.8s ease-out;
`;

const Title = styled.h1`
  text-align: center;
  color: ${colors.accent};
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
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
`;

const Button = styled.button`
  padding: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${colors.background};
  background: ${colors.accent};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #ffe600;
    transform: scale(1.05);
    box-shadow: 0px 4px 10px rgba(84, 160, 255, 0.6);
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
    font-size: 0.9rem;
    color: ${colors.secondaryText};
  }

  input {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #555;
    outline: none;
    background-color: #2c2c2c;
    color: ${colors.primaryText};
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input[type="checkbox"] {
    appearance: none;
    width: 18px;
    height: 18px;
    background: #2c2c2c;
    border: 1px solid #555;
    border-radius: 4px;
    cursor: pointer;
    position: relative;

    &:checked {
      background: ${colors.accent};
      border-color: ${colors.accent};
    }

    &:checked::after {
      content: "✔";
      color: ${colors.background};
      font-size: 12px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  label {
    font-size: 0.9rem;
    color: ${colors.secondaryText};
    cursor: pointer;
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

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: "Poppins", sans-serif;
  color: ${colors.primaryText};
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
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember me"
  const [error, setError] = useState(""); // To display errors if any
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For navigation

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Clear previous errors
    setLoading(true); // Show loader

    try {
      const url = "https://qlw95zx5ta.execute-api.eu-north-1.amazonaws.com/t/user/login/authenticate";
      const payload = {
        email: email,
        password: password,
        remember_me: rememberMe, // Send remember_me to backend
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Convert payload to JSON string
      });

      const data = await response.json();

      // Parse the body field since it’s a JSON string
      const bodyData = JSON.parse(data.body);

      if (bodyData.message === "Login successful") {
        // Store the access_token in cookies
        Cookies.set("auth_token", bodyData.access_token, { expires: 7 });
        navigate("/dashboard");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <PageWrapper>
      {loading && (
        <PopupLoader>
          <div className="spinner"></div>
          <div className="loader-text">Authenticating...</div>
        </PopupLoader>
      )}
      <Container>
        <Title>User Login</Title>
        <Form onSubmit={handleLogin}>
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
          <CheckboxGroup>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label>Remember me</label>
          </CheckboxGroup>
          {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error */}
          <Button type="submit">Login</Button>
        </Form>
        <Footer>
          <span>Don't have an account? </span>
          <Link to="/Register">SignUp</Link>
        </Footer>
      </Container>
    </PageWrapper>
  );
};

export default LoginPage;