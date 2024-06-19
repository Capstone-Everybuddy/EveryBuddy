package everybuddy.project.domain.chatting.controller;

import everybuddy.project.domain.chatting.entity.ChatMessage;
import everybuddy.project.domain.chatting.entity.ChatRoom;
import everybuddy.project.domain.chatting.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessageSendingOperations sendingOperations;
    private final ChatService chatService;

    @GetMapping("/chat/messages/{roomId}")
    @ResponseBody
    public List<ChatMessage> getMessages(@PathVariable String roomId) {
        return chatService.findMessagesByRoomId(roomId);
    }

    @MessageMapping("/chat/message")
    public void enter(ChatMessage message) {
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
            message.setMessage(message.getSender() + "님이 입장하였습니다.");
        }
        if (message.getSenderType() == null) {
            message.setSenderType(ChatMessage.SenderType.b); // 기본 값을 설정
        }
        chatService.saveMessage(message); // 메시지 저장
        sendingOperations.convertAndSend("/topic/chat/room/" + message.getRoomId(), message);
    }
}
