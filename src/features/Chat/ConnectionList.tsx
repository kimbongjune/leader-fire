import { Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';

// 접속자 목록
export interface connectorType {
  name: string;
  telephoneNumer: string;
  color: string;
}

interface Props {
  connectors: connectorType[];
}

const ConnectionList = (props: Props) => {
  return (
    <Wrapper>
      <Stack spacing="8px">
        <Title>접속자 목록</Title>
        <Stack spacing="0px" divider={<Divider />}>
          {props.connectors?.map((connector, index) => {
            return (
              <ConnectorItem key={index}>
                <Profile color={connector.color}>{connector.name[0]}</Profile>
                <TelephoneNumber>{connector.telephoneNumer}</TelephoneNumber>
              </ConnectorItem>
            );
          })}
        </Stack>
      </Stack>
    </Wrapper>
  );
};

export default ConnectionList;

ConnectionList.defaultProps = {
  connectors: [
    {
      name: '수보대02',
      telephoneNumer: '010-1234-5678',
      color: '#72c964',
    },
    {
      name: '수보대01',
      telephoneNumer: '010-1234-5678',
      color: '#C96495',
    },
    {
      name: '수보대01',
      telephoneNumer: '010-1234-5678',
      color: '#AF64C9',
    },
    {
      name: '수보대01',
      telephoneNumer: '010-1234-5678',
      color: '#C97D64',
    },
    {
      name: '수보대01',
      telephoneNumer: '010-1234-5678',
      color: '#509EEB',
    },
    {
      name: '수보대01',
      telephoneNumer: '010-1234-5678',
      color: '#72C964',
    },
  ],
};

const Wrapper = styled.div``;

const Title = styled.div`
  color: var(--08, #495057);
  font-family: Pretendard Bold;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
`;

const ConnectorItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;

  color: var(--00, #fff);
  text-align: center;
  font-family: Pretendard Medium;
  font-size: 20px;
  line-height: 32px; /* 160% */
  letter-spacing: -0.4px;
`;

const Profile = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  padding: 7px;
  border-radius: 45px;
  background: ${({ color }) => color};
`;

const TelephoneNumber = styled.div`
  height: fit-content;
  color: var(--08, #495057);
  font-family: Pretendard Medium;
  font-size: 16px;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
`;

const Divider = styled.div`
  magin: 12px 0;
  border-bottom: 1px solid #e9ecef;
`;
