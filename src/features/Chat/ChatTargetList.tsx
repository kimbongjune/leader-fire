import ChatList from './ChatList';
import ChatListItem from './ChatListItem';

const ChatTargetList = () => {
  return (
    <>
      <ChatList title="신고자">
        <ChatListItem id={'1'} name="홍길동" content="왜 아직 도착안하나요?" contentType="string" time="13:04" />
      </ChatList>
      <ChatList title="의용소방대">
        <ChatListItem id={'2'} name="홍길동" content="왜 아직 도착안하나요?" contentType="image" time="13:04" />
      </ChatList>
      <ChatList title="생명지킴이">
        <ChatListItem id={'3'} name="홍길동" content="왜 아직 도착안하나요?" contentType="video" time="13:04" />
      </ChatList>
      <ChatList title="수보대">
        <ChatListItem id={'4'} name="홍길동" content="왜 아직 도착안하나요?" contentType="video" time="13:04" />
      </ChatList>
    </>
  );
};

export default ChatTargetList;
