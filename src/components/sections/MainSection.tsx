'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import { weddingConfig } from '../../config/wedding-config';

const watermarkId = weddingConfig.meta._jwk_watermark_id || 'JWK-NonCommercial';

const MainSection = () => {
  return (
    <MainSectionContainer className={`wedding-container jwk-${watermarkId.slice(0, 8)}-main`}>
      <BackgroundImageWrapper>
        <BackgroundImage 
          src={weddingConfig.main.image}
          alt="웨딩 배경 이미지"
          fill
          priority
          sizes="100vw"
          quality={90}
          style={{ objectFit: 'cover', objectPosition: 'center 10%' }}
        />
      </BackgroundImageWrapper>
      <Overlay />
      <MainContent>
        <div>
          <MainTitle>{weddingConfig.main.title}</MainTitle>
        </div>
        <div>
          <DateText>{weddingConfig.main.date}</DateText>
          <VenueText>{weddingConfig.main.venue}</VenueText>
        </div>
        {}
        <HiddenWatermark aria-hidden="true">
          {watermarkId}
        </HiddenWatermark>
      </MainContent>
      
      <ScrollIndicator>
        <i className="fas fa-chevron-down"></i>
      </ScrollIndicator>
    </MainSectionContainer>
  );
};

const MainSectionContainer = styled.section`
  position: relative;
  height: 100svh;
  min-height: 100svh;
  width: 100vw;
  max-width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 2.5rem;
  text-align: center;
  color: white;
  background: #f8f6f2;
  
  @media (min-width: 768px) and (min-height: 780px) {
    aspect-ratio: 9 / 16;
    max-width: calc(100svh * 9 / 16);
    width: auto;
    margin: 0 auto;
    box-shadow: 0 0 32px rgba(0,0,0,0.08);
  }
`;

const BackgroundImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  
  img {
    transform: translateZ(0);
    backface-visibility: hidden;
    will-change: transform;
  }
`;

const BackgroundImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 50%);
  z-index: 1;
`;

const MainContent = styled.div`
  position: relative;
  z-index: 2;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const MainTitle = styled.h1`
  font-family: 'GoldenPlains', 'PlayfairDisplay', 'Times New Roman', serif;
  font-style: normal;
  font-size: 3.5rem;
  min-height: 3.5rem;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
  font-weight: 400;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 3rem;
    min-height: 3rem;
  }
  
  @media (max-width: 450px) {
    font-size: 2.5rem;
    min-height: 2.5rem;
  }
  
  @media (max-width: 360px) {
    font-size: 2rem;
    min-height: 2rem;
  }
  
  @media (max-width: 295px) {
    font-size: 1.75rem;
    min-height: 1.75rem;
  }
`;

const DateText = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
  
  @media (max-width: 450px) {
    font-size: 0.8rem;
  }
  
  @media (max-width: 360px) {
    font-size: 0.75rem;
  }
  
  @media (max-width: 295px) {
    font-size: 0.7rem;
  }
`;

const VenueText = styled.p`
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
  
  @media (max-width: 450px) {
    font-size: 0.8rem;
  }
  
  @media (max-width: 360px) {
    font-size: 0.75rem;
  }
  
  @media (max-width: 295px) {
    font-size: 0.7rem;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-20px);
    }
    60% {
      transform: translateX(-50%) translateY(-10px);
    }
  }
`;

const HiddenWatermark = styled.span`
  position: absolute;
  opacity: 0.01;
  font-size: 1px;
  color: rgba(255, 255, 255, 0.01);
  pointer-events: none;
  user-select: none;
  z-index: -9999;
  bottom: 0;
  right: 0;
`;

export default MainSection; 