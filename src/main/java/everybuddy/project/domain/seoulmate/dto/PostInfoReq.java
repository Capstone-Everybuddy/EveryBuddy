package everybuddy.project.domain.seoulmate.dto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class PostInfoReq {
    private List<Integer> language;
    private List<Integer> personality;
    private List<Integer> hobby;
    private List<Integer> wanttodo;
}
