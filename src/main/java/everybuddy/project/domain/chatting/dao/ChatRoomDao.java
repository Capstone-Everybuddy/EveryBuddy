package everybuddy.project.domain.chatting.dao;

import everybuddy.project.domain.chatting.entity.ChatRoom;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public class ChatRoomDao {
    private final JdbcTemplate jdbcTemplate;

    public ChatRoomDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<ChatRoom> findAllRooms() {
        String sql = "SELECT * FROM chat_room ORDER BY created_at DESC";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ChatRoom.class));
    }

    public ChatRoom findRoomById(String roomId) {
        String sql = "SELECT * FROM chat_room WHERE room_id = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(ChatRoom.class), roomId);
    }

    public void save(ChatRoom chatRoom) {
        String sql = "INSERT INTO chat_room (room_name, created_at) VALUES (?, ?)";
        jdbcTemplate.update(sql, chatRoom.getRoomName(), new Timestamp(System.currentTimeMillis()));
        Integer roomId = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        chatRoom.setRoomId(roomId);
    }
}
