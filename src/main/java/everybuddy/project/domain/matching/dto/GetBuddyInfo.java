package everybuddy.project.domain.matching.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class GetBuddyInfo {
    private String seoulmateIdx;
    private String major;
    private String sex;
    private String continent;
    private List<String> languages;
    private List<String> personalities;
    private List<String> hobbies;
    private List<String> wanttodos;
}
