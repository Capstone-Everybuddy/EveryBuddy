package everybuddy.project.domain.buddy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PostBuddyReq {
    private String name;
    private String ID;
    private String password1;
    private String password2;
    private String studentId;
    private String profileImg;
}
