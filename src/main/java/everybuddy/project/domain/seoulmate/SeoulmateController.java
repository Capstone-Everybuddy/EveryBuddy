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
}
