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
    private String password;
    private String profileImg;
    private String nationality;
    private String studentId;
}
