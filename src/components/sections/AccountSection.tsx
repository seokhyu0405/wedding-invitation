'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';
import { AccountInfo } from '../../types/wedding';
import FadeInUp from '../animations/FadeInUp';

type AccountPerson = 'groom' | 'bride' | 'groomFather' | 'groomMother' | 'brideFather' | 'brideMother';
type AccountSide = 'groom' | 'bride';

interface AccountSectionProps {
  bgColor?: 'white' | 'beige';
}

const AccountSection = ({ bgColor = 'white' }: AccountSectionProps) => {
  const [copyStatus, setCopyStatus] = useState<Record<AccountPerson, boolean>>({
    groom: false,
    bride: false,
    groomFather: false,
    groomMother: false,
    brideFather: false,
    brideMother: false,
  });
  
  // 계좌 그룹 열림/닫힘 상태 관리
  const [expandedSide, setExpandedSide] = useState<AccountSide | null>(null);

  const toggleSide = (side: AccountSide) => {
    if (expandedSide === side) {
      setExpandedSide(null);
    } else {
      setExpandedSide(side);
    }
  };

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

  const copyToClipboard = async (text: string, person: AccountPerson) => {
    try {
      await copyWithFallback(text);
      setCopyStatus(prev => ({ ...prev, [person]: true }));
      setTimeout(() => {
        setCopyStatus(prev => ({ ...prev, [person]: false }));
      }, 2000);
    } catch (err) {
      console.error('계좌번호 복사 실패:', err);
    }
  };
  
  // 각 인물에 해당하는 이름 가져오기
  const getPersonName = (person: AccountPerson): string => {
    switch(person) {
      case 'groom':
        return weddingConfig.invitation.groom.name;
      case 'bride':
        return weddingConfig.invitation.bride.name;
      case 'groomFather':
        return weddingConfig.invitation.groom.father;
      case 'groomMother':
        return weddingConfig.invitation.groom.mother;
      case 'brideFather':
        return weddingConfig.invitation.bride.father;
      case 'brideMother':
        return weddingConfig.invitation.bride.mother;
      default:
        return '';
    }
  };

  // 개별 계좌 정보 행 렌더링
  const renderAccountRow = (accountInfo: AccountInfo, person: AccountPerson, title: string) => {
    // 계좌 소유자 이름이 비어있는 경우 null 반환하여 렌더링하지 않음
    const personName = getPersonName(person);
    if (!personName || personName.trim() === '') {
      return null;
    }

    // 1줄: 은행명, 2줄: 계좌번호 + 예금주
    const bankText = accountInfo.bank;
    const numberAndHolder = `${accountInfo.number} ${accountInfo.holder}`;
    
    // 복사할 텍스트: 계좌번호만
    const copyText = accountInfo.number;

    return (
      <AccountRow>
        <AccountRowTitle>
          {title}
        </AccountRowTitle>
        <AccountRowInfo>
          <AccountBank>{bankText}</AccountBank>
          <AccountNumber>{numberAndHolder}</AccountNumber>
        </AccountRowInfo>
        <CopyButton
          onClick={(e) => {
            e.stopPropagation(); // 클릭 이벤트가 상위로 전파되지 않도록 방지
            copyToClipboard(copyText, person);
          }}
        >
          {copyStatus[person] ? '복사 완료' : '복사'}
        </CopyButton>
      </AccountRow>
    );
  };

  return (
    <AccountSectionContainer $bgColor={bgColor}>
      <FadeInUp>
        <SectionTitle>마음 전하실 곳</SectionTitle>
      </FadeInUp>
      
      <FadeInUp delay={0.1}>
        <AccountCards>
        {/* 신랑측 계좌 카드 */}
        <AccountCard onClick={() => toggleSide('groom')}>
          <AccountCardHeader $isExpanded={expandedSide === 'groom'}>
            <GroupTitle>신랑 측 계좌번호</GroupTitle>
            <ExpandIcon $isExpanded={expandedSide === 'groom'}>
              {expandedSide === 'groom' ? '−' : '+'}
            </ExpandIcon>
          </AccountCardHeader>
          
          {expandedSide === 'groom' && (
            <AccountRowsContainer>
              {renderAccountRow(weddingConfig.account.groom, 'groom', '신랑')}
              {renderAccountRow(weddingConfig.account.groomFather, 'groomFather', '아버지')}
              {renderAccountRow(weddingConfig.account.groomMother, 'groomMother', '어머니')}
            </AccountRowsContainer>
          )}
        </AccountCard>
        
        {/* 신부측 계좌 카드 */}
        <AccountCard onClick={() => toggleSide('bride')}>
          <AccountCardHeader $isExpanded={expandedSide === 'bride'}>
            <GroupTitle>신부 측 계좌번호</GroupTitle>
            <ExpandIcon $isExpanded={expandedSide === 'bride'}>
              {expandedSide === 'bride' ? '−' : '+'}
            </ExpandIcon>
          </AccountCardHeader>
          
          {expandedSide === 'bride' && (
            <AccountRowsContainer>
              {renderAccountRow(weddingConfig.account.bride, 'bride', '신부')}
              {renderAccountRow(weddingConfig.account.brideFather, 'brideFather', '아버지')}
              {renderAccountRow(weddingConfig.account.brideMother, 'brideMother', '어머니')}
            </AccountRowsContainer>
          )}
        </AccountCard>
      </AccountCards>
      </FadeInUp>
    </AccountSectionContainer>
  );
};

const AccountSectionContainer = styled.section<{ $bgColor: 'white' | 'beige' }>`
  padding: 5rem 1.5rem;
  text-align: center;
  background-color: ${props => props.$bgColor === 'beige' ? '#F8F6F2' : 'white'};
`;

const SectionTitle = styled.h2`
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
  font-weight: 500;
  font-size: 1.75rem;
  letter-spacing: 0.1em;
  
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

const AccountCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 40rem;
  margin: 0 auto;
`;

const AccountCard = styled.div`
  background-color: white;
  color: var(--text-dark);
  border: 1px solid #eee;
  padding: 0;
  border-radius: 16px;
  cursor: pointer;
  font-size: 0.85rem;
  font-family: 'bada', 'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
  white-space: nowrap;
  transition: all 0.3s ease;
  margin-left: 0.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.08);
  
  &:hover {
    border-color: var(--secondary-color);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    transform: translateY(-2px);
  }
  
  &:active {
    border-color: var(--secondary-color);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

const AccountCardHeader = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  border-bottom: ${props => props.$isExpanded ? '1px solid #eee' : 'none'};
  border-radius: 16px 16px 0 0;
`;

const GroupTitle = styled.h3`
  margin: 0;
  font-weight: 500;
  font-size: 1.1rem;
`;

const ExpandIcon = styled.span<{ $isExpanded: boolean }>`
  font-size: 1.5rem;
  font-weight: 300;
  transition: transform 0.3s ease;
`;

const AccountRowsContainer = styled.div`
  padding: 1rem 1.5rem 1.5rem;
  border-radius: 0 0 16px 16px;
`;

const AccountRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const AccountRowTitle = styled.div`
  font-weight: 500;
  color: var(--text-dark);
  min-width: 3rem;
`;

const AccountRowInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0 1rem;
`;

const AccountBank = styled.div`
  font-size: 0.9rem;
  color: var(--text-medium);
`;

const AccountNumber = styled.div`
  font-size: 0.85rem;
  color: var(--text-light);
`;

const CopyButton = styled.button`
  background-color: white;
  color: var(--secondary-color);
  border: 1px solid var(--secondary-color);
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-family: 'bada', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--secondary-color);
    color: white;
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

export default AccountSection; 