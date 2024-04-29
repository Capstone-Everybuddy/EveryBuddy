package everybuddy.project.domain.buddy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class PostInfoReq {
    private List<Integer> language;
    private List<Integer> personality;
    private List<Integer> hobby;
    private List<Integer> wanttodo;
    private int sex;
    private int major;
    private int continent;
}
