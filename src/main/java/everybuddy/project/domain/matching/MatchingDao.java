package everybuddy.project.domain.matching;

import everybuddy.project.domain.matching.dto.GetMatchingRes;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Repository
public class MatchingDao {
    private JdbcTemplate jdbcTemplate;

    public MatchingDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }


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
}
