package everybuddy.project.domain.buddy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

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
    private String fifth;
    private List<Integer> fifthList;
    private String sixth;
    private List<Integer> sixthList;
}
