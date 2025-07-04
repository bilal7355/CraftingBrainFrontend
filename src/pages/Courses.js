// src/pages/Course.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom'; 
import BlogCard from "../components/cards";
import "./Courses.css";

// Theme colors and gradients
const colors = {
  background: '#0a0a0a',
  gradient: 'linear-gradient(135deg, #54a0ff, #1e1e1e)',
  accent: '#ffcb6b',
  text: '#f5f5f5',
  title: '#ffffff',
  sectionBackground: '#181818',
};

// Parallax and fade-in animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const parallaxEffect = keyframes`
  from { background-position: 50% 50%; }
  to { background-position: 50% 60%; }
`;

// Styled components
const PageWrapper = styled.div`
  background: ${colors.background};
  color: ${colors.text};
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1.5s ease-out;
`;

const GradientBanner = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 300px;
  background: ${colors.gradient};
  border-radius: 12px;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.title};
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.7);
  animation: ${parallaxEffect} 15s linear infinite alternate;
`;

// YouTube Video Embed Component


const YouTubeVideo = styled.div`
  width: 100%;
  max-width: 900px;
  aspect-ratio: 16 / 9;
  margin-bottom: 2rem;
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 12px;
    box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.7);
  }
`;

const Section = styled.section`
  width: 100%;
  max-width: 900px;
  background: ${colors.sectionBackground};
  border-radius: 12px;
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.7);
  transition: all 0.3s ease-in-out;
  &:hover {
    background: #242424;
    transform: translateY(-5px);
  }
  animation: ${fadeIn} 1s ease-out forwards;
`;

const SectionTitle = styled.h2`
  color: ${colors.accent};
  font-size: 1.8rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${colors.accent};
  padding-bottom: 0.5rem;
`;

const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 1rem;

  li {
    margin-bottom: 0.7rem;
    font-weight: 500;
    &:before {
      content: '➤ ';
      color: ${colors.accent};
    }
  }
`;

const Accordion = styled.div`
  background: #222;
  color: ${colors.text};
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  overflow: hidden;
  transition: background 0.3s ease;
`;

const AccordionHeader = styled.div`
  padding: 1.2rem;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s ease;
  
  &:hover {
    background: ${colors.accent};
    color: ${colors.background};
  }
`;

const AccordionContent = styled.div`
  padding: 1.2rem;
  background: #333;
  font-size: 1rem;
  max-height: ${({ expanded }) => (expanded ? '800px' : '0')};
  overflow: hidden;
  transition: max-height 0.5s ease;
`;

const SubModule = styled.div`
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const SubModuleTitle = styled.h4`
  color: ${colors.accent};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const CTAButton = styled.button`
  background: ${colors.accent};
  color: ${colors.background};
  font-size: 1.3rem;
  font-weight: bold;
  padding: 0.9rem 1.6rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 2.5rem;
  box-shadow: 0px 4px 15px rgba(255, 203, 107, 0.5);
  transition: background 0.3s ease, transform 0.3s ease;
  &:hover {
    background: #e5b464;
    transform: translateY(-3px) scale(1.05);
  }
`;

function Course({ showFooter = true }) {
  const [expandedModules, setExpandedModules] = useState([]);
  const navigate = useNavigate(); // Initialize the navigation hook

  const toggleModule = (index) => {
    setExpandedModules((prevExpanded) =>
      prevExpanded.includes(index)
        ? prevExpanded.filter((i) => i !== index)
        : [...prevExpanded, index]
    );
  };

  const handleEnrollNow = () => {
    navigate('/payment'); // Redirect to the payment page
  };

  return (

    <PageWrapper>
      <div className="card-container">
      <BlogCard
        image="https://via.placeholder.com/300x180"
        title="Top Graphic Design Courses Online"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium venenatis sed finibus orci imperdiet."
        author="SamuyI Joshi"
        role="Graphics Designer"
        date="15 April, 2024"
        authorImage="https://via.placeholder.com/35"
      />

      <BlogCard
        image="https://via.placeholder.com/300x180"
        title="Best Web Design Courses Online in 2021"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium venenatis sed finibus orci imperdiet."
        author="Devid Millar"
        role="Web Developer"
        date="15 April, 2024"
        authorImage="https://via.placeholder.com/35"
      />

      <BlogCard
        image="https://via.placeholder.com/300x180"
        title="Android App Development Courses within 30 days"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium venenatis sed finibus orci imperdiet."
        author="Rulius Hurry"
        role="App Developer"
        date="15 April, 2024"
        authorImage="https://via.placeholder.com/35"
      />
      <BlogCard
        image="https://via.placeholder.com/300x180"
        title="Android App Development Courses within 30 days"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium venenatis sed finibus orci imperdiet."
        author="Rulius Hurry"
        role="App Developer"
        date="15 April, 2024"
        authorImage="https://via.placeholder.com/35"
      />
    </div>
    <div className="card-container">
      <BlogCard
        image="https://via.placeholder.com/300x180"
        title="Top Graphic Design Courses Online"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium venenatis sed finibus orci imperdiet."
        author="SamuyI Joshi"
        role="Graphics Designer"
        date="15 April, 2024"
        authorImage="https://via.placeholder.com/35"
      />

      <BlogCard
        image="https://via.placeholder.com/300x180"
        title="Best Web Design Courses Online in 2021"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium venenatis sed finibus orci imperdiet."
        author="Devid Millar"
        role="Web Developer"
        date="15 April, 2024"
        authorImage="https://via.placeholder.com/35"
      />

      <BlogCard
        image="https://via.placeholder.com/300x180"
        title="Android App Development Courses within 30 days"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium venenatis sed finibus orci imperdiet."
        author="Rulius Hurry"
        role="App Developer"
        date="15 April, 2024"
        authorImage="https://via.placeholder.com/35"
      />
      <BlogCard
        image="https://via.placeholder.com/300x180"
        title="Android App Development Courses within 30 days"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium venenatis sed finibus orci imperdiet."
        author="Rulius Hurry"
        role="App Developer"
        date="15 April, 2024"
        authorImage="https://via.placeholder.com/35"
      />
    </div>
    

      {/* YouTube Video Embed */}
      <YouTubeVideo>
        <iframe
         src="https://www.youtube.com/embed/yX8gOO_VLbk" // Replace with your YouTube video link
          title="YouTube Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </YouTubeVideo>

      <Section>
        <SectionTitle>Course Overview</SectionTitle>
        <p>
          Step into the future of AI and Data Science with our exclusive program in collaboration with Inikola.
          This hands-on internship includes intensive projects, expert mentorship, and 100% placement assurance starting by the end of the second month.
        </p>
      </Section>

      <Section>
        <SectionTitle>Key Highlights and Features</SectionTitle>
        <HighlightsList>
          <li>Practical Projects with real-world data</li>
          <li>Mentorship from AI expert Aman Kasaudhan</li>
          <li>100% Placement Assurance beginning from the second month</li>
          <li>Guaranteed Stipend of ₹10,000/month</li>
          <li>Internship Experience Letter from Inikola</li>
        </HighlightsList>
      </Section>

      <Section>
        <SectionTitle>Curriculum</SectionTitle>

        {[
          {
            title: 'Module 1: Python Foundations',
            content: (
              <>
                <SubModule>
                  <SubModuleTitle>Python Programming</SubModuleTitle>
                  <p>Master Python basics, including data types, control structures, functions, and libraries such as Pandas and NumPy for data manipulation.</p>
                </SubModule>
                <SubModule>
                  <SubModuleTitle>Advanced Python for Data Science</SubModuleTitle>
                  <p>Dive into advanced topics like list comprehensions, lambda functions, and object-oriented programming (OOP) to build complex data applications.</p>
                </SubModule>
              </>
            )
          },
          {
            title: 'Module 2: Mathematics for Machine Learning',
            content: (
              <>
                <SubModule>
                  <SubModuleTitle>Linear Algebra</SubModuleTitle>
                  <p>Learn about vectors, matrices, and matrix operations, crucial for understanding transformations in machine learning algorithms.</p>
                </SubModule>
                <SubModule>
                  <SubModuleTitle>Calculus</SubModuleTitle>
                  <p>Understand derivatives and integrals, which are used to optimize machine learning models.</p>
                </SubModule>
                <SubModule>
                  <SubModuleTitle>Probability and Statistics</SubModuleTitle>
                  <p>Explore concepts like random variables, probability distributions, and statistical inference to support model development and evaluation.</p>
                </SubModule>
              </>
            )
          },
          {
            title: 'Module 3: Statistics for Data Science',
            content: (
              <>
                <SubModule>
                  <SubModuleTitle>Descriptive Statistics</SubModuleTitle>
                  <p>Summarize data using measures of central tendency (mean, median, mode) and dispersion (variance, standard deviation).</p>
                </SubModule>
                <SubModule>
                  <SubModuleTitle>Inferential Statistics</SubModuleTitle>
                  <p>Learn hypothesis testing, confidence intervals, and p-values to make data-driven decisions.</p>
                </SubModule>
                <SubModule>
                  <SubModuleTitle>Statistical Modeling</SubModuleTitle>
                  <p>Develop skills in correlation, regression analysis, and ANOVA for predicting and interpreting data trends.</p>
                </SubModule>
              </>
            )
          },
          {
            title: 'Module 4: Machine Learning Essentials',
            content: (
              <>
                <SubModule>
                  <SubModuleTitle>Supervised Learning</SubModuleTitle>
                  <p>Explore algorithms for regression and classification, including linear regression, logistic regression, decision trees, and SVMs.</p>
                </SubModule>
                <SubModule>
                  <SubModuleTitle>Unsupervised Learning</SubModuleTitle>
                  <p>Uncover patterns in data using clustering techniques like K-means and hierarchical clustering.</p>
                </SubModule>
                <SubModule>
                  <SubModuleTitle>Model Evaluation</SubModuleTitle>
                  <p>Learn metrics like accuracy, precision, recall, and F1-score to assess model performance.</p>
                </SubModule>
              </>
            )
          },
          {
            title: 'Module 5: Databases and Cloud Computing',
            content: (
              <>
                <SubModule>
                  <SubModuleTitle>SQL & NoSQL Databases</SubModuleTitle>
                  <p>Gain proficiency in SQL for structured data management and NoSQL for handling unstructured data.</p>
                </SubModule>
                <SubModule>
                  <SubModuleTitle>Cloud Services</SubModuleTitle>
                  <p>Introduction to AWS, Google Cloud, and Azure for scalable data storage and machine learning deployment.</p>
                </SubModule>
              </>
            )
          },
          {
            title: 'Module 6: Deep Learning and NLP',
            content: (
              <>
                <SubModule>
                  <SubModuleTitle>Neural Networks</SubModuleTitle>
                  <p>Understand CNNs and RNNs, foundational deep learning models for image and sequential data processing.</p>
                </SubModule>
                <SubModule>
                  <SubModuleTitle>NLP Fundamentals</SubModuleTitle>
                  <p>Explore tokenization, embeddings, and sentiment analysis to interpret text data.</p>
                </SubModule>
              </>
            )
          },
          {
            title: 'Module 7: Transformers, GPT Models, and RAG',
            content: (
              <>
                <SubModule>
                  <SubModuleTitle>Transformers</SubModuleTitle>
                  <p>Study transformer models like BERT and GPT, focusing on architecture and applications in NLP.</p>
                </SubModule>
                <SubModule>
                  <SubModuleTitle>RAG & LangChain</SubModuleTitle>
                  <p>Learn how Retrieval-Augmented Generation and LangChain improve AI by combining retrieval with generation.</p>
                </SubModule>
              </>
            )
          },
          {
            title: 'Module 8: MLOps and Model Deployment',
            content: (
              <>
                <SubModule>
                  <SubModuleTitle>MLOps Practices</SubModuleTitle>
                  <p>Implement CI/CD pipelines, model versioning, and monitoring for reliable ML model management.</p>
                </SubModule>
                <SubModule>
                  <SubModuleTitle>Deployment Strategies</SubModuleTitle>
                  <p>Deploy models using APIs and cloud services for real-world applications.</p>
                </SubModule>
              </>
            )
          },
        ].map((module, index) => (
          <Accordion key={index}>
            <AccordionHeader onClick={() => toggleModule(index)}>
              {module.title}
              <span>{expandedModules.includes(index) ? '-' : '+'}</span>
            </AccordionHeader>
            <AccordionContent expanded={expandedModules.includes(index)}>
              {module.content}
            </AccordionContent>
          </Accordion>
        ))}
      </Section>

      <Section>
        <SectionTitle>Instructor Bio</SectionTitle>
        <p>
          <strong>Instructor:</strong> Aman Kasaudhan <br />
          <strong>Bio:</strong> Aman Kasaudhan is a data science and AI expert with a wealth of experience in machine learning, data analysis, and deep learning applications. Known for his approachable teaching style and hands-on guidance, Aman has mentored hundreds of students to successful careers in tech. With extensive experience in building real-world AI solutions, he brings both theory and practice to life in each session, ensuring every student is fully equipped for their career.
        </p>
      </Section>

      <Section>
        <SectionTitle>Eligibility and Requirements</SectionTitle>
        <p>
          <strong>Ideal for:</strong> Graduates, engineers, and tech enthusiasts looking to break into AI and data science.<br />
          <strong>Requirements:</strong> Basic familiarity with Python and a commitment to learning and problem-solving. This program is accessible to beginners and career changers alike.
        </p>
      </Section>

      <Section>
        <SectionTitle>Course Duration and Schedule</SectionTitle>
        <p>
          <strong>Duration:</strong> 6 months, with placement starting by the end of the second month.<br />
          <strong>Weekly Live Sessions:</strong> Five sessions each week, 2.5 hours each (3 by Crafting Brain, 2 by Inikola).<br />
          <strong>Flexible Learning:</strong> Recorded sessions, on-demand resources, and additional support to accommodate various schedules.
        </p>
      </Section>

      <CTAButton onClick={handleEnrollNow}>Enroll Now – Limited Spots Available!</CTAButton>

      {showFooter && <Footer />} {/* Conditionally render Footer */}
    </PageWrapper>

  );
}

export default Course;
