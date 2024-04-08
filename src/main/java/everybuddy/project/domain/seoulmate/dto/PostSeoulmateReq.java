package everybuddy.project.domain.seoulmate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PostSeoulmateReq {
    private String name;
    private String ID;
    private String password1;
    private String password2;
    private String profileImg;
}
