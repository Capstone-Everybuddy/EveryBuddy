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

    // [POST] 매칭 결과 저장 API
    @ResponseBody
    @PostMapping("/save")
    @Operation(summary = "매칭 결과 저장 API", description = "전체 매칭 결과 저장 API\n" +
            "서울메이트 : 버디 = 1 : n명의 쌍으로 저장됩니다.\n" +
            "이 API를 호출하면, 매칭 상태를 나타내는 seoulmateIdx = 1 의 state 값이 0에서 1로 변경됩니다.")
    public BaseResponse<String> postMatching(@RequestBody List<Matching> postMatchingReq) {
        try {
            String result = "매칭 결과가 성공적으로 저장되었습니다.";
            matchingService.postMatching(postMatchingReq);
            return new BaseResponse<>(result);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }

    }


        // [GET] 버디) 담당 서울메이트 조회 API
    @ResponseBody
    @GetMapping("/seoulmate/{buddyIdx}")
    @Operation(summary = "서울메이트 조회 API", description = "버디) 담당 서울메이트 조회 API")
    public BaseResponse<List<GetMatchingRes>> getMatching(@PathVariable("buddyIdx") Integer buddyIdx) {
        try {
            List<GetMatchingRes> getMatchingsRes = matchingService.getMatchingsWithB(buddyIdx);
            return new BaseResponse<>(getMatchingsRes);
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
            List<GetMatchingRes> getMatchingsRes = matchingService.getMatchingsWithS(seoulmateIdx);
            return new BaseResponse<>(getMatchingsRes);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }

    // [GET] 전체 매칭 결과 조회 API
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


    // [GET] 매칭 상태 조회 API
    @ResponseBody
    @GetMapping("/state")
    @Operation(summary = "매칭 상태 조회 API", description = "매칭 상태를 조회합니다 ( 0: 매칭 전, 1: 매칭 완료 )")
    public BaseResponse<GetStatusRes> getState() {
        try {
            int state = matchingService.getState();
            return new BaseResponse<>(new GetStatusRes(state));
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }

    // [DELETE] 매칭 결과 테이블 제거 및 생성 API
    @ResponseBody
    @DeleteMapping("/delete")
    @Operation(summary = "매칭 전 상태로 변경 API", description = "매칭 상태를 변경합니다 ( 0: 매칭 전, 1: 매칭 완료 )\n" +
            "- seoulmateIdx = 1의 state를 임의로 사용. state 값 1 -> 0로 변경\n" +
            "- DROP matching TABLE && CREATE matching TABLE\n" +
            "두 가지 동작이 동시에 진행됩니다.")
    public BaseResponse<String> deleteMatching() {
        try {
            String result = "매칭이 초기화되었습니다.";
            matchingService.deleteMatching();
            return new BaseResponse<>(result);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }

    @ResponseBody
    @PostMapping("/start-matching")
    @Operation(summary = "매칭 시작하기!! API", description="매칭을 \"드디어!\" 시작합니다.")
    public BaseResponse<String> applyGaleShapley() {
        try {
            matchingService.applyGaleShapley();
            String result = "성공";
            return new BaseResponse<>(result);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }


    }
}