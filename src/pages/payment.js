import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const colors = {
  background: "#0a0a0a",
  sectionBackground: "#181818",
  accent: "#ffe600",
  primaryText: "#ffffff",
  secondaryText: "#ffd966",
  success: "#28a745",
  error: "#dc3545",
};

// Keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled components
const Popup = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ $success }) => ($success ? colors.success : colors.error)};
  color: ${colors.primaryText};
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  animation: ${({ $show }) => ($show ? fadeIn : fadeOut)} 0.5s ease-out;
  display: ${({ $show }) => ($show ? "block" : "none")};
  z-index: 1000;
`;

const Loader = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid ${colors.accent};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${rotate} 1s linear infinite;
  margin: 0 auto 1rem;
`;

const Container = styled.div`
  width: 40%;
  margin: 2rem auto;
  padding: 3rem;
  background: ${colors.sectionBackground};
  color: ${colors.primaryText};
  border-radius: 12px;
  box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    width: 90%;
    padding: 2rem;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: ${colors.accent};
  font-size: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Input = styled.input`
  padding: 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #333;
  outline: none;
  background: #2c2c2c;
  color: ${colors.primaryText};
  transition: all 0.3s ease;

  &:focus {
    border: 1px solid ${colors.accent};
    background: #1c1c1c;
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.7rem;
  }
`;

const Button = styled.button`
  padding: 0.7rem;
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

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.6rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
    font-size: 0.9rem;
    color: ${colors.secondaryText};

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }

    @media (max-width: 480px) {
      font-size: 0.7rem;
    }
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

const QRWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;

  img {
    width: 200px;

    @media (max-width: 768px) {
      width: 150px;
    }

    @media (max-width: 480px) {
      width: 120px;
    }
  }

  p {
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }
`;

const Footer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: ${colors.secondaryText};

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Poppins', sans-serif;
  color: ${colors.primaryText};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ScanAndPayPage = () => {
  // Form Data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    amount: "",
    transaction_id: "",
    date: "",
  });

  // Popup and Loader states
  const [popup, setPopup] = useState({ show: false, success: false, message: "" });
  const [loading, setLoading] = useState(false);

  // Payment method selection (QR by default)
  const [paymentMethod, setPaymentMethod] = useState("qr");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { fullName, email, phoneNumber, amount, transaction_id, date } = formData;

    // Basic validation
    if (!fullName || !email || !phoneNumber || !amount || !transaction_id || !date) {
      setPopup({
        show: true,
        success: false,
        message: "All fields are required. Please fill in all the details.",
      });
      setLoading(false);
      return;
    }

    // Prepare data for backend
    const payment_data = {
      fullName,
      email,
      phoneNumber,
      amount,
      transaction_id,
      date,
      paymentMethod,
    };

    console.log("[DEBUG] Sending the following payment data:", payment_data);

    try {
      const response = await fetch(
        "https://qlw95zx5ta.execute-api.eu-north-1.amazonaws.com/t/user/paymentprocess/payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payment_data),
        }
      );

      // Check for HTTP errors (e.g. 500, 404, etc.)
      if (!response.ok) {
        const errorText = await response.text();
        console.error("[DEBUG] Server returned an error response:", response.status, errorText);
        throw new Error(
          `Server Error (${response.status}): ${
            response.statusText
          }\nDetails: ${errorText || "No additional error text"}`
        );
      }

      // Parse JSON response
      const result = await response.json();
      console.log("[DEBUG] Server response JSON:", result);

      // Check if the backend signals success or failure
      if (result.status === "success") {
        setPopup({
          show: true,
          success: true,
          message: result.message || "Payment submitted successfully!",
        });
      } else {
        setPopup({
          show: true,
          success: false,
          message: result.message || "Failed to process payment.",
        });
      }
    } catch (error) {
      console.error("[DEBUG] Error submitting form:", error);
      setPopup({
        show: true,
        success: false,
        // Show the actual error message if available
        message: error.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
      // Hide popup after 3 seconds
      setTimeout(() => setPopup({ show: false, success: false, message: "" }), 3000);
    }
  };

  return (
    <PageWrapper>
      {/* Popup */}
      {popup.show && (
        <Popup $success={popup.success} $show={popup.show}>
          {popup.message}
        </Popup>
      )}

      <Container>
        <Title>Payment Collection</Title>

        {/* Payment Method Selection */}
        <InputGroup>
          <label>Choose Payment Method</label>
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
            <div>
              <input
                type="radio"
                id="qrMethod"
                name="paymentMethod"
                value="qr"
                checked={paymentMethod === "qr"}
                onChange={() => setPaymentMethod("qr")}
              />
              <label htmlFor="qrMethod" style={{ marginLeft: "0.3rem" }}>
                QR Code
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="bankMethod"
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
              />
              <label htmlFor="bankMethod" style={{ marginLeft: "0.3rem" }}>
                Direct Bank Transfer
              </label>
            </div>
          </div>
        </InputGroup>

        {/* If user selects QR Code */}
        {paymentMethod === "qr" && (
          <QRWrapper>
            <img
              src={require("../assets/PaymentQRCode.jpg")}
              type="image/png"
              alt="QR Code for Payment"
              width="200"
            />
            <p>Scan and Pay</p>
            <p>Fill in the details below after payment</p>
          </QRWrapper>
        )}

        {/* If user selects Direct Bank Transfer */}
        {paymentMethod === "bank" && (
          <div
            style={{
              marginBottom: "2rem",
              border: "1px solid #555",
              borderRadius: "8px",
              padding: "1rem",
              background: "#2c2c2c",
            }}
          >
            <p style={{ color: colors.secondaryText }}>
              <strong style={{ color: colors.primaryText }}>Account Name:</strong> BRAINCRAFT AI (OPC) PRIVATE LIMITED
            </p>
            <p style={{ color: colors.secondaryText }}>
              <strong style={{ color: colors.primaryText }}>Account Number:</strong> 10226606034
            </p>
            <p style={{ color: colors.secondaryText }}>
              <strong style={{ color: colors.primaryText }}>IFSC:</strong> IDFB0080231
            </p>
            <p style={{ color: colors.secondaryText }}>
              <strong style={{ color: colors.primaryText }}>Bank Name:</strong> IDFC FIRST
            </p>
            <p style={{ marginTop: "1rem", color: "#f0ad4e" }}>
              <em>
                *Note: After adding the account as a beneficiary, you may have to wait for 24 hours
                before you can transfer the amount.*
              </em>
            </p>
          </div>
        )}

        {/* Loader when submitting */}
        {loading && <Loader />}

        {/* Payment Form */}
        <Form onSubmit={handleFormSubmit}>
          {["fullName", "email", "phoneNumber", "amount", "transaction_id", "date"].map((field) => (
            <InputGroup key={field}>
              <label htmlFor={field}>
                {field
                  .replace(/_/g, " ")
                  .replace(/^./, (str) => str.toUpperCase())}
              </label>
              <Input
                type={field === "email" ? "email" : field === "date" ? "date" : "text"}
                id={field}
                name={field}
                placeholder={
                  field === "date"
                    ? "Select the date"
                    : `Enter your ${field.replace(/_/g, " ")}`
                }
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </InputGroup>
          ))}

          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Form>

        {/* Footer */}
        <Footer>
          <p>Bill will be sent to your mail.</p>
          <p>&copy; 2024 Payment Platform </p>
        </Footer>
      </Container>
    </PageWrapper>
  );
};

export default ScanAndPayPage;
