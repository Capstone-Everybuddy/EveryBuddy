package everybuddy.project.domain.buddy.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BuddyProfile {
    private int buddyIdx;
    private String name;
    private String ID;
    private String password;
    private String studentId;
    private String nationality;
    private String profileImg;
}
