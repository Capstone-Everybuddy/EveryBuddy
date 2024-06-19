package everybuddy.project.domain.buddy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GetBuddyProfileRes {
    private String name;
    private String ID;
    private String studentId;
    private String profileImg;
    private int major;
    private int sex;
    private int continent;
    private int motherTongue;
}
