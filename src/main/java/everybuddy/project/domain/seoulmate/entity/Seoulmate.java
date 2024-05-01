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
    private String profileImg;
    private int major;
    private int sex;
    private int certified;
    private int state;
}
