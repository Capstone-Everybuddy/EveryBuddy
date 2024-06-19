package everybuddy.project.domain.seoulmate.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SeoulmateProfile {
    private int seoulmateIdx;
    private String name;
    private String ID;
    private String studentId;
    private String profileImg;
    private int major;
    private int sex;
}
