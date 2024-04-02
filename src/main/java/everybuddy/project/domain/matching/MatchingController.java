package everybuddy.project.domain.matching;

import everybuddy.project.domain.matching.dto.GetMatchingRes;
import everybuddy.project.global.config.*;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// https://velog.io/@gmlstjq123/SpringBoot-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-Swagger-UI-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
@RestController
@RequestMapping("/matchings")
public class MatchingController {
    final Logger logger = LoggerFactory.getLogger(this.getClass());


    private final MatchingProvider matchingProvider;
    private final MatchingService matchingService;

    public MatchingController(MatchingProvider matchingProvider, MatchingService matchingService) {
        this.matchingProvider = matchingProvider;
        this.matchingService = matchingService;
    }

    // [GET] 설메) 담당 버디 조회 API
    @ResponseBody
    @GetMapping("/seoulmate/{buddyIdx}")
    @Operation(summary = "summary_API", description = "matching API: seoulmate-buddy")
    public BaseResponse<GetMatchingRes> getMatching(@PathVariable("buddyIdx") Integer buddyIdx) {
        try {
            GetMatchingRes getMatchingRes = matchingProvider.getMatching(buddyIdx);
            return new BaseResponse<>(getMatchingRes);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }

}