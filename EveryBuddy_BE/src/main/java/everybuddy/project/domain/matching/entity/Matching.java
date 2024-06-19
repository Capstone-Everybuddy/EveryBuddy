package everybuddy.project.domain.matching.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.util.*;

@Getter
@Setter
@AllArgsConstructor
public class Matching {
    private int seoulmateIdx;
    private List<Integer> buddyIdxs;
}
