package everybuddy.project.domain.matching.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class GetBuddyPre {
    private String buddyIdx;
    private List<String> majors;
    private List<String> sexs;
    private List<String> languages;
    private List<String> personalities;
    private List<String> hobbies;
    private List<String> wanttodos;
}
