package everybuddy.project.domain.matching.entity;

import lombok.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Team {
    private Seoulmate seoulmate;
    private List<Buddy> buddyList;
}
