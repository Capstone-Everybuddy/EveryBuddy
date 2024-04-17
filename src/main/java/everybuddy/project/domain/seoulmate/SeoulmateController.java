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
    public BaseResponse<String> saveInfo(@RequestBody PostInfoReq postInfoReq, @PathVariable int seoulmateIdx) {
        try {
            seoulmateService.saveInfo(postInfoReq, seoulmateIdx);
            String result = "정보 저장에 성공하였습니다.";
            return new BaseResponse<>(result);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }

    /*프로필 조회*/
    @ResponseBody
    @GetMapping("/{seoulmateId}")
    @Operation(summary = "서울메이트 프로필 조회 API", description = "서울메이트의 프로필을 조회하는 API")
    public GetSeoulmateProfileRes getSeoulmateProfile(@PathVariable("seoulmateId") String seoulmateId) {
        GetSeoulmateProfileRes seoulmateProfileRes = seoulmateService.getSeoulmateProfile(seoulmateId);
        return seoulmateProfileRes;
    }
}
