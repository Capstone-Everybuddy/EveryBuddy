package everybuddy.project.domain.matching.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GetMatchingRes {
    private String seoulmateName;
    private String seoulmateID;
    private String seoulmateProfileImg;
    private String buddyName;
    private String buddyID;
    private String buddyProfileImg;
}