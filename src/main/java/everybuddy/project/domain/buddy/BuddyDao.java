package everybuddy.project.domain.buddy;

import everybuddy.project.domain.buddy.dto.*;
import everybuddy.project.domain.buddy.entity.Buddy;
import everybuddy.project.domain.buddy.entity.BuddyProfile;
import everybuddy.project.domain.seoulmate.entity.SeoulmateProfile;
import everybuddy.project.global.config.BaseException;
import everybuddy.project.global.config.BaseResponseStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

import static everybuddy.project.global.config.BaseResponseStatus.DATABASE_ERROR;

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

    public Buddy getPwd(PostLoginReq postLoginReq) throws BaseException {
        try {
            String getPwdQuery = "SELECT buddyIdx, `name`, ID, password, certified, profileImg, state FROM buddy WHERE ID = ?";
            String getPwdParams = postLoginReq.getID();
            return this.jdbcTemplate.queryForObject(getPwdQuery,
                    (rs, rowNum) -> new Buddy(
                            rs.getInt("buddyIdx"),
                            rs.getString("name"),
                            rs.getString("ID"),
                            rs.getString("password"),
                            rs.getInt("certified"),
                            rs.getString("profileImg"),
                            rs.getInt("state")
                    ),
                    getPwdParams);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }

    }
    public BuddyProfile getBuddyProfile(String buddyId) {
        String profileQuery = "SELECT buddyIdx, `name`, ID, password, studentId, nationality, profileImg FROM buddy WHERE ID = ?";
        return this.jdbcTemplate.queryForObject(profileQuery,
                (rs, rowNum) -> new BuddyProfile (
                        rs.getInt("buddyIdx"),
                        rs.getString("name"),
                        rs.getString("ID"),
                        rs.getString("password"),
                        rs.getString("studentId"),
                        rs.getString("nationality"),
                        rs.getString("profileImg")
                ),
                buddyId);
    }
}
