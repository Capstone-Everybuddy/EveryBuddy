package everybuddy.project.domain.seoulmate;

import everybuddy.project.domain.seoulmate.dto.PostLoginReq;
import everybuddy.project.domain.seoulmate.dto.PostLoginRes;
import everybuddy.project.domain.seoulmate.dto.PostSeoulmateReq;
import everybuddy.project.domain.seoulmate.entity.Seoulmate;
import everybuddy.project.global.config.BaseException;
import everybuddy.project.global.config.BaseResponseStatus;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

import static everybuddy.project.global.config.BaseResponseStatus.DATABASE_ERROR;

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

    public Seoulmate getPwd(PostLoginReq postLoginReq) throws BaseException {
        try {
            String getPwdQuery = "SELECT seoulmateIdx,name, ID, password, studentId, sex, major, certified, profileImg, `state` FROM seoulmate WHERE ID = ?";
            String getPwdParams = postLoginReq.getID();
            return this.jdbctemplate.queryForObject(getPwdQuery,
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

}
