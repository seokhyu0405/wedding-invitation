'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { weddingConfig } from '../../config/wedding-config';
import FadeInUp from '../animations/FadeInUp';

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: KakaoShareOptions) => void;
      };
    };
  }
}

interface KakaoShareOptions {
  objectType: 'feed';
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
  buttons?: Array<{
    title: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  }>;
}

interface ShareSectionProps {
  bgColor?: 'white' | 'beige';
}

const ShareSection = ({ bgColor = 'white' }: ShareSectionProps) => {
  const [urlCopied, setUrlCopied] = useState(false);
  const [kakaoReady, setKakaoReady] = useState(false);

  useEffect(() => {
    const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
    if (!kakaoKey) return;

    if (window.Kakao?.isInitialized?.()) {
      setKakaoReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoKey);
        setKakaoReady(true);
      }
    };
    document.head.appendChild(script);
  }, []);

  const copyWithFallback = async (text: string): Promise<void> => {
    if (navigator.clipboard?.writeText) {
      return navigator.clipboard.writeText(text);
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  const copyWebsiteUrl = async () => {
    try {
      await copyWithFallback(window.location.href);
      setUrlCopied(true);
      setTimeout(() => {
        setUrlCopied(false);
      }, 2000);
    } catch (err) {
      console.error('URL 복사 실패:', err);
    }
  };

  const shareKakao = () => {
    if (!kakaoReady || !window.Kakao) {
      alert('카카오톡 공유 기능을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const imageUrl = `${siteUrl}${weddingConfig.meta.ogImage}`;

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: weddingConfig.meta.title,
        description: `${weddingConfig.main.date}\n${weddingConfig.venue.name}`,
        imageUrl,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
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
          <ShareButton onClick={shareKakao} $isShare={true}>
            <ShareIconWrapper>
              <Image 
                src="/icon/katalk.png" 
                alt="카카오톡 공유" 
                width={20} 
                height={20}
                style={{ objectFit: 'contain' }}
              />
            </ShareIconWrapper>
            카카오톡 공유하기
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