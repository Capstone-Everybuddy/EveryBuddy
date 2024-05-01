package everybuddy.project.domain.buddy;

import everybuddy.project.domain.buddy.dto.*;
import everybuddy.project.global.config.BaseException;
import everybuddy.project.global.config.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @Operation(summary = "버디 log-in API", description = "버디 로그인 API\nswagger 대문자 반영이 안됩니다! id(x) -> ID(o) !!")
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
    @Operation(summary = "버디 선호도 반영 API", description = "버디 선호도반영 API")
    public BaseResponse<String> saveBuddyPreference(@RequestBody PostPreferReq postPreferReq, @PathVariable int buddyIdx) {
        try {
            String result = buddyService.saveBuddyPreference(postPreferReq, buddyIdx);
            return new BaseResponse<>(result);
        } catch (BaseException baseException) {
            return new BaseResponse<>(baseException.getStatus());
        }
    }

    @ResponseBody
    @PostMapping("/info/{buddyIdx}")
    @Operation(summary = "버디 정보 입력 API", description = "버디 정보 입력 API")
    public BaseResponse<String> saveBuddyInfo(@RequestBody PostBuddyInfoReq postBuddyInfoReq, @PathVariable int buddyIdx) {
        try {
            buddyService.saveBuddyInfo(postBuddyInfoReq, buddyIdx);
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

    @ResponseBody
    @PutMapping("/modify/{buddyId}")
    @Operation(summary = "버디 프로필 수정 API", description = "버디 프로필을 수정하는 API")
    public ResponseEntity<BaseResponse<String>> modifyBuddyProfile(@PathVariable("buddyId") String buddyId, @RequestBody everybuddy.project.domain.buddy.dto.ModifyProfileReq modifyProfileReq) {
        try {
            buddyService.modifyBuddyProfile(buddyId, modifyProfileReq);
            String message = "프로필이 성공적으로 수정되었습니다.";
            return ResponseEntity.ok(new BaseResponse<>(message));
        } catch (BaseException baseException) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new BaseResponse<>(baseException.getStatus()));
        }
    }
}
