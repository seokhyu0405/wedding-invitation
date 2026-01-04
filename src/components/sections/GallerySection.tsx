'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { weddingConfig } from '../../config/wedding-config';
import FadeInUp from '../animations/FadeInUp';
import path from 'path';

interface GallerySectionProps {
  bgColor?: 'white' | 'beige';
}

// SVG 화살표 아이콘 컴포넌트 추가
const ArrowLeftIcon = styled(({ className }: { className?: string }) => (
  <svg className={className} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 12L18 24L30 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
))``;
const ArrowRightIcon = styled(({ className }: { className?: string }) => (
  <svg className={className} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 12L30 24L18 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
))``;

// 로딩 스피너 컴포넌트 추가
const LoadingSpinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const GallerySection = ({ bgColor = 'white' }: GallerySectionProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [expandedImageIndex, setExpandedImageIndex] = useState<number>(-1);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // 썸네일로 보여줄 이미지 개수
  const THUMBNAIL_COUNT = 9;
  
  // 갤러리 레이아웃 모드 (scroll 또는 grid)
  const galleryLayout = weddingConfig.gallery.layout || 'scroll';
  
  // 디버깅을 위한 로그
  console.log('Gallery Layout:', galleryLayout);
  console.log('Wedding Config Gallery:', weddingConfig.gallery);
  console.log('Gallery Layout from config:', weddingConfig.gallery.layout);
  
  useEffect(() => {
    // API에서 갤러리 이미지 목록 가져오기
    const fetchGalleryImages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/gallery');
        
        if (!response.ok) {
          throw new Error('갤러리 이미지를 불러오는데 실패했습니다');
        }
        
        const data = await response.json();
        
        if (data.images && data.images.length > 0) {
          // 경로의 파일명 기준으로 정렬하여 순서 일치
          const sortedImages = [...data.images].sort((a, b) => {
            const filenameA = path.basename(a);
            const filenameB = path.basename(b);
            return filenameA.localeCompare(filenameB);
          });
          setImages(sortedImages);
        } else {
          // API에서 이미지를 가져오지 못한 경우 기본 설정 사용
          setImages(weddingConfig.gallery.images);
        }
      } catch (err) {
        console.error('갤러리 이미지 로드 오류:', err);
        setError('이미지를 불러오는데 문제가 발생했습니다');
        // 에러 발생 시 기본 설정 사용
        setImages(weddingConfig.gallery.images);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGalleryImages();
  }, []);
  
  // 브라우저 뒤로가기 처리
  useEffect(() => {
    if (expandedImage) {
      // 이미지가 확대되었을 때 히스토리 항목 추가
      window.history.pushState({ expandedImage: true }, "");
      
      // 뒤로가기 이벤트 리스너 추가
      const handlePopState = (event: PopStateEvent) => {
        if (expandedImage) {
          setExpandedImage(null);
          document.body.style.overflow = '';
          event.preventDefault();
        }
      };
      
      window.addEventListener('popstate', handlePopState);
      
      // 컴포넌트 언마운트 시 리스너 제거
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [expandedImage]);
  
  // 터치 이벤트 처리
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      // 수평 스와이프가 수직 스와이프보다 클 때만 이미지 변경
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          // 오른쪽 스와이프 - 이전 이미지
          goToPreviousImage();
        } else {
          // 왼쪽 스와이프 - 다음 이미지
          goToNextImage();
        }
      }
    };
    
    if (expandedImage && overlayRef.current) {
      const overlay = overlayRef.current;
      overlay.addEventListener('touchstart', handleTouchStart, { passive: true });
      overlay.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      return () => {
        overlay.removeEventListener('touchstart', handleTouchStart);
        overlay.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [expandedImage]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      // 한 아이템 너비(250px) + 갭(1rem = 16px)만큼만 스크롤
      scrollContainerRef.current.scrollBy({
        left: -266,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      // 한 아이템 너비(250px) + 갭(1rem = 16px)만큼만 스크롤
      scrollContainerRef.current.scrollBy({
        left: 266,
        behavior: 'smooth'
      });
    }
  };

  const handleImageClick = (index: number) => {
    setIsImageLoading(true);
    setExpandedImage(images[index]);
    setExpandedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const goToPreviousImage = () => {
    if (expandedImageIndex > 0) {
      const newIndex = expandedImageIndex - 1;
      setIsImageLoading(true);
      setExpandedImageIndex(newIndex);
      setExpandedImage(images[newIndex]);
    }
  };

  const goToNextImage = () => {
    if (expandedImageIndex < images.length - 1) {
      const newIndex = expandedImageIndex + 1;
      setIsImageLoading(true);
      setExpandedImageIndex(newIndex);
      setExpandedImage(images[newIndex]);
    }
  };

  const handleCloseExpanded = () => {
    setExpandedImage(null);
    setExpandedImageIndex(-1);
    document.body.style.overflow = '';
    if (window.history.state && window.history.state.expandedImage) {
      window.history.back();
    }
  };
  
  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (expandedImage) {
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault();
            goToPreviousImage();
            break;
          case 'ArrowRight':
            event.preventDefault();
            goToNextImage();
            break;
          case 'Escape':
            event.preventDefault();
            handleCloseExpanded();
            break;
        }
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (expandedImage) {
        event.preventDefault();
        if (event.deltaY > 0) {
          // 아래로 스크롤 - 다음 이미지
          goToNextImage();
        } else {
          // 위로 스크롤 - 이전 이미지
          goToPreviousImage();
        }
      }
    };

    if (expandedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('wheel', handleWheel);
      };
    }
  }, [expandedImage, expandedImageIndex, images]);
  
  if (isLoading) {
    return (
      <GallerySectionContainer $bgColor={bgColor}>
        <SectionTitle>GALLERY</SectionTitle>
        <LoadingContainer>이미지를 불러오는 중...</LoadingContainer>
      </GallerySectionContainer>
    );
  }
  
  if (error || images.length === 0) {
    return (
      <GallerySectionContainer $bgColor={bgColor}>
        <SectionTitle>GALLERY</SectionTitle>
        <ErrorContainer>
          {error || '갤러리 이미지가 없습니다'}
        </ErrorContainer>
      </GallerySectionContainer>
    );
  }
  
  return (
    <GallerySectionContainer $bgColor={bgColor}>
      <FadeInUp>
        <SectionTitle>GALLERY</SectionTitle>
      </FadeInUp>
      
      <FadeInUp delay={0.2}>
        {galleryLayout === 'grid' ? (
        // 그리드 레이아웃
        <GalleryGridContainer>
          {images.slice(0, THUMBNAIL_COUNT).map((image, index) => (
            <GalleryGridCard key={index} onClick={() => handleImageClick(index)}>
              <GalleryGridImageWrapper>
                <GalleryNextImage 
                  src={image}
                  alt={`웨딩 갤러리 이미지 ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) calc(33.333vw - 1rem), calc(33.333vw - 2rem)"
                  quality={85}
                  priority={index < 6}
                  style={{ objectFit: 'cover' }}
                  draggable={false}
                  onContextMenu={e => e.preventDefault()}
                />
              </GalleryGridImageWrapper>
            </GalleryGridCard>
          ))}
        </GalleryGridContainer>
      ) : (
        // 스크롤 레이아웃 (기존)
        <GalleryContainer>
          <GalleryButton onClick={scrollLeft} aria-label="이전 이미지들" className="left-button">
            <ArrowLeftIcon />
          </GalleryButton>
          
          <GalleryScrollContainer ref={scrollContainerRef}>
            {images.slice(0, THUMBNAIL_COUNT).map((image, index) => (
              <GalleryCard key={index} onClick={() => handleImageClick(index)}>
                <GalleryImageWrapper>
                  <GalleryNextImage 
                    src={image}
                    alt={`웨딩 갤러리 이미지 ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 250px, 300px"
                    quality={85}
                    priority={index < 3}
                    style={{ objectFit: 'cover' }}
                    draggable={false}
                    onContextMenu={e => e.preventDefault()}
                  />
                </GalleryImageWrapper>
              </GalleryCard>
            ))}
          </GalleryScrollContainer>
          
          <GalleryButton onClick={scrollRight} aria-label="다음 이미지들" className="right-button">
            <ArrowRightIcon />
          </GalleryButton>
        </GalleryContainer>
      )}
      </FadeInUp>

      {expandedImage && (
        <ExpandedImageOverlay
          ref={overlayRef}
          onClick={handleCloseExpanded}
          aria-modal="true"
          role="dialog"
        >
          <ExpandedImageContainer onClick={e => e.stopPropagation()}>
            <ExpandedImageWrapper key={expandedImageIndex}>
              {isImageLoading && (
                <LoadingSpinnerContainer>
                  <LoadingSpinner />
                </LoadingSpinnerContainer>
              )}
              <Image
                key={expandedImage}
                src={expandedImage}
                alt={`웨딩 갤러리 이미지 ${expandedImageIndex + 1}`}
                fill
                sizes="90vw"
                quality={90}
                priority
                style={{
                  objectFit: 'contain',
                  background: 'transparent',
                  opacity: isImageLoading ? 0 : 1,
                  transition: 'opacity 0.2s ease-in-out'
                }}
                draggable={false}
                onContextMenu={e => e.preventDefault()}
                onLoadingComplete={() => setIsImageLoading(false)}
              />
            </ExpandedImageWrapper>
            <CloseButton onClick={handleCloseExpanded} aria-label="닫기">×</CloseButton>

            {/* 하단 네비게이션 버튼 */}
            <BottomNavigation>
              <NavButton
                onClick={goToPreviousImage}
                disabled={expandedImageIndex <= 0}
                aria-label="이전 이미지"
              >
                <ArrowLeftIcon />
              </NavButton>
              <ImageCounter>{expandedImageIndex + 1} / {images.length}</ImageCounter>
              <NavButton
                onClick={goToNextImage}
                disabled={expandedImageIndex >= images.length - 1}
                aria-label="다음 이미지"
              >
                <ArrowRightIcon />
              </NavButton>
            </BottomNavigation>
          </ExpandedImageContainer>
        </ExpandedImageOverlay>
      )}
    </GallerySectionContainer>
  );
};

const GallerySectionContainer = styled.section<{ $bgColor: 'white' | 'beige' }>`
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
`;

const GalleryContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  
  .left-button {
    position: absolute;
    left: -0.25rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }
  
  .right-button {
    position: absolute;
    right: -0.25rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }
`;

const GalleryScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 0.25rem;
  padding: 1rem 0.5rem;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  
  /* 좌우 패딩을 추가하여 끝 아이템이 중앙에 오도록 설정 */
  padding-left: calc(50% - 125px);
  padding-right: calc(50% - 125px);
  
  &::-webkit-scrollbar {
    display: none;  /* Chrome, Safari, Opera */
  }
`;

const GalleryCard = styled.div`
  scroll-snap-align: center;
  flex: 0 0 auto;
  width: 250px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const GalleryImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%; /* 1:1 비율 (정사각형) */
`;

const GalleryNextImage = styled(Image)`
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const GalleryButton = styled.button`
  background-color: var(--secondary-color);
  color: white;
  border: none;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.9;
  transition: all 0.3s ease;
  z-index: 2;
  font-size: 2rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  
  &:hover {
    opacity: 1;
    background-color: var(--secondary-color);
    box-shadow: 0 3px 10px rgba(0,0,0,0.25);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

const ExpandedImageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: pan-x pan-y;
`;

const ExpandedImageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  max-width: none;
  max-height: none;
  background-color: transparent;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExpandedImageWrapper = styled.div`
  position: relative;
  width: 90vw;
  height: 90vh;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: pan-x pan-y;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: transparent;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  cursor: pointer;
  z-index: 10;
  opacity: 1;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.7;
  }
  
  &:active {
    transform: scale(0.9);
  }
`;

const LoadingContainer = styled.div`
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  max-width: 36rem;
  margin: 0 auto;
`;

const ErrorContainer = styled.div`
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  max-width: 36rem;
  margin: 0 auto;
  color: #c62828;
`;

const LoadingSpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
`;

const BottomNavigation = styled.div`
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 3rem;
  z-index: 10;
`;

const NavButton = styled.button<{ disabled?: boolean }>`
  background-color: transparent;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ disabled }) => disabled ? 0.3 : 1};
  transition: opacity 0.3s ease;
  font-size: 2.5rem;
  
  &:hover:not(:disabled) {
    opacity: 0.8;
  }
  
  &:active:not(:disabled) {
    transform: scale(0.9);
  }
`;

const ImageCounter = styled.span`
  color: white;
  font-size: 1rem;
  font-family: 'bada', 'MaruBuri', sans-serif;
  min-width: 4rem;
  text-align: center;
`;

const GalleryGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
  max-width: 800px;
  margin: 2rem auto 0;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.25rem;
    padding: 0 0.5rem;
    margin-top: 1.5rem;
  }
`;

const GalleryGridCard = styled.div`
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  position: relative;
  width: 100%;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const GalleryGridImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%; /* 1:1 비율 (정사각형) */
`;

export default GallerySection; 
