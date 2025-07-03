// src/components/Features.js
import React from 'react';
import styled from 'styled-components';

const FeaturesSection = styled.section`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;

const Feature = styled.div`
  background: #f1f1f1;
  padding: 2rem;
  text-align: center;
  border-radius: 8px;
`;

function Features() {
  const featureList = [
    { title: 'Hands-On Learning', description: 'Practical projects with real-world applications.' },
    { title: 'Industry Experts', description: 'Learn from experienced professionals.' },
    { title: 'Live Projects', description: 'Engage in live projects to gain practical skills.' },
    { title: 'Career Support', description: 'Guidance to land your dream job.' },
  ];

  return (
    <FeaturesSection>
      {featureList.map((feature, index) => (
        <Feature key={index}>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </Feature>
      ))}
    </FeaturesSection>
  );
}

export default Features;
