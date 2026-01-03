'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { weddingConfig } from '../../config/wedding-config';
import FadeInUp from '../animations/FadeInUp';

interface ShareSectionProps {
  bgColor?: 'white' | 'beige';
}

const ShareSection = ({ bgColor = 'white' }: ShareSectionProps) => {
  const [urlCopied, setUrlCopied] = useState(false);

  // URL 복사 함수
  const copyWebsiteUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => {
        setUrlCopied(true);
        setTimeout(() => {
          setUrlCopied(false);
        }, 2000);
      },
      (err) => {
        console.error('URL 복사 실패:', err);
      }
    );
  };
  
  // 웹 공유 API를 사용한 공유 함수
  const shareWebsite = async () => {
    const shareData = {
      title: weddingConfig.meta.title,
      text: `${weddingConfig.invitation.groom.name} ♥ ${weddingConfig.invitation.bride.name}의 결혼식에 초대합니다`,
      url: window.location.href,
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // 공유 API를 지원하지 않는 경우 URL 복사로 대체
        copyWebsiteUrl();
        alert('이 브라우저는 공유 기능을 지원하지 않습니다. URL이 복사되었습니다.');
      }
    } catch (error) {
      console.error('공유 실패:', error);
    }
  };

  return (
    <ShareSectionContainer $bgColor={bgColor}>
      <FadeInUp delay={0.2}>
        <ShareContainer>
          <ShareButton onClick={copyWebsiteUrl}>
            <ShareIconWrapper>
              <Image 
                src="/icon/link.png" 
                alt="URL 복사" 
                width={20} 
                height={20}
                style={{ objectFit: 'contain' }}
              />
            </ShareIconWrapper>
            {urlCopied ? '복사 완료!' : 'URL 복사하기'}
          </ShareButton>
          <ShareButton onClick={shareWebsite} $isShare={true}>
            <ShareIconWrapper>
              <Image 
                src="/icon/katalk.png" 
                alt="공유하기" 
                width={20} 
                height={20}
                style={{ objectFit: 'contain' }}
              />
            </ShareIconWrapper>
            공유하기
          </ShareButton>
        </ShareContainer>
      </FadeInUp>
    </ShareSectionContainer>
  );
};

const ShareSectionContainer = styled.section<{ $bgColor: 'white' | 'beige' }>`
  padding: 5rem 1.5rem;
  text-align: center;
  background-color: ${props => props.$bgColor === 'beige' ? '#F8F6F2' : 'white'};
`;

const ShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
`;

const ShareButton = styled.button<{ $isShare?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: var(--text-dark);
  border: 1px solid transparent;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-family: 'bada', 'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
  
  &:hover {
    border-color: transparent;
    background-color: rgba(212, 185, 150, 0.1);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(0, 0, 0, 0.1);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }
  
  &:active:after {
    animation: ripple 0.6s ease-out;
  }
  
  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 0.5;
    }
    20% {
      transform: scale(25, 25);
      opacity: 0.3;
    }
    100% {
      opacity: 0;
      transform: scale(40, 40);
    }
  }
`;

const ShareIconWrapper = styled.div`
  margin-right: 0.5rem;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ShareSection;