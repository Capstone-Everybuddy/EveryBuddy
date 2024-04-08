package everybuddy.project.domain.buddy.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Buddy {
    int buddyIdx;
    String name;
    String ID;
    String password;
    int certified;
    String profileImg;
}
