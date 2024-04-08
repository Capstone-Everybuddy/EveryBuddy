package everybuddy.project.domain.buddy.entity;

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
    private String password;
    private int certified;
    private String profileImg;
    private int state;
}
