package everybuddy.project.domain.matching.entity;

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
    private String studentId;
    private int sex;
    private int major;
    private String continent;
    private int certified;
    private String profileImg;
    private int state;
}
