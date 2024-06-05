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

    public List<ChatRoom> findAllRooms(int userId) {
        String sql = "SELECT * FROM chat_room LEFT OUTER JOIN chat_group ON chat_room.room_id=chat_group.room_id WHERE user_id = ? ORDER BY created_at DESC";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ChatRoom.class), userId);
    }

    public int getRoomId(int userId, String userType) {
        String sql = "SELECT room_id FROM chat_group WHERE user_id=? AND user_type=?";
        return jdbcTemplate.queryForObject(sql, int.class, userId, userType);
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
