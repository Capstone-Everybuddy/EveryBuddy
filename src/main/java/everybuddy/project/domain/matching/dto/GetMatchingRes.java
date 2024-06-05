package everybuddy.project.domain.matching.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GetMatchingRes {
    private String seoulmateName;
    private String seoulmateStudentId;
    private String seoulmateProfileImg;
    private int seoulmateMajor;
    private int seoulmateSex;
    private String buddyName;
    private String buddyStudentId;
    private String buddyProfileImg;
    private int buddyMajor;
    private int buddySex;
    private int buddyContinent;
}