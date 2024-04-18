package everybuddy.project.domain.buddy;

import everybuddy.project.domain.buddy.dto.*;
import everybuddy.project.global.config.BaseException;
import everybuddy.project.global.config.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/buddies")
public class BuddyController {
    final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final BuddyService buddyService;

    public BuddyController(BuddyService buddyService) {
        this.buddyService = buddyService;
    }

    @ResponseBody
    @PostMapping("/sign-up")
    @Operation(summary = "버디 sign-up API", description = "버디) 회원가입 API")
    public BaseResponse<PostBuddyRes> createBuddy(@RequestBody PostBuddyReq postBuddyReq) {
        try {
            PostBuddyRes postBuddyRes = buddyService.createBuddy(postBuddyReq);
            return new BaseResponse<>(postBuddyRes);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }

    @ResponseBody
    @PostMapping("/log-in")
    public BaseResponse<PostLoginRes> loginBuddy(@RequestBody PostLoginReq postLoginReq) {
        try {
            PostLoginRes postLoginRes = buddyService.loginBuddy(postLoginReq);
            return new BaseResponse<>(postLoginRes);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }


    @ResponseBody
    @PostMapping("/preference/{buddyIdx}")
    public BaseResponse<PostPreferRes> savePreference(@RequestBody PostPreferReq postPreferReq, @PathVariable int buddyIdx) {
        try {
            PostPreferRes postPreferRes = buddyService.savePreference(postPreferReq, buddyIdx);
            return new BaseResponse<>(postPreferRes);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }

    @ResponseBody
    @PostMapping("/info/{buddyIdx}")
    public BaseResponse<String> saveInfo(@RequestBody PostInfoReq postInfoReq, @PathVariable int buddyIdx) {
        try {
            buddyService.saveInfo(postInfoReq, buddyIdx);
            String result = "정보 저장에 성공하였습니다.";
            return new BaseResponse<>(result);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }



    /*프로필 조회*/
    @ResponseBody
    @GetMapping("/{buddyId}")
    @Operation(summary = "버디 프로필 조회 API", description = "버디의 프로필을 조회하는 API")
    public GetBuddyProfileRes getBuddyProfile(@PathVariable("buddyId") String buddyId) {
        GetBuddyProfileRes buddyProfileRes = buddyService.getBuddyProfile(buddyId);
        return buddyProfileRes;
    }
}
