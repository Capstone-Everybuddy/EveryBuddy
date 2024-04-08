package everybuddy.project.domain.seoulmate;

import everybuddy.project.domain.seoulmate.dto.PostSeoulmateReq;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Repository
public class SeoulmateDao {
    private JdbcTemplate jdbctemplate;

    public SeoulmateDao(DataSource dataSource) {
        this.jdbctemplate = new JdbcTemplate(dataSource);
    }

    public int createSeoulmate(PostSeoulmateReq postSeoulmateReq) {
        String createSeoulmateQuery = "insert into seoulmate (name, ID, password, profileImg) values (?, ?, ?, ?)";
        Object[] createSeoulmateParams = new Object[]{postSeoulmateReq.getName(), postSeoulmateReq.getID(), postSeoulmateReq.getPassword1(), postSeoulmateReq.getProfileImg()};
        this.jdbctemplate.update(createSeoulmateQuery, createSeoulmateParams);
        String selectlastIdx = "select last_insert_id()";
        int seoulmateIdx = this.jdbctemplate.queryForObject(selectlastIdx, int.class);
        return seoulmateIdx;
    }
}
