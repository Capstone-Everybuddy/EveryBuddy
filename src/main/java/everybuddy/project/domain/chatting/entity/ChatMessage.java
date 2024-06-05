package everybuddy.project.domain.chatting.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    public enum MessageType {
        ENTER, TALK
    }

    public enum SenderType {
        s, b
    }

    private MessageType type;
    private String roomId;
    private String sender;
    private int senderId; // 추가된 필드
    private SenderType senderType; // 추가된 필드
    private String message;
    private Timestamp createdAt; // 추가된 필드
}
