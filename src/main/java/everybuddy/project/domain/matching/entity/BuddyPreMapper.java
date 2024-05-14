package everybuddy.project.domain.matching.entity;

import everybuddy.project.domain.matching.dto.GetBuddyPre;
import everybuddy.project.domain.matching.dto.GetSeoulmateInfo;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

public class BuddyPreMapper implements RowMapper<GetBuddyPre> {
    @Override
    public GetBuddyPre mapRow(ResultSet rs, int rowNum) throws SQLException {
        String buddyIdx = Integer.toString(rs.getInt("buddyIdx"));
        List<String> majors = Arrays.asList(rs.getString("majors").split(","));
        List<String> sexs = Arrays.asList(rs.getString("sexs").split(","));
        List<String> languages = Arrays.asList(rs.getString("languages").split(","));
        List<String> personalities = Arrays.asList(rs.getString("personalities").split(","));
        List<String> hobbies = Arrays.asList(rs.getString("hobbies").split(","));
        List<String> wanttodos = Arrays.asList(rs.getString("wanttodos").split(","));

        return new GetBuddyPre(buddyIdx, majors, sexs, languages, personalities, hobbies, wanttodos);
    }
}
