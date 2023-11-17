import { useRouter } from 'next/router';
import ChatList from './ChatList';
import ChatListItem from './ChatListItem';
import ChatTarget, { ChatTargetType } from './ChatTarget';

interface Props {
  chatList: ChatTargetType[];
}

const ChatRoomList = (props: Props) => {
  return (
    <>
      <ChatList title="채팅 목록">
        {props.chatList?.map((item, index) => {
          return <ChatTarget key={index} {...item} />;
        })}
      </ChatList>
    </>
  );
};

export default ChatRoomList;

ChatRoomList.defaultProps = {
  chatList: [
    {
      id: '1',
      messageType: 'string',
      time: '13:05',
      name: '홍길동',
      comment: '왜 아직 도착안하나요?',
    },
    {
      id: '2',
      messageType: 'image',
      time: '13:05',
      name: '홍길동',
      url: 'example',
    },
    {
      id: '3',
      messageType: 'video',
      time: '13:05',
      name: '홍길동',
      url: 'example',
    },
  ],
};
