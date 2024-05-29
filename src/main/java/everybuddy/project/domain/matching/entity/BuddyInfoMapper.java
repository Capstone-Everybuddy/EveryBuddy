package everybuddy.project.domain.matching.entity;

import everybuddy.project.domain.matching.dto.GetBuddyInfo;
import everybuddy.project.domain.matching.dto.GetSeoulmateInfo;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

public class BuddyInfoMapper implements RowMapper<GetBuddyInfo> {
    @Override
    public GetBuddyInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
        String buddyIdx = rs.getString("buddyIdx");
        String major = rs.getString("major");
        String sex = rs.getString("sex");
        String continent = rs.getString("continent");
        String motherTongue = rs.getString("motherTongue");
        List<String> languages = Arrays.asList(rs.getString("languages").split(","));
        List<String> personalities = Arrays.asList(rs.getString("personalities").split(","));
        List<String> hobbies = Arrays.asList(rs.getString("hobbies").split(","));
        List<String> wanttodos = Arrays.asList(rs.getString("wanttodos").split(","));

        return new GetBuddyInfo(buddyIdx, major, sex, continent, motherTongue, languages, personalities, hobbies, wanttodos);
    }
}
