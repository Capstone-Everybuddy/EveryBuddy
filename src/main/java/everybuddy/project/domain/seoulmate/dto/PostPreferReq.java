package everybuddy.project.domain.seoulmate.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class PostPreferReq {
    private String first;
    private List<Integer> firstList;
    private String second;
    private List<Integer> secondList;
    private String third;
    private List<Integer> thirdList;
    private String fourth;
    private List<Integer> fourthList;
}
