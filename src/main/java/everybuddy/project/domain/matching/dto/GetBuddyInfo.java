package everybuddy.project.domain.matching.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class GetBuddyInfo {
    private String buddyIdx;
    private String major;
    private String sex;
    private String continent;
    private String motherTongue;
    private List<String> languages;
    private List<String> personalities;
    private List<String> hobbies;
    private List<String> wanttodos;
}
