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
    @PostMapping("/create")
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
}
