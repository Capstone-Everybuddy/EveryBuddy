package everybuddy.project.domain.buddy.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Buddy {
    private int buddyIdx;
    private String name;
    private String ID;
    private String password;
    private String studentId;
    private String profileImg;
    private int major;
    private int sex;
    private int continent;
    private int motherTongue;
    private int certified;
    private int state;
}
