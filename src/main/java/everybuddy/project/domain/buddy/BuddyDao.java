package everybuddy.project.domain.buddy;

import everybuddy.project.domain.buddy.dto.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Repository
public class BuddyDao {
    private JdbcTemplate jdbcTemplate;

    public BuddyDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }


    public int createBuddy(PostBuddyReq postBuddyReq) {
        String savePreferenceQuery = "insert into `buddy` (name, ID, password, profileImg) values (?,?,?,?)";
        Object[] savePreferenceParams = new Object[]{postBuddyReq.getName(), postBuddyReq.getID(), postBuddyReq.getPassword1(), postBuddyReq.getProfileImg()};
        this.jdbcTemplate.update(savePreferenceQuery, savePreferenceParams);

        String lastInsertIdQuery = "select last_insert_id()";
        return this.jdbcTemplate.queryForObject(lastInsertIdQuery, int.class);
    }
}
