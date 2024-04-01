package everybuddy.project.domain.matching;

import everybuddy.project.domain.matching.dto.GetMatchingRes;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Repository
public class MatchingDao {
    private JdbcTemplate jdbcTemplate;

    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public GetMatchingRes getMatching(Integer matchingIdx) {
        String getMatchingQuery = "SELECT buddyIdx, seoulmateIdx FROM buddy WHERE matchingIdx = ?";
        GetMatchingRes getMatchingRes = this.jdbcTemplate.queryForObject(
                getMatchingQuery,
                (rs, rowNum) -> new GetMatchingRes(
                        rs.getInt("buddyIdx"),
                        rs.getInt("seoulmateIdx")
                        ),
                matchingIdx
        );
        return getMatchingRes;
    }
}
