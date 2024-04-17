package everybuddy.project.domain.matching;

import everybuddy.project.domain.matching.dto.*;
import everybuddy.project.domain.matching.entity.*;
import everybuddy.project.global.config.*;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// https://velog.io/@gmlstjq123/SpringBoot-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-Swagger-UI-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
@RestController // JSON으로 데이터를 주고받음을 선언합니다.
@RequestMapping("/matchings")
public class MatchingController {
//    final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final MatchingService matchingService;

    public MatchingController(MatchingService matchingService) {
        this.matchingService = matchingService;
    }

    // [GET] 버디) 담당 서울메이트 조회 API
    @ResponseBody
    @GetMapping("/seoulmate/{buddyIdx}")
    @Operation(summary = "서울메이트 조회 API", description = "버디) 담당 서울메이트 조회 API")
    public BaseResponse<GetMatchingRes> getMatching(@PathVariable("buddyIdx") Integer buddyIdx) {
        try {
            GetMatchingRes getMatchingRes = matchingService.getMatching(buddyIdx);
            return new BaseResponse<>(getMatchingRes);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }


    // [GET] 설메) 담당 버디들 조회 API
    @ResponseBody
    @GetMapping("/buddies/{seoulmateIdx}")
    @Operation(summary = "버디 조회 API", description = "설메) 담당 버디들 조회 API")
    public BaseResponse<List<GetMatchingRes>> getMatchings(@PathVariable("seoulmateIdx") Integer seoulmateIdx) {
        try {
            List<GetMatchingRes> getMatchingsRes = matchingService.getMatchings(seoulmateIdx);
            return new BaseResponse<>(getMatchingsRes);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }

    @ResponseBody
    @GetMapping("/entire")
    @Operation(summary = "전체 매칭 결과 조회 API", description = "전체 매칭 결과 조회: 서울메이트 -> 버디들 순")
    public BaseResponse<List<Team>> getEntire() {
        try {
            List<Team> teams = matchingService.getEntire();
            return new BaseResponse<>(teams);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }

}