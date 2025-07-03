import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Helmet } from "react-helmet";
import { FaCalendarAlt, FaClock, FaLaptopCode, FaAward, FaUserGraduate, FaChevronDown, FaChevronUp } from "react-icons/fa";
import trainerPhoto from "../assets/trainer.jpg";

const colors = {
  gradientBg: `radial-gradient(circle at 20% 20%, #0d0033 0%, #14003a 40%, #260057 80%, #00081c 100%)`,
  overlay: "rgba(0, 0, 0, 0.7)",
  cardBg: "rgba(25, 0, 64, 0.6)",
  accent: "#ffdf00",
  textLight: "#ffffff",
  textSecondary: "#cfcfcf",
  hover: "rgba(255, 255, 255, 0.1)",
  error: "#ff4c4c",
  cta: "#00C4B4",
};

// Animations
const twinkle = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;
const drift = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-2000px); }
`;
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const CosmicBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -100;
  background: ${colors.gradientBg};
`;

const StarsLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2000px;
  background-image: radial-gradient(2px 2px at 50% 50%, #fff, transparent 40%);
  background-repeat: repeat;
  animation: ${drift} 60s linear infinite;
  opacity: 0.5;

  &:nth-child(2) {
    animation-duration: 80s;
    opacity: 0.3;
    transform: translateY(0) scale(1.3);
  }
`;

const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  color: ${colors.textLight};
  font-family: 'Poppins', sans-serif;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  padding-bottom: 4rem;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 5rem 1rem 3rem;
  animation: ${fadeIn} 1s ease-in-out;

  h1 {
    font-size: 3.2rem;
    margin: 0;
    background: -webkit-linear-gradient(#fff, ${colors.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.35);
    animation: ${twinkle} 2s infinite;
  }

  p {
    margin-top: 1rem;
    color: ${colors.textSecondary};
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.5;
    font-size: 1.05rem;
  }

  @media (max-width: 768px) {
    h1 { font-size: 2.4rem; }
    p { font-size: 0.95rem; }
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background: ${colors.cta};
  color: ${colors.textLight};
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${twinkle} 2s infinite;

  &:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 4px 15px rgba(0, 196, 180, 0.5);
  }
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 1rem;
  animation: ${fadeIn} 0.8s ease-in-out;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: ${colors.accent};
    text-align: center;
  }

  p {
    color: ${colors.textSecondary};
    line-height: 1.6;
    font-size: 0.95rem;
  }
`;

const ScheduleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ScheduleCard = styled.div`
  background: ${colors.cardBg};
  backdrop-filter: blur(4px);
  padding: 1.4rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.05);
  transition: transform 0.4s;

  &:hover {
    transform: translateY(-8px) scale(1.04);
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.2);
  }

  svg {
    font-size: 2rem;
    color: ${colors.accent};
    margin-bottom: 0.8rem;
    animation: ${twinkle} 2s infinite;
  }

  h3 { margin: 0; color: ${colors.textLight}; }
  p { margin-top: 0.5rem; }
`;

const AgendaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const AgendaCard = styled.div`
  background: ${colors.cardBg};
  padding: 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(4px);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.05);
  transition: transform 0.4s, box-shadow 0.4s;

  &:hover {
    transform: translateY(-8px) scale(1.04);
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.2);
  }

  h4 { color: ${colors.accent}; margin: 0 0 0.6rem; }

  ul {
    margin: 0;
    padding-left: 1.2rem;
    list-style: square;

    li { margin: 0.4rem 0; color: ${colors.textSecondary}; }
  }
`;

const HostWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  margin-top: 2rem;
  justify-content: center; /* Center the content for better alignment */

  @media (min-width: 768px) {
    justify-content: space-between; /* Align image and bio side by side on larger screens */
  }
`;

const HostImage = styled.img`
  flex: 0 0 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 10px rgba(0, 196, 180, 0.5);
  border: 3px solid ${colors.cta};

  @media (max-width: 767px) {
    margin: 0 auto; /* Center the image on smaller screens */
  }
`;

const HostBio = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 600px; /* Prevent the bio from stretching too wide */
  text-align: left;

  @media (max-width: 767px) {
    text-align: center; /* Center the bio text on smaller screens */
  }

  h3 { 
    color: ${colors.textLight}; 
    margin: 0.2rem 0 0.5rem; 
    animation: ${twinkle} 2s infinite; 
  }
  p { font-size: 0.9rem; }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.2rem;
  margin-top: 2rem;
`;

const TestimonialCard = styled.div`
  background: ${colors.cardBg};
  padding: 1.4rem;
  border-radius: 12px;
  position: relative;
  backdrop-filter: blur(4px);

  &:before {
    content: "\"";
    position: absolute;
    top: -20px;
    left: 20px;
    font-size: 5rem;
    color: ${colors.accent};
    opacity: 0.15;
  }

  p { font-style: italic; color: ${colors.textSecondary}; }
  span { display: block; margin-top: 0.8rem; color: ${colors.accent}; font-weight: 600; }
`;

const FAQItem = styled.div.withConfig({
  shouldForwardProp: (prop) => !['open'].includes(prop),
})`
  background: ${colors.cardBg};
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover { background: rgba(255, 255, 255, 0.07); }

  h4 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    color: ${colors.textLight};
  }

  p {
    margin-top: 0.6rem;
    display: ${({ open }) => (open ? "block" : "none")};
  }
`;

const FormWrapper = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: ${colors.cardBg};
  backdrop-filter: blur(4px);
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.05);
`;

const FormField = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid ${colors.cta};
  background: ${colors.cardBg};
  color: ${colors.textLight};
  font-size: 0.95rem;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: ${colors.accent};
    box-shadow: 0 0 8px ${colors.accent};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid ${colors.cta};
  background: ${colors.cardBg};
  color: ${colors.textLight};
  font-size: 0.95rem;
  resize: vertical;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: ${colors.accent};
    box-shadow: 0 0 8px ${colors.accent};
  }
`;

const ErrorText = styled.p`
  color: ${colors.error};
  font-size: 0.85rem;
  margin-top: 0.3rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  background: ${colors.cta};
  color: ${colors.textLight};
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${twinkle} 2s infinite;

  &:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 4px 15px rgba(0, 196, 180, 0.5);
  }
`;

const StatusMessage = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: ${colors.textSecondary};
  font-size: 1rem;
`;

const StickyCTAButton = styled.a`
  display: none;
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  background: ${colors.cta};
  color: ${colors.textLight};
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 0 15px rgba(0, 196, 180, 0.5);
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${twinkle} 2s infinite;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 25px rgba(0, 196, 180, 0.7);
  }

  @media (max-width: 640px) {
    display: block;
  }
`;

function Workshop() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    city: '',
    experience: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [errors, setErrors] = useState({});

  const toggleFAQ = (i) => setOpenFAQ(openFAQ === i ? null : i);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone) newErrors.phone = 'Phone Number is required';
    if (!formData.role) newErrors.role = 'Current Role is required';
    if (!formData.city) newErrors.city = 'City is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setFormStatus('Submitting...');
    try {
      const response = await fetch('https://qlw95zx5ta.execute-api.eu-north-1.amazonaws.com/t/user/workshopsignup/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormStatus('Registration successful!');
        setFormData({ fullName: '', email: '', phone: '', role: '', city: '', experience: '' });
      } else {
        setFormStatus('Error submitting form. Please try again.');
      }
    } catch (error) {
      setFormStatus('Error submitting form. Please try again.');
    }
  };

  const faqs = [
    { q: "Who is this workshop for?", a: "Aspiring Data Scientists, AI enthusiasts, developers, and professionals. No prior AI experience needed." },
    { q: "What do I need to attend?", a: "A computer, stable internet, and a passion for AI. Basic Python familiarity helps but isn’t mandatory." },
    { q: "Will I receive a certificate?", a: "Yes! Complete both days to earn a Joint Certificate of Participation." },
    { q: "Are there prerequisites?", a: "None. We start from fundamentals and progress to advanced topics." },
    { q: "Will the sessions be recorded?", a: "Yes, recordings will be available for a limited time post-workshop." }
  ];

  const testimonials = [
    { text: "This workshop transformed my understanding of Agentic AI. The hands-on approach was phenomenal!", name: "Mehnaz Shaikh, Aspiring Data Scientist" },
    { text: "The live project demo was a game-changer. I could see AI’s real-world potential!", name: "Bilal Ahmad, Software Developer" },
    { text: "Aman’s teaching style is exceptional—clear, engaging, and motivating!", name: "Vivek, Student" },
    { text: "A truly valuable experience with practical insights and projects.", name: "Rohan, Tech Entrepreneur" },
    { text: "It gave me confidence to dive deeper into AI and explore possibilities.", name: "Shiwang, AI Enthusiast" }
  ];

  return (
    <>
      <Helmet>
        <title>Mastering the Future: Agentic AI Workshop</title>
        <meta name="description" content="Join our 2-day live workshop on real-world Agentic AI applications with hands-on projects and expert mentorship." />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <CosmicBackground>
        <StarsLayer />
        <StarsLayer />
      </CosmicBackground>
      <PageWrapper>
        <MainContent>
          {/* Hero */}
          <HeroSection>
            <h1>Mastering the Future: Real-World Applications of Agentic AI</h1>
            <p>Unlock the power of Agentic AI with hands-on projects and real-time insights.</p>
            <CTAButton href="#register" aria-label="Register for the Agentic AI Workshop">Register Now</CTAButton>
          </HeroSection>

          {/* Overview */}
          <Section>
            <h2>Workshop Overview</h2>
            <p>Dive into the transformative world of Agentic AI through immersive, live sessions blending theory and practical demos. Gain real-time insights into autonomous AI systems shaping industries.</p>
          </Section>

          {/* Schedule */}
          <Section>
            <h2>Schedule & Format</h2>
            <ScheduleGrid>
              <ScheduleCard><FaCalendarAlt /><h3>Thursday, May 29 – Friday, May 30, 2025</h3></ScheduleCard>
              <ScheduleCard><FaClock /><h3>6:00 PM – 7:30 PM IST</h3></ScheduleCard>
              <ScheduleCard><FaLaptopCode /><h3>Live Online</h3><p>Google Meet/Zoom</p></ScheduleCard>
              <ScheduleCard><FaUserGraduate /><h3>2 Days (3h total)</h3></ScheduleCard>
            </ScheduleGrid>
          </Section>

          {/* Agenda */}
          <Section>
            <h2>What You Will Learn</h2>
            <AgendaGrid>
              <AgendaCard>
                <h4>Day 1: Foundations & Fundamentals</h4>
                <ul>
                  <li>Evolution & core principles of AI</li>
                  <li>LLMs & GPT model overview</li>
                  <li>Agentic AI concepts</li>
                  <li>Industry case studies</li>
                </ul>
              </AgendaCard>
              <AgendaCard>
                <h4>Day 2: Projects & Future Scope</h4>
                <ul>
                  <li>Build a feedback Agentic system</li>
                  <li>Multi-agent AI frameworks</li>
                  <li>Emerging trends & ethics</li>
                  <li>Q&A & certification</li>
                </ul>
              </AgendaCard>
            </AgendaGrid>
          </Section>

          {/* Host */}
          <Section>
            <h2>Meet Your Instructor</h2>
            <HostWrapper>
              <HostImage src={trainerPhoto} alt="Aman Kasaudhan, Workshop Instructor" />
              <HostBio>
                <h3>Aman Kasaudhan</h3>
                <p>A seasoned Data Scientist with over 6 years of expertise in AI, NLP, and Agentic AI systems. Aman has trained over 3,000 students, delivering impactful learning experiences. Proficient in AWS, Azure, and Google Cloud, he excels at mentoring hands-on projects and breaking down complex concepts into actionable insights.</p>
              </HostBio>
            </HostWrapper>
          </Section>

          {/* Certification */}
          <Section>
            <h2>Certification & Perks</h2>
            <ScheduleGrid>
              <ScheduleCard><FaAward /><h3>Joint Certificate</h3><p>Showcase your Agentic AI expertise.</p></ScheduleCard>
              <ScheduleCard><FaUserGraduate /><h3>Scholarship</h3><p>Top performers eligible for exclusive internship scholarship.</p></ScheduleCard>
            </ScheduleGrid>
          </Section>

          {/* Testimonials */}
          <Section>
            <h2>Testimonials</h2>
            <TestimonialsGrid>
              {testimonials.map((t, i) => (
                <TestimonialCard key={i}>
                  <p>{t.text}</p>
                  <span>— {t.name}</span>
                </TestimonialCard>
              ))}
            </TestimonialsGrid>
          </Section>

          {/* FAQs */}
          <Section>
            <h2>FAQs</h2>
            {faqs.map((f, i) => (
              <FAQItem key={i} open={openFAQ === i} onClick={() => toggleFAQ(i)}>
                <h4>{f.q} {openFAQ === i ? <FaChevronUp /> : <FaChevronDown />}</h4>
                <p>{f.a}</p>
              </FAQItem>
            ))}
          </Section>

          {/* Registration */}
          <Section id="register">
            <h2>Secure Your Spot</h2>
            <p style={{ textAlign: 'center', marginBottom: '1rem' }}>Limited seats available! Fill out the form to reserve your place.</p>
            <FormWrapper>
              <form onSubmit={handleSubmit}>
                <FormField>
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    aria-label="Full Name"
                  />
                  {errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}
                </FormField>
                <FormField>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    aria-label="Email Address"
                  />
                  {errors.email && <ErrorText>{errors.email}</ErrorText>}
                </FormField>
                <FormField>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number (with country code)"
                    aria-label="Phone Number"
                  />
                  {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                </FormField>
                <FormField>
                  <Input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="Current Role (e.g., Student, Professional)"
                    aria-label="Current Role"
                  />
                  {errors.role && <ErrorText>{errors.role}</ErrorText>}
                </FormField>
                <FormField>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City/Country"
                    aria-label="City/Country"
                  />
                  {errors.city && <ErrorText>{errors.city}</ErrorText>}
                </FormField>
                <FormField>
                  <Textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Prior Experience with AI or Programming (Optional)"
                    rows="4"
                    aria-label="Prior Experience with AI or Programming"
                  />
                </FormField>
                <SubmitButton type="submit" aria-label="Submit Registration Form">Submit Registration</SubmitButton>
                {formStatus && <StatusMessage>{formStatus}</StatusMessage>}
              </form>
            </FormWrapper>
          </Section>
        </MainContent>
        <StickyCTAButton href="#register" aria-label="Register for the Agentic AI Workshop">Register</StickyCTAButton>
      </PageWrapper>
    </>
  );
}

export default Workshop;