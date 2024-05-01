package everybuddy.project.domain.buddy;

import everybuddy.project.domain.buddy.dto.*;
import everybuddy.project.domain.buddy.entity.*;
import everybuddy.project.global.config.BaseException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

import java.util.Arrays;
import java.util.List;

import static everybuddy.project.global.config.BaseResponseStatus.DATABASE_ERROR;

@Repository
public class BuddyDao {
    private JdbcTemplate jdbcTemplate;

    public BuddyDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }


    public int createBuddy(PostBuddyReq postBuddyReq) {
        String savePreferenceQuery = "insert into `buddy` (`name`, ID, password, profileImg) values (?,?,?,?)";
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

    public int saveBuddyPreference(PostPreferReq postPreferReq, int buddyIdx) throws BaseException {
        try {
            List<String> queries = Arrays.asList(
                    "DELETE FROM preferrank_b WHERE buddyIdx = ?",
                    "DELETE FROM personality_b WHERE buddyIdx = ?",
                    "DELETE FROM language_b WHERE buddyIdx = ?",
                    "DELETE FROM wanttodo_b WHERE buddyIdx = ?",
                    "DELETE FROM hobby_b WHERE buddyIdx = ?",
                    "DELETE FROM sex_b WHERE buddyIdx = ?",
                    "DELETE FROM major_b WHERE buddyIdx = ?",
                    "DELETE FROM continent_b WHERE buddyIdx = ?"
            );
            for (String query : queries) {
                this.jdbcTemplate.update(query, buddyIdx);
            }
            String savePreferrankQeury = "INSERT INTO preferrank_b (buddyIdx, `first`, `second`, `third`, `fourth`, `fifth`, `sixth`) values (?, ?, ?, ?, ?, ? ,?)";
            Object[] savePreferrankParams = new Object[]{buddyIdx, postPreferReq.getFirst(), postPreferReq.getSecond(), postPreferReq.getThird(), postPreferReq.getFourth(),
                    postPreferReq.getFifth(), postPreferReq.getSixth()};
            this.jdbcTemplate.update(savePreferrankQeury, savePreferrankParams);
            String selectlastIdx = "select last_insert_id()";
            int result = this.jdbcTemplate.queryForObject(selectlastIdx, int.class);
            for (int i = 0; i < postPreferReq.getFirstList().size(); i++) {
                String savePreferenceQeury = "INSERT INTO "+ postPreferReq.getFirst() +"_b (buddyIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{buddyIdx, postPreferReq.getFirstList().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }
            for (int i = 0; i < postPreferReq.getSecondList().size(); i++) {
                String savePreferenceQeury = "INSERT INTO "+ postPreferReq.getSecond() +"_b (buddyIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{buddyIdx, postPreferReq.getSecondList().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }
            for (int i = 0; i < postPreferReq.getThirdList().size(); i++) {
                String savePreferenceQeury = "INSERT INTO "+ postPreferReq.getThird() +"_b (buddyIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{buddyIdx, postPreferReq.getThirdList().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }
            for (int i = 0; i < postPreferReq.getFourthList().size(); i++) {
                String savePreferenceQeury = "INSERT INTO " + postPreferReq.getFourth() + "_b (buddyIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{buddyIdx, postPreferReq.getFourthList().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }
            for (int i = 0; i < postPreferReq.getFifthList().size(); i++) {
                String savePreferenceQeury = "INSERT INTO "+ postPreferReq.getFifth() +"_b (buddyIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{buddyIdx, postPreferReq.getFifthList().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }
            for (int i = 0; i < postPreferReq.getSixthList().size(); i++) {
                String savePreferenceQeury = "INSERT INTO "+ postPreferReq.getSixth() +"_b (buddyIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{buddyIdx, postPreferReq.getSixthList().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }
            return result;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public void saveBuddyInfo(PostBuddyInfoReq postBuddyInfoReq, int buddyIdx) throws BaseException {
        try {
            List<String> queries = Arrays.asList(
                    "DELETE FROM personalityInfo_b WHERE buddyIdx = ?",
                    "DELETE FROM languageInfo_b WHERE buddyIdx = ?",
                    "DELETE FROM wanttodoInfo_b WHERE buddyIdx = ?",
                    "DELETE FROM hobbyInfo_b WHERE buddyIdx = ?"
            );
            for (String query : queries) {
                this.jdbcTemplate.update(query, buddyIdx);
            }
            for (int i = 0; i < postBuddyInfoReq.getLanguage().size(); i++) {
                String savePreferenceQeury = "INSERT INTO languageInfo_b (buddyIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{buddyIdx, postBuddyInfoReq.getLanguage().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }

            for (int i = 0; i < postBuddyInfoReq.getPersonality().size(); i++) {
                String savePreferenceQeury = "INSERT INTO personalityInfo_b (buddyIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{buddyIdx, postBuddyInfoReq.getPersonality().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }
            for (int i = 0; i < postBuddyInfoReq.getHobby().size(); i++) {
                String savePreferenceQeury = "INSERT INTO hobbyInfo_b (buddyIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{buddyIdx, postBuddyInfoReq.getHobby().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }
            for (int i = 0; i < postBuddyInfoReq.getWanttodo().size(); i++) {
                String savePreferenceQeury = "INSERT INTO wanttodoInfo_b (buddyIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{buddyIdx, postBuddyInfoReq.getWanttodo().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }
            String saveMajorSexQuery = "UPDATE buddy SET sex = ?, major = ?, continent = ?, motherTongue = ? WHERE buddyIdx = ?";
            Object[] saveMajorSexParams = new Object[]{postBuddyInfoReq.getSex(), postBuddyInfoReq.getMajor(), postBuddyInfoReq.getContinent(), postBuddyInfoReq.getMotherTongue(), buddyIdx};
            this.jdbcTemplate.update(saveMajorSexQuery, saveMajorSexParams);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }


    public BuddyProfile getBuddyProfile(String buddyId) {
        String profileQuery = "SELECT buddyIdx, `name`, ID, password, studentId, continent, profileImg FROM buddy WHERE ID = ?";
        return this.jdbcTemplate.queryForObject(profileQuery,
                (rs, rowNum) -> new BuddyProfile (
                        rs.getInt("buddyIdx"),
                        rs.getString("name"),
                        rs.getString("ID"),
                        rs.getString("password"),
                        rs.getString("studentId"),
                        rs.getString("continent"),
                        rs.getString("profileImg")
                ),
                buddyId);
    }
    public void updateProfileById(String buddyId, everybuddy.project.domain.buddy.dto.ModifyProfileReq modifyProfileReq) throws BaseException {
        try {
            String updateProfileQuery = "UPDATE buddy SET nationality = ?, profileImg = ? WHERE ID = ?";
            Object[] updateProfileParams = new Object[]{modifyProfileReq.getNationality(), modifyProfileReq.getProfileImg(), buddyId};
            this.jdbcTemplate.update(updateProfileQuery, updateProfileParams);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
