package everybuddy.project.domain.chatting.service;

import everybuddy.project.domain.chatting.dao.ChatRoomDao;
import everybuddy.project.domain.chatting.dao.ChatMessageDao;
import everybuddy.project.domain.chatting.entity.ChatRoom;
import everybuddy.project.domain.chatting.entity.ChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {

    private final ChatRoomDao chatRoomDao;
    private final ChatMessageDao chatMessageDao;

    // 채팅방 불러오기
    public List<ChatRoom> findAllRoom(int userId) {
        return chatRoomDao.findAllRooms(userId);
    }

    // 유저 아이디에 해당하는 채팅방 아이디 반환
    public int getRoomId(int userId, String userType)  {
        return chatRoomDao.getRoomId(userId, userType);
    }

    // 채팅방 하나 불러오기
    public ChatRoom findById(String roomId) {
        return chatRoomDao.findRoomById(roomId);
    }

    // 채팅방 생성
    public ChatRoom createRoom(String name) {
        ChatRoom chatRoom = ChatRoom.create(name);
        chatRoomDao.save(chatRoom);
        return chatRoom;
    }

    // 채팅 메시지 불러오기
    public List<ChatMessage> findMessagesByRoomId(String roomId) {
        return chatMessageDao.findMessagesByRoomId(roomId);
    }

    // 채팅 메시지 저장
    public void saveMessage(ChatMessage chatMessage) {
        chatMessage.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        chatMessageDao.save(chatMessage);
    }
}
