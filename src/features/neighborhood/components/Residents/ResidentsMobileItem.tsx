import React from 'react';
import styled from '@emotion/styled';
import theme from '@/theme/colors';
import { Flex } from '@chakra-ui/react';
import IconWrapper from '@/components/common/IconWrapper/IconWrapper';
import Call from '../../../../../public/images/icons/call.svg';

interface Props {
  phone?: string;
  name?: string;
  tag?: string;
  storeName?: string;
  hasDivider?: boolean;
}

const ResidentsMobileItem = (props: Props) => {
  return (
    <React.Fragment>
      <div>
        <Flex alignItems="center" marginBottom="8px">
          {props.phone ? (
            <a href={`tel:${props.phone}`}>
              <PhoneWrapper>
                <Flex gap="4px">
                  <IconWrapper width="16px" height="16px" color={theme.colors.blue}>
                    <Call />
                  </IconWrapper>
                  <PhoneNumber>{props.phone}</PhoneNumber>
                </Flex>
              </PhoneWrapper>
            </a>
          ) : (
            <PhoneWrapper>
              <Flex gap="4px">
                <IconWrapper width="16px" height="16px" color={theme.colors.gray}>
                  <Call />
                </IconWrapper>
                <PhoneNumber>{props.phone}</PhoneNumber>
              </Flex>
            </PhoneWrapper>
          )}
          <MobileNameWrapper>
            <NameText>{props.name}</NameText>
          </MobileNameWrapper>
          <Tag>{props.tag}</Tag>
        </Flex>
        {props.storeName && <StoreName>{props.storeName}</StoreName>}
      </div>
      {props.hasDivider && <Divider />}
    </React.Fragment>
  );
};

export default ResidentsMobileItem;

const PhoneWrapper = styled.div`
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray2};
  background-color: ${theme.colors.white};
  padding: 8px;
  width: fit-content;
  margin-right: 16px;
  color: ${theme.colors.blue};
`;

const PhoneNumber = styled.div`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Medium';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
`;

const MobileNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0 8px;
`;
const NameText = styled.div`
  color: ${theme.colors.gray7};
  font-family: 'Pretendard Bold';
  font-size: 16px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.32px;
`;

const Tag = styled.div`
  width: fit-content;
  color: ${theme.colors.gray5};
  font-family: 'Pretendard Bold';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
  margin-left: 8px;
`;

const StoreName = styled.div`
  overflow: hidden;
  color: ${theme.colors.gray7};
  text-overflow: ellipsis;
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.28px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

const Divider = styled.hr`
  margin: 16px 0;
  border-top: 1px solid ${theme.colors.gray2};
`;
