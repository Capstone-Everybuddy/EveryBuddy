package everybuddy.project.domain.matching;

import everybuddy.project.domain.matching.dto.GetMatchingRes;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class MatchingDao {
    private JdbcTemplate jdbcTemplate;

    public MatchingDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
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
}
