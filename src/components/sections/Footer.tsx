'use client';

import React from 'react';
import styled from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';

const watermarkId = weddingConfig.meta._jwk_watermark_id || 'JWK-NonCommercial';

const jwk_checkNonCommercial = () => {
  console.log(`Watermark: ${watermarkId.slice(0, 5)}`);
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      {/* WeddingInvitation-Footer-NonCommercial DO NOT CHANGE*/}
      <FooterContent>
        <Copyright>Wonseok and Sanghyu</Copyright>
        <Credits>Made with love</Credits>
        <HiddenAttribution data-jwk-id={watermarkId}>
          NonCommercial
        </HiddenAttribution>
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  padding: 2rem 1.5rem;
  background-color: #F8F6F2;
  border-top: 1px solid rgba(0,0,0,0.05);
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  max-width: 36rem;
  margin: 0 auto;
`;

const Copyright = styled.p`
  font-family: 'GoldenPlains', 'PlayfairDisplay', serif;
  font-size: 1.1rem;
  color: var(--text-medium);
`;

const Credits = styled.p`
  font-family: 'GoldenPlains', 'PlayfairDisplay', serif;
  font-size: 0.9rem;
  color: var(--text-light);
`;

const HiddenAttribution = styled.div`
  position: absolute;
  opacity: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
`;

export default Footer; 