'use client';

import React from 'react';
import styled from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';
import FadeInUp from '../animations/FadeInUp';

interface ContactSectionProps {
  bgColor?: 'white' | 'beige';
}

const ContactSection = ({ bgColor = 'white' }: ContactSectionProps) => {
  return (
    <ContactSectionContainer $bgColor={bgColor}>
      <FadeInUp>
        <SectionTitle>CONTACT</SectionTitle>
      </FadeInUp>
      
      <FadeInUp delay={0.1}>
        <ContactCards>
          <ContactCard>
            <ContactLabel>신랑</ContactLabel>
            <ContactName>{weddingConfig.invitation.groom.name}</ContactName>
            <ContactButtons>
              <ContactButton href={`tel:+82${weddingConfig.contact.groom.phone.replace(/-/g, '').slice(1)}`}>
                <PhoneIcon />
                <span>전화</span>
              </ContactButton>
              <ContactButton href={`sms:${weddingConfig.contact.groom.phone}`}>
                <MessageIcon />
                <span>문자</span>
              </ContactButton>
            </ContactButtons>
          </ContactCard>
          
          <ContactCard>
            <ContactLabel>신부</ContactLabel>
            <ContactName>{weddingConfig.invitation.bride.name}</ContactName>
            <ContactButtons>
              <ContactButton href={`tel:+82${weddingConfig.contact.bride.phone.replace(/-/g, '').slice(1)}`}>
                <PhoneIcon />
                <span>전화</span>
              </ContactButton>
              <ContactButton href={`sms:${weddingConfig.contact.bride.phone}`}>
                <MessageIcon />
                <span>문자</span>
              </ContactButton>
            </ContactButtons>
          </ContactCard>
        </ContactCards>
      </FadeInUp>
    </ContactSectionContainer>
  );
};

// 전화 아이콘
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

// 문자 아이콘
const MessageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const ContactSectionContainer = styled.section<{ $bgColor: 'white' | 'beige' }>`
  padding: 5rem 1.5rem;
  text-align: center;
  background-color: ${props => props.$bgColor === 'beige' ? '#F8F6F2' : 'white'};
`;

const SectionTitle = styled.h2`
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
  font-family: 'GoldenPlains', 'PlayfairDisplay', serif;
  font-weight: normal;
  font-size: 2rem;
  letter-spacing: 0.05em;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--secondary-color);
  }
`;

const ContactCards = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  max-width: 36rem;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const ContactCard = styled.div`
  flex: 1;
  max-width: 200px;
  text-align: center;
`;

const ContactLabel = styled.p`
  font-size: 0.85rem;
  color: var(--text-medium);
  margin-bottom: 0.25rem;
`;

const ContactName = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const ContactButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
`;

const ContactButton = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  background-color: var(--secondary-color);
  color: white;
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  text-decoration: none;
  transition: all 0.2s ease;
  justify-content: center;
  
  span {
    display: none;
  }
  
  &:hover {
    background-color: #c4a986;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export default ContactSection;
