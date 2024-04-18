package everybuddy.project.domain.matching;

import everybuddy.project.domain.matching.dto.*;
import everybuddy.project.domain.matching.entity.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.*;

@Repository
public class MatchingDao {
    private JdbcTemplate jdbcTemplate;

    public MatchingDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public void postMatching(List<Matching> postMatchingReq) {
        for (int i=0; i<postMatchingReq.size(); i++) {
            for (int j=0; j<postMatchingReq.get(i).getBuddyIdxs().size(); j++) {
                String postMatchingQuery = "INSERT INTO matching (seoulmateIdx, buddyIdx) VALUES (?, ?)";
                Object[] postMatchingParams = new Object[]{postMatchingReq.get(i).getSeoulmateIdx(), postMatchingReq.get(i).getBuddyIdxs().get(j)};
                this.jdbcTemplate.update(postMatchingQuery, postMatchingParams);
            }
        }
        this.jdbcTemplate.update("UPDATE seoulmate SET state = 1 WHERE seoulmateIdx = 1");
    }

    // queryForObject: 단일 결과 행을 반환하는 쿼리를 실행할 때 주로 사용된다.
    // ✔ <T> T queryForObject(String sql, Class<T> requiredType)
    public GetMatchingRes getMatching(Integer buddyIdx) {
        String getMatchingQuery = "SELECT s.name as seoulmateName, s.ID as seoulmateID, s.profileImg as seoulmateProfileImg, b.name as buddyName, b.ID as buddyID, b.profileImg as buddyProfileImg FROM `buddy` AS `b` INNER JOIN `matching` as `m` ON b.buddyIdx = m.buddyIdx INNER JOIN `seoulmate` AS `s` ON m.seoulmateIdx = s.seoulmateIdx WHERE b.buddyIdx = ?";
        String getMatchingParams = String.valueOf(buddyIdx);
        GetMatchingRes getMatchingRes = this.jdbcTemplate.queryForObject(
                getMatchingQuery,
                (rs, rowNum) -> new GetMatchingRes(
                        rs.getString("seoulmateName"),
                        rs.getString("seoulmateID"),
                        rs.getString("seoulmateProfileImg"),
                        rs.getString("buddyName"),
                        rs.getString("buddyID"),
                        rs.getString("buddyProfileImg")
                        ),
                getMatchingParams
        );
        return getMatchingRes;
    }


    // query: 결과를 List 형태로 반환하는 쿼리를 실행할 때 주로 사용된다.
    // 결과는 RowMapper 인터페이스를 구현하는 객체를 사용하여 각 행을 매핑하여 반환한다.
    // 결과 집합이 없을 때는 빈 List를 반환한다.
    // ✔ <T> List<T> query(String sql, RowMapper<T> rowMapper)
    public List<GetMatchingRes> getMatchings(Integer seoulmateIdx) {
        String getMatchingsQuery = "SELECT s.name as seoulmateName, s.ID as seoulmateID, s.profileImg as seoulmateProfileImg, b.name as buddyName, b.ID as buddyID, b.profileImg as buddyProfileImg FROM `buddy` AS `b` INNER JOIN `matching` as `m` ON b.buddyIdx = m.buddyIdx INNER JOIN `seoulmate` AS `s` ON m.seoulmateIdx = s.seoulmateIdx WHERE s.seoulmateIdx = ?";
        String getMatchingsParams = String.valueOf(seoulmateIdx);
        List<GetMatchingRes> getMatchingsRes = this.jdbcTemplate.query(
                getMatchingsQuery,
                (rs, rowNum) -> new GetMatchingRes(
                        rs.getString("seoulmateName"),
                        rs.getString("seoulmateID"),
                        rs.getString("seoulmateProfileImg"),
                        rs.getString("buddyName"),
                        rs.getString("buddyID"),
                        rs.getString("buddyProfileImg")
                ),
                getMatchingsParams
        );
        return getMatchingsRes;
    }

    public List<Team> getEntire() {
        String getSeoulmateIdxQuery = "SELECT seoulmateIdx FROM seoulmate";
        List<Integer> seoulmateIdxs = this.jdbcTemplate.query(getSeoulmateIdxQuery,
                (rs, rowNum) -> (rs.getInt("seoulmateIdx"))
        );
        List<Team> teams = new ArrayList<>();
        for (int i=0; i<seoulmateIdxs.size(); i++) {
            int seoulmateIdx = seoulmateIdxs.get(i);
            String getSeoulmateQuery = "SELECT * FROM seoulmate WHERE seoulmateIdx = ?";
            Seoulmate seoulmate = this.jdbcTemplate.queryForObject(
                    getSeoulmateQuery,
                    (rs, rowNum) -> new Seoulmate(
                            rs.getInt("seoulmateIdx"),
                            rs.getString("name"),
                            rs.getString("ID"),
                            rs.getString("password"),
                            rs.getString("studentId"),
                            rs.getInt("sex"),
                            rs.getInt("major"),
                            rs.getInt("certified"),
                            rs.getString("profileImg"),
                            rs.getInt("state")
                    ),
                    seoulmateIdx);
            String getBuddiesQuery = "SELECT w.buddyIdx, w.name, w.ID, w.studentId, w.sex, w.major, w.continent,w.certified, w.profileImg, w.state FROM " +
                    "(SELECT s.seoulmateIdx, b.buddyIdx, b.name, b.ID, b.studentId, b.sex, b.major, b.continent, b.certified, b.profileImg, b.state FROM buddy AS b " +
                    "INNER JOIN matching AS m ON b.buddyIdx=m.buddyIdx INNER JOIN seoulmate AS s ON m.seoulmateIdx=s.seoulmateIdx) w WHERE seoulmateIdx=?";
            List<Buddy> buddies = this.jdbcTemplate.query(
                    getBuddiesQuery,
                    (rs, rowNum) -> new Buddy(
                            rs.getInt("buddyIdx"),
                            rs.getString("name"),
                            rs.getString("ID"),
                            rs.getString("studentId"),
                            rs.getInt("sex"),
                            rs.getInt("major"),
                            rs.getString("continent"),
                            rs.getInt("certified"),
                            rs.getString("profileImg"),
                            rs.getInt("state")
                    ),
                    seoulmateIdx);
            Team team = new Team(seoulmate, buddies);
            teams.add(team);
        }
        return teams;
    }

    public int getState() {
        return this.jdbcTemplate.queryForObject("SELECT state FROM seoulmate WHERE seoulmateIdx = 1", int.class);
    }

    public void deleteMatching() {
        this.jdbcTemplate.update("UPDATE seoulmate SET state = 0 WHERE seoulmateIdx = 1");
        /* execute() 메서드
        이외에 임의의 SQL을 실행할 때는 execute() 메서드를 사용할 수 있다. 테이블을 생성하는 DDL 등에 사용할 수 있다.
        */
        this.jdbcTemplate.execute("DROP TABLE if exists `matching`");
        this.jdbcTemplate.execute("CREATE TABLE if not exists `matching` (\n" +
                "                            `matchingIdx` INT NOT NULL AUTO_INCREMENT,\n" +
                "                            `buddyIdx` INT NOT NULL,\n" +
                "                            `seoulmateIdx` INT NOT NULL,\n" +
                "                            `state` INT NOT NULL DEFAULT 1,\n" +
                "                            PRIMARY KEY (`matchingIdx`),\n" +
                "                            UNIQUE INDEX `matchingIdx_UNIQUE` (`matchingIdx` ASC) VISIBLE,\n" +
                "                            CONSTRAINT `fk_matching_buddy`\n" +
                "                                FOREIGN KEY (`buddyIdx`)\n" +
                "                                    REFERENCES `buddy` (`buddyIdx`)\n" +
                "                                    ON DELETE NO ACTION\n" +
                "                                    ON UPDATE NO ACTION,\n" +
                "                            CONSTRAINT `fk_matching_seoulmate1`\n" +
                "                                FOREIGN KEY (`seoulmateIdx`)\n" +
                "                                    REFERENCES `seoulmate` (`seoulmateIdx`)\n" +
                "                                    ON DELETE NO ACTION\n" +
                "                                    ON UPDATE NO ACTION)");
    }
}
