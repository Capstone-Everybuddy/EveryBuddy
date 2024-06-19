package everybuddy.project.domain.matching.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class GetSeoulmateInfo {
    private String seoulmateIdx;
    private String major;
    private String sex;
    private List<String> languages;
    private List<String> personalities;
    private List<String> hobbies;
    private List<String> wanttodos;
}
