package everybuddy.project.domain.chatting.dao;

import everybuddy.project.domain.chatting.entity.ChatMessage;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public class ChatMessageDao {
    private final JdbcTemplate jdbcTemplate;

    public ChatMessageDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<ChatMessage> findMessagesByRoomId(String roomId) {
        String sql = "SELECT * FROM chat_message WHERE room_id = ? ORDER BY created_at ASC";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ChatMessage.class), roomId);
    }

    public void save(ChatMessage chatMessage) {
        if (chatMessage.getSenderType() == null) {
            chatMessage.setSenderType(ChatMessage.SenderType.BUDDY); // 기본 값을 설정
        }
        String sql = "INSERT INTO chat_message (room_id, sender_id, sender_type, message, created_at) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, chatMessage.getRoomId(), chatMessage.getSenderId(), chatMessage.getSenderType().toString(), chatMessage.getMessage(), new Timestamp(System.currentTimeMillis()));
    }
}
