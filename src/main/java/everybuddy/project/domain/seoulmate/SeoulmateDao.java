package everybuddy.project.domain.seoulmate;

import everybuddy.project.domain.seoulmate.dto.*;
import everybuddy.project.domain.seoulmate.entity.Seoulmate;
import everybuddy.project.domain.seoulmate.entity.SeoulmateProfile;
import everybuddy.project.global.config.BaseException;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

import java.util.Arrays;
import java.util.List;

import static everybuddy.project.global.config.BaseResponseStatus.DATABASE_ERROR;

@Repository
public class SeoulmateDao {
    private JdbcTemplate jdbcTemplate;

    public SeoulmateDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public int createSeoulmate(PostSeoulmateReq postSeoulmateReq) {
        String createSeoulmateQuery = "insert into seoulmate (`name`, ID, password, profileImg) values (?, ?, ?, ?)";
        Object[] createSeoulmateParams = new Object[]{postSeoulmateReq.getName(), postSeoulmateReq.getID(), postSeoulmateReq.getPassword1(), postSeoulmateReq.getProfileImg()};
        this.jdbcTemplate.update(createSeoulmateQuery, createSeoulmateParams);
        String selectlastIdx = "select last_insert_id()";
        int seoulmateIdx = this.jdbcTemplate.queryForObject(selectlastIdx, int.class);
        return seoulmateIdx;
    }

    public Seoulmate getPwd(PostLoginReq postLoginReq) throws BaseException {
        try {
            String getPwdQuery = "SELECT seoulmateIdx,name, ID, password, studentId, sex, major, certified, profileImg, `state` FROM seoulmate WHERE ID = ?";
            String getPwdParams = postLoginReq.getID();
            return this.jdbcTemplate.queryForObject(getPwdQuery,
                    (rs, rowNum) -> new Seoulmate(
                            rs.getInt("seoulmateIdx"),
                            rs.getString("name"),
                            rs.getString("ID"),
                            rs.getString("password"),
                            rs.getString("studentId"),
                            rs.getInt("sex"),
                            rs.getString("major"),
                            rs.getInt("certified"),
                            rs.getString("profileImg"),
                            rs.getInt("state")
                    ),
                    getPwdParams
            );
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public void savePreference(PostPreferReq postPreferReq, int seoulmateIdx) throws BaseException {
        try {
            List<String> queries = Arrays.asList(
                    "DELETE FROM preferrank_s WHERE seoulmateIdx = ?",
                    "DELETE FROM personality_s WHERE seoulmateIdx = ?",
                    "DELETE FROM language_s WHERE seoulmateIdx = ?",
                    "DELETE FROM wanttodo_s WHERE seoulmateIdx = ?",
                    "DELETE FROM hobby_s WHERE seoulmateIdx = ?",
                    "DELETE FROM sex_s WHERE seoulmateIdx = ?",
                    "DELETE FROM major_s WHERE seoulmateIdx = ?",
                    "DELETE FROM continent_s WHERE seoulmateIdx = ?"
            );
            for (String query : queries) {
                this.jdbcTemplate.update(query, seoulmateIdx);
            }
            String savePreferrankQeury =
                    "INSERT INTO preferrank_s (seoulmateIdx, `first`, `second`, `third`, `fourth`, `fifth`, `sixth`, `seventh`) values (?, ?, ?, ?, ?, ?, ?, ?)";
            Object[] savePreferrankParams = new Object[]{seoulmateIdx, postPreferReq.getFirst(), postPreferReq.getSecond(), postPreferReq.getThird(),
                    postPreferReq.getFourth(), postPreferReq.getFifth(), postPreferReq.getSixth(), postPreferReq.getSeventh()};
            this.jdbcTemplate.update(savePreferrankQeury, savePreferrankParams);
            for (int i = 0; i < postPreferReq.getFirstList().size(); i++) {
                String savePreferenceQeury = "INSERT INTO "+ postPreferReq.getFirst() +"_s (seoulmateIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{seoulmateIdx, postPreferReq.getFirstList().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }
            for (int i = 0; i < postPreferReq.getSecondList().size(); i++) {
                String savePreferenceQeury = "INSERT INTO "+ postPreferReq.getSecond() +"_s (seoulmateIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{seoulmateIdx, postPreferReq.getSecondList().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }
            for (int i = 0; i < postPreferReq.getThirdList().size(); i++) {
                String savePreferenceQeury = "INSERT INTO "+ postPreferReq.getThird() +"_s (seoulmateIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{seoulmateIdx, postPreferReq.getThirdList().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }
            for (int i = 0; i < postPreferReq.getFourthList().size(); i++) {
                String savePreferenceQeury = "INSERT INTO " + postPreferReq.getFourth() + "_s (seoulmateIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{seoulmateIdx, postPreferReq.getFourthList().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }
            for (int i = 0; i < postPreferReq.getFifthList().size(); i++) {
                String savePreferenceQeury = "INSERT INTO "+ postPreferReq.getFifth() +"_s (seoulmateIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{seoulmateIdx, postPreferReq.getFifthList().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }
            for (int i = 0; i < postPreferReq.getSixthList().size(); i++) {
                String savePreferenceQeury = "INSERT INTO "+ postPreferReq.getSixth() +"_s (seoulmateIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{seoulmateIdx, postPreferReq.getSixthList().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }
            for (int i = 0; i < postPreferReq.getSeventhList().size(); i++) {
                String savePreferenceQeury = "INSERT INTO " + postPreferReq.getSeventh() + "_s (seoulmateIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{seoulmateIdx, postPreferReq.getSeventhList().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public void saveInfo(PostInfoReq postInfoReq, int seoulmateIdx) throws BaseException {
        try {
            for (int i = 0; i < postInfoReq.getLanguage().size(); i++) {
                String savePreferenceQeury = "INSERT INTO languageInfo_s (seoulmateIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{seoulmateIdx, postInfoReq.getLanguage().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }

            for (int i = 0; i < postInfoReq.getPersonality().size(); i++) {
                String savePreferenceQeury = "INSERT INTO personalityInfo_s (seoulmateIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{seoulmateIdx, postInfoReq.getPersonality().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }
            for (int i = 0; i < postInfoReq.getHobby().size(); i++) {
                String savePreferenceQeury = "INSERT INTO hobbyInfo_s (seoulmateIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{seoulmateIdx, postInfoReq.getHobby().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }
            for (int i = 0; i < postInfoReq.getWanttodo().size(); i++) {
                String savePreferenceQeury = "INSERT INTO wanttodoInfo_s (seoulmateIdx, `no`) values (?, ?)";
                Object[] savePreferenceParams = new Object[]{seoulmateIdx, postInfoReq.getWanttodo().get(i)};
                this.jdbcTemplate.update(savePreferenceQeury, savePreferenceParams);
            }
            String saveMajorSexQuery = "UPDATE seoulmate SET sex = ?, major = ? WHERE seoulmateIdx = ?";
            Object[] saveMajorSexParams = new Object[]{postInfoReq.getSex(), postInfoReq.getMajor(), seoulmateIdx};
            this.jdbcTemplate.update(saveMajorSexQuery, saveMajorSexParams);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
    public SeoulmateProfile getSeoulmateProfile(String seoulmateId) {
        String profileQuery = "SELECT seoulmateIdx, name, ID, password, studentId, sex, major, profileImg FROM seoulmate WHERE ID = ?";
        return this.jdbcTemplate.queryForObject(profileQuery,
                (rs, rowNum) -> new SeoulmateProfile (
                        rs.getInt("seoulmateIdx"),
                        rs.getString("name"),
                        rs.getString("ID"),
                        rs.getString("password"),
                        rs.getString("studentId"),
                        rs.getInt("sex"),
                        rs.getString("major"),
                        rs.getString("profileImg")
                ),
                seoulmateId);
    }
}
