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
        this.jdbcTemplate.update("UPDATE matching_state SET state = 1 WHERE matchingIdx = 1");
    }

    public int getSeoulmateIdx(int buddyIdx) {
        String getSeoulmateIdxQuery = "SELECT seoulmateIdx FROM matching WHERE buddyIdx = ?";
        return this.jdbcTemplate.queryForObject(getSeoulmateIdxQuery, int.class, buddyIdx);
    }

    // queryForObject: 단일 결과 행을 반환하는 쿼리를 실행할 때 주로 사용된다.
    // ✔ <T> T queryForObject(String sql, Class<T> requiredType)
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
        return this.jdbcTemplate.queryForObject("SELECT state FROM matching_state WHERE matchingIdx = 1", int.class);
    }

    public void deleteMatching() {
        this.jdbcTemplate.update("UPDATE matching_state SET state = 0 WHERE matchingIdx = 1");
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
        return (double)matches;
    }

    // 1: [1,2,3]
    // 2: [2,1,3]
    public Map<String, List<String>> Providers() {
        String getSeoulmatePresQuery = "SELECT sm.seoulmateIdx, maj.majors, se.sexs, cont.continents, lang.languages, pers.personalities, hobb.hobbies, want.wanttodos\n" +
                "FROM seoulmate sm\n" +
                "         LEFT JOIN (SELECT seoulmateIdx, GROUP_CONCAT(`no`) AS majors FROM major_s GROUP BY seoulmateIdx) maj ON sm.seoulmateIdx = maj.seoulmateIdx\n" +
                "         LEFT JOIN (SELECT seoulmateIdx, GROUP_CONCAT(`no`) AS sexs FROM sex_s GROUP BY seoulmateIdx) se ON sm.seoulmateIdx = se.seoulmateIdx\n" +
                "         LEFT JOIN (SELECT seoulmateIdx, GROUP_CONCAT(`no`) AS continents FROM continent_s GROUP BY seoulmateIdx) cont ON sm.seoulmateIdx = cont.seoulmateIdx\n" +
                "        LEFT JOIN (SELECT seoulmateIdx, GROUP_CONCAT(`no`) AS languages FROM language_s GROUP BY seoulmateIdx) lang ON sm.seoulmateIdx = lang.seoulmateIdx\n" +
                "         LEFT JOIN (SELECT seoulmateIdx, GROUP_CONCAT(`no`) AS personalities FROM personality_s GROUP BY seoulmateIdx) pers ON sm.seoulmateIdx = pers.seoulmateIdx\n" +
                "         LEFT JOIN (SELECT seoulmateIdx, GROUP_CONCAT(`no`) AS hobbies FROM hobby_s GROUP BY seoulmateIdx) hobb ON sm.seoulmateIdx = hobb.seoulmateIdx\n" +
                "         LEFT JOIN (SELECT seoulmateIdx, GROUP_CONCAT(`no`) AS wanttodos FROM wanttodo_s GROUP BY seoulmateIdx) want ON sm.seoulmateIdx = want.seoulmateIdx;\n";
        List<GetSeoulmatePre> seoulmatePres = this.jdbcTemplate.query(getSeoulmatePresQuery, new SeoulmatePreMapper());

        String getBuddyInfosQuery ="SELECT b.buddyIdx, b.major, b.sex, b.continent, b.motherTongue, lang.languages, pers.personalities, hobb.hobbies, want.wanttodos\n" +
                "FROM buddy b\n" +
                "         LEFT JOIN (SELECT buddyIdx, GROUP_CONCAT(`no`) AS languages FROM languageInfo_b GROUP BY buddyIdx) lang ON b.buddyIdx = lang.buddyIdx\n" +
                "         LEFT JOIN (SELECT buddyIdx, GROUP_CONCAT(`no`) AS personalities FROM personalityInfo_b GROUP BY buddyIdx) pers ON b.buddyIdx = pers.buddyIdx\n" +
                "         LEFT JOIN (SELECT buddyIdx, GROUP_CONCAT(`no`) AS hobbies FROM hobbyInfo_b GROUP BY buddyIdx) hobb ON b.buddyIdx = hobb.buddyIdx\n" +
                "         LEFT JOIN (SELECT buddyIdx, GROUP_CONCAT(`no`) AS wanttodos FROM wanttodoInfo_b GROUP BY buddyIdx) want ON b.buddyIdx = want.buddyIdx";
        List<GetBuddyInfo> buddyInfos = this.jdbcTemplate.query(getBuddyInfosQuery, new BuddyInfoMapper());


        Map<String, Double> preferrank_s_score = new HashMap<>();
        String[] items = new String[] {"personality", "language", "hobby", "wanttodo", "major", "sex", "continent"};

        // Calculate
        Map<String, List<String>> provider = new HashMap<>();
        for (GetSeoulmatePre seoulmatePre : seoulmatePres) {
            String seoulmateIdx = seoulmatePre.getSeoulmateIdx();
            // preferrank 불러오기!!
            String getPreferrank_sQuery = "SELECT `first`, `second`, `third`, `fourth`, `fifth`, `sixth`, `seventh` FROM preferrank_s WHERE seoulmateIdx = ?";
            Preferrank_s preferrank_s = this.jdbcTemplate.queryForObject(getPreferrank_sQuery,
                    (rs, rowNum) -> new Preferrank_s(
                            rs.getString("first"),
                            rs.getString("second"),
                            rs.getString("third"),
                            rs.getString("fourth"),
                            rs.getString("fifth"),
                            rs.getString("sixth"),
                            rs.getString("seventh")
                    ),
                    seoulmateIdx);
            Map<Integer, Double> buddyScores = new HashMap<>();

            for (GetBuddyInfo buddyInfo : buddyInfos) {
                String buddyIdx = buddyInfo.getBuddyIdx();
                Map<String, Double> weigth_score = new HashMap<>();
                for (int i=0; i<7; i++) {
                    weigth_score.put(items[i], 1.0);
                }
                for (int i=0; i<7; i++) {
                    if (preferrank_s.getFirst().equals(items[i])) weigth_score.put(items[i], 1.6);
                    else if (preferrank_s.getSecond().equals(items[i])) weigth_score.put(items[i], 1.5);
                    else if (preferrank_s.getThird().equals(items[i])) weigth_score.put(items[i], 1.4);
                    else if (preferrank_s.getFourth().equals(items[i])) weigth_score.put(items[i], 1.3);
                    else if (preferrank_s.getFifth().equals(items[i])) weigth_score.put(items[i], 1.2);
                    else if (preferrank_s.getSixth().equals(items[i])) weigth_score.put(items[i], 1.1);
                }
                double score = 0.0;

                // Calculate compatibility
                preferrank_s_score.put(items[0], calculateMatchScore(seoulmatePre.getPersonalities(), buddyInfo.getPersonalities()));

                preferrank_s_score.put(items[1], calculateMatchScore(seoulmatePre.getLanguages(), buddyInfo.getLanguages()));
                preferrank_s_score.put(items[2], calculateMatchScore(seoulmatePre.getHobbies(), buddyInfo.getHobbies()));
                preferrank_s_score.put(items[3], calculateMatchScore(seoulmatePre.getWanttodos(), buddyInfo.getWanttodos()));

                // Considering major and sex as single value fields
                if (seoulmatePre.getMajors().contains(buddyInfo.getMajor())) {
                    preferrank_s_score.put(items[4], 1.0);
                } else preferrank_s_score.put(items[4], 0.0);
                if (seoulmatePre.getSexs().contains(buddyInfo.getSex())) {
                    preferrank_s_score.put(items[5], 1.0);
                } else preferrank_s_score.put(items[5], 0.0);
                if (seoulmatePre.getContinents().contains(buddyInfo.getContinent())) {
                    preferrank_s_score.put(items[6], 1.0);
                } else preferrank_s_score.put(items[6], 0.0);

                for (int i=0; i<7; i++) {
                    preferrank_s_score.put(items[i], preferrank_s_score.get(items[i])*weigth_score.get(items[i]));
                }
                for (int i=0; i<7; i++) {
                    // 소수점 셋째자리에서 반올림.
                    score += Math.round(preferrank_s_score.get(items[i])*100)/100.0;
                }

                //MotherTongue 존재 유무 검사 -> 0.05 가중치 값 미리 계산
                if (seoulmatePre.getLanguages().contains(buddyInfo.getMotherTongue())) {
                    score += 0.05;
                };

                buddyScores.put(Integer.parseInt(buddyIdx), Math.round(score*100)/100.0);
            }
            // Sorting buddyScores by values in descending order
            List<Map.Entry<Integer, Double>> sortedBuddies = new ArrayList<>(buddyScores.entrySet());
            sortedBuddies.sort(Map.Entry.<Integer, Double>comparingByValue().reversed());

            // // Store sorted results in the main map
            System.out.println(" -----------------------------------------------");
            System.out.println("<<Seoulmate>>");
            System.out.println("seoulmateIdx: " + seoulmateIdx);
            List<String> sortedBuddy = new ArrayList<>();
            for (Map.Entry<Integer, Double> entry : sortedBuddies) {
                sortedBuddy.add(Integer.toString(entry.getKey()));
                System.out.println("buddyIdx: " + entry.getKey() + " score: " + entry.getValue());
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

        Map<String, Double> preferrank_b_score = new HashMap<>();
        String[] itemb = new String[] {"personality", "language", "hobby", "wanttodo", "major", "sex"};

        // calculate
        Map<String, List<String>> demander = new HashMap<>();
        for (GetBuddyPre buddyPre : buddyPres) {
            String buddyIdx = buddyPre.getBuddyIdx();
            // preferrank 불러오기!!
            String getPreferrank_bQuery = "SELECT `first`, `second`, `third`, `fourth`, `fifth`, `sixth` FROM preferrank_b WHERE buddyIdx = ?";
            Preferrank_b preferrank_b = this.jdbcTemplate.queryForObject(getPreferrank_bQuery,
                    (rs, rowNum) -> new Preferrank_b(
                            rs.getString("first"),
                            rs.getString("second"),
                            rs.getString("third"),
                            rs.getString("fourth"),
                            rs.getString("fifth"),
                            rs.getString("sixth")
                    )
                    , buddyIdx);

            Map<Integer, Double> seoulmateScores = new HashMap<>();

            for (GetSeoulmateInfo seoulmateInfo : seoulmateInfos) {
                String seoulmateIdx = seoulmateInfo.getSeoulmateIdx();
                double score = 0.0;

                // Calculate compatibility
                preferrank_b_score.put(itemb[0], calculateMatchScore(buddyPre.getPersonalities(), seoulmateInfo.getPersonalities()));
                preferrank_b_score.put(itemb[1], calculateMatchScore(buddyPre.getLanguages(), seoulmateInfo.getLanguages()));
                preferrank_b_score.put(itemb[2], calculateMatchScore(buddyPre.getHobbies(), seoulmateInfo.getHobbies()));
                preferrank_b_score.put(itemb[3], calculateMatchScore(buddyPre.getWanttodos(), seoulmateInfo.getWanttodos()));

                // Considering major and sex as single value fields
                if (buddyPre.getMajors().contains(seoulmateInfo.getMajor())) {
                    preferrank_b_score.put(itemb[4], 1.0);
                } else preferrank_b_score.put(itemb[4], 0.0);
                if (buddyPre.getSexs().contains(seoulmateInfo.getSex())) {
                    preferrank_b_score.put(itemb[5], 1.0);
                } else preferrank_b_score.put(itemb[5], 0.0);

                for (int i=0; i<6; i++) {
                    if (preferrank_b.getFirst().equals(itemb[i])) preferrank_b_score.put(itemb[i], preferrank_b_score.get(itemb[i])*1.5);
                    else if (preferrank_b.getSecond().equals(itemb[i])) preferrank_b_score.put(itemb[i], preferrank_b_score.get(itemb[i])*1.4);
                    else if (preferrank_b.getThird().equals(itemb[i])) preferrank_b_score.put(itemb[i], preferrank_b_score.get(itemb[i])*1.3);
                    else if (preferrank_b.getFourth().equals(itemb[i])) preferrank_b_score.put(itemb[i], preferrank_b_score.get(itemb[i])*1.2);
                    else if (preferrank_b.getFifth().equals(itemb[i])) preferrank_b_score.put(itemb[i], preferrank_b_score.get(itemb[i])*1.1);
                }
                for (int i=0; i<6; i++) {
                    // 소수점 셋째자리에서 반올림.
                    score += Math.round(preferrank_b_score.get(itemb[i])*100)/100.0;
                }

                seoulmateScores.put(Integer.parseInt(seoulmateIdx), Math.round(score*100)/100.0);  // Total score divided by the number of categories
            }
            // Sorting buddyScores by values in descending order
            List<Map.Entry<Integer, Double>> sortedSeoulmates = new ArrayList<>(seoulmateScores.entrySet());
            sortedSeoulmates.sort(Map.Entry.<Integer, Double>comparingByValue().reversed());

            // // Store sorted results in the main map
            System.out.println(" -----------------------------------------------");
            System.out.println("<<Buddy>>");
            System.out.println("buddyIdx: " + buddyIdx);
            List<String> sortedSeoulmate = new ArrayList<>();
            for (Map.Entry<Integer, Double> entry : sortedSeoulmates) {
                sortedSeoulmate.add(Integer.toString(entry.getKey()));
                System.out.println("seoulmateIdx: " + entry.getKey() + " score: " + entry.getValue());
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
        this.jdbcTemplate.update("UPDATE matching_state SET state = 1 WHERE matchingIdx = 1");
    }

    public void saveChatroom(Map<String, List<String>> matches) {
        int groupIdx = 1;
        for (Map.Entry<String, List<String>> entry : matches.entrySet()) {
            String demanderIdx = entry.getKey();
            List<String> providerIdxs = entry.getValue();
            String saveChatroomSeoulmateQuery = "INSERT INTO chat_group (group_id, user_id, user_type) VALUES (?, ?, 's')";
            this.jdbcTemplate.update(saveChatroomSeoulmateQuery, groupIdx, demanderIdx);
            for (int i=0; i<providerIdxs.size(); i++) {
                String saveChatroomBuddyQuery = "INSERT INTO chat_group (group_id, user_id, user_type) VALUES (?, ?, 'b')";
                this.jdbcTemplate.update(saveChatroomBuddyQuery, groupIdx, Integer.parseInt(providerIdxs.get(i)));
            }
        }
        this.jdbcTemplate.update("UPDATE matching_state SET state = 1 WHERE matchingIdx = 1");
    }

}
