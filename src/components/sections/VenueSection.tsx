'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { weddingConfig } from '../../config/wedding-config';
import FadeInUp from '../animations/FadeInUp';

declare global {
  interface Window {
    kakao: any;
  }
}

// 텍스트의 \n을 <br />로 변환하는 함수
const formatTextWithLineBreaks = (text: string) => {
  return text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
};

interface VenueSectionProps {
  bgColor?: 'white' | 'beige';
}

const KAKAO_APP_KEY = '4cfbf5c0b106a3625bc18ed9c71d1f3a';

const VenueSection = ({ bgColor = 'white' }: VenueSectionProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  // 배차 안내 펼침/접기 상태 관리
  const [expandedShuttle, setExpandedShuttle] = useState<'groom' | 'bride' | null>(null);
  
  // 배차 안내 펼침/접기 토글 함수
  const toggleShuttle = (shuttle: 'groom' | 'bride') => {
    if (expandedShuttle === shuttle) {
      setExpandedShuttle(null);
    } else {
      setExpandedShuttle(shuttle);
    }
  };
  
  // 카카오맵 API 스크립트 동적 로드
  useEffect(() => {
    const loadKakaoMapScript = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          setMapLoaded(true);
        });
        return;
      }
      
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&libraries=services&autoload=false`;
      script.onload = () => {
        window.kakao.maps.load(() => {
          console.log('카카오맵 스크립트 로드 완료');
          setMapLoaded(true);
        });
      };
      script.onerror = (error) => {
        console.error('카카오맵 스크립트 로드 실패:', error);
        setMapError(true);
      };
      document.head.appendChild(script);
    };

    loadKakaoMapScript();
    
    // 컴포넌트 언마운트 시 맵 제거
    return () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
      }
    };
  }, []);
  
  // 카카오맵 초기화
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || mapError) return;
    
    const initMap = () => {
      try {
        console.log('카카오맵 초기화 시작');
        
        // 장소 검색 객체 생성
        const ps = new window.kakao.maps.services.Places();
        
        // 장소명으로 검색
        ps.keywordSearch(weddingConfig.venue.name, (data: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
            const place = data[0];
            const lat = parseFloat(place.y);
            const lng = parseFloat(place.x);
            
            // 지도 생성
            const mapOption = {
              center: new window.kakao.maps.LatLng(lat, lng),
              level: 3
            };
            
            const map = new window.kakao.maps.Map(mapRef.current, mapOption);
            
            // 마커 생성
            const markerPosition = new window.kakao.maps.LatLng(lat, lng);
            const marker = new window.kakao.maps.Marker({
              position: markerPosition
            });
            marker.setMap(map);
            
            // 인포윈도우 생성
            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="padding:10px;min-width:150px;text-align:center;font-size:14px;"><strong>${weddingConfig.venue.name}</strong></div>`
            });
            infowindow.open(map, marker);
            
            // 줌 컨트롤 추가
            const zoomControl = new window.kakao.maps.ZoomControl();
            map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
            
            console.log('카카오맵 초기화 완료');
          } else {
            console.error('장소 검색 실패');
            setMapError(true);
          }
        });
        
      } catch (error) {
        console.error('카카오맵 초기화 오류:', error);
        setMapError(true);
      }
    };
    
    initMap();
  }, [mapLoaded, mapError]);
  
  // 정적 지도 이미지 렌더링 (API 인증 실패 시 대체 콘텐츠)
  const renderStaticMap = () => {
    return (
      <StaticMapContainer>
        <StaticMapImage 
          src={`https://map.kakao.com/link/map/${encodeURIComponent(weddingConfig.venue.name)},${weddingConfig.venue.coordinates.latitude},${weddingConfig.venue.coordinates.longitude}`} 
          alt="베뉴 위치" 
        />
        <MapOverlay>
          <VenueName style={{ color: 'white', marginBottom: '0.5rem' }}>{weddingConfig.venue.name}</VenueName>
          <VenueAddress style={{ color: 'white', fontSize: '0.9rem' }}>{weddingConfig.venue.address}</VenueAddress>
        </MapOverlay>
      </StaticMapContainer>
    );
  };
  
  // 길찾기 링크 생성 함수들
  const navigateToNaver = () => {
    if (typeof window !== 'undefined') {
      const name = encodeURIComponent(weddingConfig.venue.name);
      const naverMapsUrl = `https://map.naver.com/p/search/${name}`;
      window.open(naverMapsUrl, '_blank');
    }
  };
  
  const navigateToKakao = () => {
    if (typeof window !== 'undefined') {
      const lat = weddingConfig.venue.coordinates.latitude;
      const lng = weddingConfig.venue.coordinates.longitude;
      const name = encodeURIComponent(weddingConfig.venue.name);
      const kakaoMapsUrl = `https://map.kakao.com/link/to/${name},${lat},${lng}`;
      window.open(kakaoMapsUrl, '_blank');
    }
  };
  
  
  return (
    <VenueSectionContainer $bgColor={bgColor}>
      <FadeInUp>
        <SectionTitle>LOCATION</SectionTitle>
      </FadeInUp>
      
      <FadeInUp delay={0.1}>
        <VenueInfo>
          <VenueName>{weddingConfig.venue.name}</VenueName>
          <VenueAddress>{formatTextWithLineBreaks(weddingConfig.venue.address)}</VenueAddress>
          <VenueTel href={`tel:${weddingConfig.venue.tel}`}>{weddingConfig.venue.tel}</VenueTel>
        </VenueInfo>
      </FadeInUp>
      
      <FadeInUp delay={0.2}>
        {mapError ? (
          renderStaticMap()
        ) : (
          <MapContainer ref={mapRef}>
            {!mapLoaded && <MapLoading>지도를 불러오는 중...</MapLoading>}
          </MapContainer>
        )}
      </FadeInUp>
      
      <FadeInUp delay={0.3}>
        <NavigateButtonsContainer>
          <NavigateButton onClick={navigateToNaver} $mapType="naver">
            <NavigateIconWrapper>
              <Image 
                src="/icon/naver.png" 
                alt="네이버 지도" 
                width={20} 
                height={20}
                style={{ objectFit: 'contain' }}
              />
            </NavigateIconWrapper>
            네이버 지도
          </NavigateButton>
          <NavigateButton onClick={navigateToKakao} $mapType="kakao">
            <NavigateIconWrapper>
              <Image 
                src="/icon/kakao.png" 
                alt="카카오맵" 
                width={20} 
                height={20}
                style={{ objectFit: 'contain' }}
              />
            </NavigateIconWrapper>
            카카오맵
          </NavigateButton>
        </NavigateButtonsContainer>
      </FadeInUp>
      
      <FadeInUp delay={0.4}>
        <TransportCard>
          <CardTitle>대중교통 안내</CardTitle>
          <TransportItem>
            <TransportLabel>
              <TransportIconWrapper>
                <Image 
                  src="/icon/train.png" 
                  alt="지하철" 
                  width={18} 
                  height={18}
                  style={{ objectFit: 'contain' }}
                />
              </TransportIconWrapper>
              지하철
            </TransportLabel>
            <TransportText>{weddingConfig.venue.transportation.subway}</TransportText>
          </TransportItem>
          <TransportItem>
            <TransportLabel>
              <TransportIconWrapper>
                <Image 
                  src="/icon/bus.png" 
                  alt="버스" 
                  width={18} 
                  height={18}
                  style={{ objectFit: 'contain' }}
                />
              </TransportIconWrapper>
              버스
            </TransportLabel>
            <TransportText>{weddingConfig.venue.transportation.bus}</TransportText>
          </TransportItem>
        </TransportCard>
      </FadeInUp>
      
      <FadeInUp delay={0.5}>
        <ParkingCard>
          <CardTitle>주차 안내</CardTitle>
          <ParkingTextContainer>
            <TransportIconWrapper>
              <Image 
                src="/icon/parking.png" 
                alt="주차" 
                width={18} 
                height={18}
                style={{ objectFit: 'contain' }}
              />
            </TransportIconWrapper>
            <TransportText>{weddingConfig.venue.parking}</TransportText>
          </ParkingTextContainer>
        </ParkingCard>
      </FadeInUp>
      
    </VenueSectionContainer>
  );
};

const VenueSectionContainer = styled.section<{ $bgColor: 'white' | 'beige' }>`
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

const VenueInfo = styled.div`
  margin-bottom: 1.5rem;
`;

const VenueName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const VenueAddress = styled.p`
  margin-bottom: 0.5rem;
`;

const VenueTel = styled.a`
  color: var(--secondary-color);
  text-decoration: none;
`;

const MapContainer = styled.div`
  height: 16rem;
  margin-bottom: 1rem;
  background-color: #f1f1f1;
  border-radius: 8px;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

const StaticMapContainer = styled.div`
  height: 16rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
`;

const StaticMapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MapOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 1rem;
  text-align: center;
`;

const MapLoading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--text-medium);
`;

const NavigateButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
`;

const NavigateButton = styled.button<{ $mapType?: 'naver' | 'kakao' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 6rem;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 0.5rem;
  font-size: 0.9rem;
  font-family: 'bada', 'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #c4a986;
    box-shadow: 0 2px 5px rgba(0,0,0,0.15);
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
    background: rgba(255, 255, 255, 0.5);
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

const NavigateIconWrapper = styled.div`
  margin-right: 0.5rem;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
`;

const TransportCard = styled(Card)``;
const ParkingCard = styled(Card)``;
const ShuttleCard = styled(Card)`
  padding: 0;
  overflow: hidden;
`;

const CardTitle = styled.h4`
  font-weight: 500;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
`;

const TransportItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;
`;

const TransportLabel = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 0.8rem;
  margin: 0;
`;

const TransportText = styled.p`
  font-size: 0.75rem;
  color: var(--text-medium);
  white-space: pre-line;
  margin: 0;
`;

const ParkingTextContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const TransportIconWrapper = styled.div`
  margin-right: 0.5rem;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShuttleInfo = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ShuttleLabel = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
`;

const ShuttleText = styled.p`
  font-size: 0.875rem;
  color: var(--text-medium);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ShuttleCallButton = styled.a`
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  text-decoration: none;
  margin-left: 0.5rem;
  position: relative;
  overflow: hidden;
  
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
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }
  
  &:active:after {
    animation: ripple 0.6s ease-out;
  }
`;

const ShuttleCardHeader = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
  border-bottom: ${props => props.$isExpanded ? '1px solid #eee' : 'none'};
  
  h4 {
    margin: 0;
  }
`;

const ExpandIcon = styled.span<{ $isExpanded: boolean }>`
  font-size: 1.5rem;
  line-height: 1;
  color: var(--secondary-color);
  transition: transform 0.3s ease;
`;

const ShuttleContent = styled.div`
  padding: 1rem 1.5rem 1.5rem;
`;

export default VenueSection;
