package everybuddy.project.domain.seoulmate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PostLoginRes {
    private int seoulmateIdx;
    private String name;
}
