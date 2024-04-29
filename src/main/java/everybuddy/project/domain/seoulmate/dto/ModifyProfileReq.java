package everybuddy.project.domain.seoulmate.dto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ModifyProfileReq {
    private String name;
    private String ID;
    private String password;
    private String studentId;
    private int sex;
    private String major;
    private String profileImg;
}
