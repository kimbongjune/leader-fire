import { Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import PhoneInTalk from '../../../public/images/icons/phoneInTalk.svg';
import PhoneForwarded from '../../../public/images/icons/phoneForwarded.svg';
import { DispatchItemType } from './DispatchItem';

interface Props {
  eventType: DispatchItemType['type'];
  reportCount: number;
  status: 'progress' | 'completion';
}

const EventStatus = (props: Props) => {
  if (props.status === 'completion') {
    return (
      <Stack spacing="4px" align="center">
        <Circle eventType={props.eventType} status={props.status}>
          <PhoneForwarded width={24} height={24} />
        </Circle>
        <Text eventType={props.eventType} status={props.status}>
          종결
        </Text>
      </Stack>
    );
  }

  return (
    <Stack spacing="4px" align="center">
      {props.reportCount === 1 && (
        <Circle eventType={props.eventType} status={props.status}>
          <PhoneInTalk width={24} height={24} />
        </Circle>
      )}
      {props.reportCount > 1 && props.reportCount <= 5 && <Circle eventType={props.eventType}>{props.reportCount}+</Circle>}
      {props.reportCount > 5 && <Circle eventType={props.eventType}>5+</Circle>}
      {props.status === 'progress' && (
        <Text eventType={props.eventType} status={props.status}>
          진행
        </Text>
      )}
    </Stack>
  );
};

export default EventStatus;

const Circle = styled.div<any>`
  display: inline-flex;
  box-sizing: border-box;
  font-family: Pretendard Bold;
  font-size: 20px;
  line-height: 24px; /* 120% */
  letter-spacing: -0.4px;
  padding: 8px;
  border-radius: 69px;

  ${({ eventType }) => {
    if (eventType === 'fires') {
      return `
      color: #FF8A3A;
      background: rgba(255, 138, 58, 0.15);
      `;
    }

    if (eventType === 'rescue') {
      return `
      color: #799EFF;
      background: rgba(121, 158, 255, 0.15);`;
    }

    if (eventType === 'firstAid') {
      return `color: #1DCE00;
      background: rgba(29, 206, 0, 0.15);`;
    }

    if (eventType === 'others') {
      return `color: #CED4DA;
      background: rgba(206, 212, 218, 0.15);`;
    }
  }};

  ${({ status }) => {
    if (status === 'completion') {
      return `color: #ADB5BD;
      background: #E9ECEF`;
    }
  }};
`;

const Text = styled.div<any>`
  font-family: Pretendard Bold;
  font-size: 12px;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.24px;

  ${({ eventType }) => {
    if (eventType === 'fires') {
      return `color: #FF8A3A;`;
    }

    if (eventType === 'rescue') {
      return `color: #799EFF;`;
    }

    if (eventType === 'firstAid') {
      return 'color: #1DCE00;';
    }

    if (eventType === 'others') {
      return 'color: #CED4DA;';
    }
  }}

  ${({ status }) => {
    if (status === 'completion') {
      return 'color: #ADB5BD;';
    }
  }}
`;
