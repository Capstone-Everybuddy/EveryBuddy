package everybuddy.project.domain.seoulmate;

import everybuddy.project.domain.seoulmate.dto.*;
import everybuddy.project.global.config.BaseException;
import everybuddy.project.global.config.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/seoulmates")
public class SeoulmateController {
    private final SeoulmateService seoulmateService;

    public SeoulmateController(SeoulmateService seoulmateService) {
        this.seoulmateService = seoulmateService;
    }

    @ResponseBody
    @PostMapping("/sign-up")
    @Operation(summary = "서울메이트 sign-up API", description = "서울메이트 회원가입 API")
    public PostSeoulmateRes createSeoulmate(PostSeoulmateReq postSeoulmateReq) {
        PostSeoulmateRes postSeoulmateRes = seoulmateService.createSeoulmate(postSeoulmateReq);
        return postSeoulmateRes;
    }

    @ResponseBody
    @PostMapping("/log-in")
    @Operation(summary = "서울메이트 log-in API", description = "서울메이트 로그인 API")
    public BaseResponse<PostLoginRes> loginSeoulmate(PostLoginReq postLoginReq) {
        try {
            PostLoginRes postLoginRes = seoulmateService.loginSeoulmate(postLoginReq);
            return new BaseResponse<>(postLoginRes);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }

    }

    @ResponseBody
    @PostMapping("/preference/{seoulmateIdx}")
    @Operation(summary = "서울메이트 선호도 입력 API", description = "서울메이트 선호도 입력 API" +
            "first, firstList와 같이 선호 순위대로 입력을 받고, 해당하는 값들을 테이블에 저장합니다.")
    public BaseResponse<PostPreferRes> savePreference(@RequestBody PostPreferReq postPreferReq, @PathVariable int seoulmateIdx) {
        try {
            PostPreferRes postPreferRes = seoulmateService.savePreference(postPreferReq, seoulmateIdx);
            return new BaseResponse<>(postPreferRes);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }

    @ResponseBody
    @PostMapping("/info/{seoulmateIdx}")
    @Operation(summary = "서울메이트 자신의 정보 입력 API", description = "서울메이트 자신의 정보 입력 API" +
            "language, personality, hobby, wanttodo 순서대로 입력을 받고, 해당하는 값들을 테이블에 저장합니다.")
    public BaseResponse<String> saveInfo(@RequestBody PostInfoReq postInfoReq, @PathVariable int seoulmateIdx) {
        try {
            seoulmateService.saveInfo(postInfoReq, seoulmateIdx);
            String result = "정보 저장에 성공하였습니다.";
            return new BaseResponse<>(result);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }
}
