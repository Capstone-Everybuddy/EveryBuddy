package everybuddy.project.domain.buddy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ModifyProfileReq {
    private String name;
    private String ID;
    private String password;
    private String studentId;
    private String profileImg;
    private String nationality;
}
