package everybuddy.project.domain.matching;

import everybuddy.project.domain.matching.dto.*;
import everybuddy.project.domain.matching.entity.*;
import everybuddy.project.global.config.BaseException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.*;

import static everybuddy.project.global.config.BaseResponseStatus.*;

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
                            rs.getString("profileImg"),
                            rs.getInt("major"),
                            rs.getInt("sex"),
                            rs.getInt("certified"),
                            rs.getInt("state")
                    ),
                    seoulmateIdx);
            String getBuddiesQuery = "SELECT w.buddyIdx, w.name, w.ID, w.password, w.studentId, w.profileImg, w.major, w.sex, w.continent, w. motherTongue, w.certified, w.state FROM " +
                    "(SELECT s.seoulmateIdx, b.buddyIdx, b.name, b.ID, b.password, b.studentId, b.profileImg, b.major, b.sex, b.continent, b. motherTongue, b.certified, b.state FROM buddy AS b " +
                    "INNER JOIN matching AS m ON b.buddyIdx=m.buddyIdx INNER JOIN seoulmate AS s ON m.seoulmateIdx=s.seoulmateIdx) w WHERE seoulmateIdx=?";
            List<Buddy> buddies = this.jdbcTemplate.query(
                    getBuddiesQuery,
                    (rs, rowNum) -> new Buddy(
                            rs.getInt("buddyIdx"),
                            rs.getString("name"),
                            rs.getString("ID"),
                            rs.getString("password"),
                            rs.getString("studentId"),
                            rs.getString("profileImg"),
                            rs.getInt("major"),
                            rs.getInt("sex"),
                            rs.getInt("continent"),
                            rs.getInt("motherTongue"),
                            rs.getInt("certified"),
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
        this.jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS `matching` " +
                        "(`buddyIdx` INT NOT NULL, " +
                        "`seoulmateIdx` INT NOT NULL, " +
                        "PRIMARY KEY (`buddyIdx`, `seoulmateIdx`), " +
                        "INDEX `fk_matching_buddy_idx` (`buddyIdx` ASC) VISIBLE, " +
                        "INDEX `fk_matching_seoulmate1_idx` (`seoulmateIdx` ASC) VISIBLE, " +
                        "CONSTRAINT `fk_matching_buddy` FOREIGN KEY (`buddyIdx`) " +
                        "REFERENCES `buddy` (`buddyIdx`) ON DELETE NO ACTION ON UPDATE NO ACTION, " +
                        "CONSTRAINT `fk_matching_seoulmate1` " +
                        "FOREIGN KEY (`seoulmateIdx`) " +
                        "REFERENCES `seoulmate` (`seoulmateIdx`) ON DELETE NO ACTION ON UPDATE NO ACTION)");
    }


    private double calculateMatchScore(List<String> seoulmateList, List<String> buddyList) {
        int matches = 0;
        for (String element : seoulmateList) {
            if (buddyList.contains(element)) {
                matches++;
            }
        }
        return matches;
    }

    // 1: [1,2,3]
    // 2: [2,1,3]
    public Map<String, List<String>> Providers() {
        String getSeoulmatePresQuery = "SELECT sm.seoulmateIdx, maj.majors, se.sexs, cont.continents, lang.languages, pers.personalities, hobb.hobbies, want.wanttodos\n" +
                "FROM seoulmate sm\n" +
                "         LEFT JOIN (SELECT seoulmateIdx, GROUP_CONCAT(`no`) AS majors FROM major_s GROUP BY seoulmateIdx) maj ON sm.seoulmateIdx = maj.seoulmateIdx\n" +
                "         LEFT JOIN (SELECT seoulmateIdx, GROUP_CONCAT(`no`) AS sexs FROM sex_s GROUP BY seoulmateIdx) se ON sm.seoulmateIdx = se.seoulmateIdx\n" +
                "         LEFT JOIN (SELECT seoulmateIdx, GROUP_CONCAT(`no`) AS continents FROM continent_s GROUP BY seoulmateIdx) cont ON sm.seoulmateIdx = se.seoulmateIdx\n" +
                "        LEFT JOIN (SELECT seoulmateIdx, GROUP_CONCAT(`no`) AS languages FROM language_s GROUP BY seoulmateIdx) lang ON sm.seoulmateIdx = lang.seoulmateIdx\n" +
                "         LEFT JOIN (SELECT seoulmateIdx, GROUP_CONCAT(`no`) AS personalities FROM personality_s GROUP BY seoulmateIdx) pers ON sm.seoulmateIdx = pers.seoulmateIdx\n" +
                "         LEFT JOIN (SELECT seoulmateIdx, GROUP_CONCAT(`no`) AS hobbies FROM hobby_s GROUP BY seoulmateIdx) hobb ON sm.seoulmateIdx = hobb.seoulmateIdx\n" +
                "         LEFT JOIN (SELECT seoulmateIdx, GROUP_CONCAT(`no`) AS wanttodos FROM wanttodo_s GROUP BY seoulmateIdx) want ON sm.seoulmateIdx = want.seoulmateIdx;\n";
        List<GetSeoulmatePre> seoulmatePres = this.jdbcTemplate.query(getSeoulmatePresQuery, new SeoulmatePreMapper());

        String getBuddyInfosQuery ="SELECT b.buddyIdx, b.major, b.sex, b.continent, lang.languages, pers.personalities, hobb.hobbies, want.wanttodos\n" +
                "FROM buddy b\n" +
                "         LEFT JOIN (SELECT buddyIdx, GROUP_CONCAT(`no`) AS languages FROM languageInfo_b GROUP BY buddyIdx) lang ON b.buddyIdx = lang.buddyIdx\n" +
                "         LEFT JOIN (SELECT buddyIdx, GROUP_CONCAT(`no`) AS personalities FROM personalityInfo_b GROUP BY buddyIdx) pers ON b.buddyIdx = pers.buddyIdx\n" +
                "         LEFT JOIN (SELECT buddyIdx, GROUP_CONCAT(`no`) AS hobbies FROM hobbyInfo_b GROUP BY buddyIdx) hobb ON b.buddyIdx = hobb.buddyIdx\n" +
                "         LEFT JOIN (SELECT buddyIdx, GROUP_CONCAT(`no`) AS wanttodos FROM wanttodoInfo_b GROUP BY buddyIdx) want ON b.buddyIdx = want.buddyIdx";
        List<GetBuddyInfo> buddyInfos = this.jdbcTemplate.query(getBuddyInfosQuery, new BuddyInfoMapper());

        // Calculate
        Map<String, List<String>> provider = new HashMap<>();
        for (GetSeoulmatePre seoulmatePre : seoulmatePres) {
            String seoulmateIdx = seoulmatePre.getSeoulmateIdx();
            Map<Integer, Double> buddyScores = new HashMap<>();

            for (GetBuddyInfo buddyInfo : buddyInfos) {
                String buddyIdx = buddyInfo.getBuddyIdx();
                double score = 0.0;

                // Calculate compatibility
                score += calculateMatchScore(seoulmatePre.getLanguages(), buddyInfo.getLanguages());
                score += calculateMatchScore(seoulmatePre.getPersonalities(), buddyInfo.getPersonalities());
                score += calculateMatchScore(seoulmatePre.getHobbies(), buddyInfo.getHobbies());
                score += calculateMatchScore(seoulmatePre.getWanttodos(), buddyInfo.getWanttodos());

                // Considering major and sex as single value fields
                if (seoulmatePre.getMajors().contains(buddyInfo.getMajor())) {
                    score += 1.0;
                }
                if (seoulmatePre.getSexs().contains(buddyInfo.getSex())) {
                    score += 1.0;
                }

                buddyScores.put(Integer.parseInt(buddyIdx), score);  // Total score divided by the number of categories
            }
            // Sorting buddyScores by values in descending order
            List<Map.Entry<Integer, Double>> sortedBuddies = new ArrayList<>(buddyScores.entrySet());
            sortedBuddies.sort(Map.Entry.<Integer, Double>comparingByValue().reversed());

            // // Store sorted results in the main map
            List<String> sortedBuddy = new ArrayList<>();
            for (Map.Entry<Integer, Double> entry : sortedBuddies) {
                sortedBuddy.add(Integer.toString(entry.getKey()));
            }
            provider.put(seoulmateIdx, sortedBuddy);
        }

        return provider;
    }
    public Map<String, List<String>> Demanders() {

        String getSeoulmateInfosQuery = "SELECT sm.seoulmateIdx, sm.major, sm.sex, lang.languages, pers.personalities, hobb.hobbies, want.wanttodos " +
                "FROM seoulmate sm " +
                "LEFT JOIN (SELECT seoulmateIdx, GROUP_CONCAT(`no`) AS languages FROM languageInfo_s GROUP BY seoulmateIdx) lang ON sm.seoulmateIdx = lang.seoulmateIdx " +
                "LEFT JOIN (SELECT seoulmateIdx, GROUP_CONCAT(`no`) AS personalities FROM personalityInfo_s GROUP BY seoulmateIdx) pers ON sm.seoulmateIdx = pers.seoulmateIdx " +
                "LEFT JOIN (SELECT seoulmateIdx, GROUP_CONCAT(`no`) AS hobbies FROM hobbyInfo_s GROUP BY seoulmateIdx) hobb ON sm.seoulmateIdx = hobb.seoulmateIdx " +
                "LEFT JOIN (SELECT seoulmateIdx, GROUP_CONCAT(`no`) AS wanttodos FROM wanttodoInfo_s GROUP BY seoulmateIdx) want ON sm.seoulmateIdx = want.seoulmateIdx";
        List<GetSeoulmateInfo> seoulmateInfos = jdbcTemplate.query(getSeoulmateInfosQuery, new SeoulmateInfoMapper());

        String getBuddyPresQuery = "SELECT b.buddyIdx, maj.majors, se.sexs, lang.languages, pers.personalities, hobb.hobbies, want.wanttodos\n" +
                "FROM buddy b\n" +
                "         LEFT JOIN (SELECT buddyIdx, GROUP_CONCAT(`no`) AS majors FROM major_b GROUP BY buddyIdx) maj ON b.buddyIdx = maj.buddyIdx\n" +
                "         LEFT JOIN (SELECT buddyIdx, GROUP_CONCAT(`no`) AS sexs FROM sex_b GROUP BY buddyIdx) se ON b.buddyIdx = se.buddyIdx\n" +
                "         LEFT JOIN (SELECT buddyIdx, GROUP_CONCAT(`no`) AS languages FROM language_b GROUP BY buddyIdx) lang ON b.buddyIdx = lang.buddyIdx\n" +
                "         LEFT JOIN (SELECT buddyIdx, GROUP_CONCAT(`no`) AS personalities FROM personality_b GROUP BY buddyIdx) pers ON b.buddyIdx = pers.buddyIdx\n" +
                "         LEFT JOIN (SELECT buddyIdx, GROUP_CONCAT(`no`) AS hobbies FROM hobby_b GROUP BY buddyIdx) hobb ON b.buddyIdx = hobb.buddyIdx\n" +
                "         LEFT JOIN (SELECT buddyIdx, GROUP_CONCAT(`no`) AS wanttodos FROM wanttodo_b GROUP BY buddyIdx) want ON b.buddyIdx = want.buddyIdx";
        List<GetBuddyPre> buddyPres = jdbcTemplate.query(getBuddyPresQuery, new BuddyPreMapper());

        // buddy 계산

        // calculate
        Map<String, List<String>> demander = new HashMap<>();
        for (GetBuddyPre buddyPre : buddyPres) {
            String buddyIdx = buddyPre.getBuddyIdx();
            Map<Integer, Double> seoulmateScores = new HashMap<>();

            for (GetSeoulmateInfo seoulmateInfo : seoulmateInfos) {
                String seoulmateIdx = seoulmateInfo.getSeoulmateIdx();
                double score = 0.0;

                // Calculate compatibility
                score += calculateMatchScore(buddyPre.getLanguages(), seoulmateInfo.getLanguages());
                score += calculateMatchScore(buddyPre.getPersonalities(), seoulmateInfo.getPersonalities());
                score += calculateMatchScore(buddyPre.getHobbies(), seoulmateInfo.getHobbies());
                score += calculateMatchScore(buddyPre.getWanttodos(), seoulmateInfo.getWanttodos());

                // Considering major and sex as single value fields
                if (buddyPre.getMajors().contains(seoulmateInfo.getMajor())) {
                    score += 1.0;
                }
                if (buddyPre.getSexs().contains(seoulmateInfo.getSex())) {
                    score += 1.0;
                }

                seoulmateScores.put(Integer.parseInt(seoulmateIdx), score / 6);  // Total score divided by the number of categories
            }
            // Sorting buddyScores by values in descending order
            List<Map.Entry<Integer, Double>> sortedSeoulmates = new ArrayList<>(seoulmateScores.entrySet());
            sortedSeoulmates.sort(Map.Entry.<Integer, Double>comparingByValue().reversed());

            // // Store sorted results in the main map
            List<String> sortedSeoulmate = new ArrayList<>();
            for (Map.Entry<Integer, Double> entry : sortedSeoulmates) {
                sortedSeoulmate.add(Integer.toString(entry.getKey()));
            }
            demander.put(buddyIdx, sortedSeoulmate);
        }
        return demander;
    }

    public void saveMatching(Map<String, List<String>> matches) {
        for (Map.Entry<String, List<String>> entry : matches.entrySet()) {
            String demanderIdx = entry.getKey();
            List<String> providerIdxs = entry.getValue();
            for (int i=0; i<providerIdxs.size(); i++) {
                String saveMatchingQuery = "INSERT INTO matching (seoulmateIdx, buddyIdx) VALUES (?, ?)";
                this.jdbcTemplate.update(saveMatchingQuery, Integer.parseInt(demanderIdx), Integer.parseInt(providerIdxs.get(i)));
            }
        }
        this.jdbcTemplate.update("UPDATE seoulmate SET state = 1");
    }

}
