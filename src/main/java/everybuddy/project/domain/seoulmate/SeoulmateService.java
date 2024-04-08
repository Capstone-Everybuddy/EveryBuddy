package everybuddy.project.domain.seoulmate;

import everybuddy.project.domain.seoulmate.dto.PostSeoulmateReq;
import everybuddy.project.domain.seoulmate.dto.PostSeoulmateRes;
import org.springframework.stereotype.Service;

@Service
public class SeoulmateService {
    private SeoulmateDao seoulmateDao;

    public SeoulmateService(SeoulmateDao seoulmateDao) {
        this.seoulmateDao = seoulmateDao;
    }

    public PostSeoulmateRes createSeoulmate(PostSeoulmateReq postSeoulmateReq) {
        int seoulmateIdx = seoulmateDao.createSeoulmate(postSeoulmateReq);
        return new PostSeoulmateRes(seoulmateIdx);
    }
}
