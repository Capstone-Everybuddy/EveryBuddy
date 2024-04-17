package everybuddy.project.domain.seoulmate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GetSeoulmateProfileRes {
    private String name;
    private String ID;
    private String password;
    private String studentId;
    private int sex;
    private String major;
    private String profileImg;
}