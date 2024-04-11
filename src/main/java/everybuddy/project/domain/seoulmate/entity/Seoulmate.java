package everybuddy.project.domain.seoulmate.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Seoulmate {
    private int seoulmateIdx;
    private String name;
    private String ID;
    private String password;
    private String studentId;
    private int sex;
    private String major;
    private int certified;
    private String profileImg;
    private int state;
}
