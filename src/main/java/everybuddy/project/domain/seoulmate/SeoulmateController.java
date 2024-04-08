package everybuddy.project.domain.seoulmate;

import everybuddy.project.domain.seoulmate.dto.PostSeoulmateReq;
import everybuddy.project.domain.seoulmate.dto.PostSeoulmateRes;
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
    @PostMapping("/create")
    @Operation(summary = "서울메이트 sign-up API", description = "서울메이트 회원가입 API")
    public PostSeoulmateRes createSeoulmate(PostSeoulmateReq postSeoulmateReq) {
        PostSeoulmateRes postSeoulmateRes = seoulmateService.createSeoulmate(postSeoulmateReq);
        return postSeoulmateRes;
    }
}
