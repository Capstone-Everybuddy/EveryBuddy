package everybuddy.project.domain.matching.entity;

import everybuddy.project.domain.matching.dto.GetSeoulmateInfo;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

public class SeoulmateInfoMapper implements RowMapper<GetSeoulmateInfo> {
    @Override
    public GetSeoulmateInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
        String seoulmateIdx = rs.getString("seoulmateIdx");
        String major = rs.getString("major");
        String sex = rs.getString("sex");
        List<String> languages = Arrays.asList(rs.getString("languages").split(","));
        List<String> personalities = Arrays.asList(rs.getString("personalities").split(","));
        List<String> hobbies = Arrays.asList(rs.getString("hobbies").split(","));
        List<String> wanttodos = Arrays.asList(rs.getString("wanttodos").split(","));

        return new GetSeoulmateInfo(seoulmateIdx, major, sex, languages, personalities, hobbies, wanttodos);
    }
}