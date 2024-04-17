package everybuddy.project.domain.seoulmate;

import everybuddy.project.domain.seoulmate.dto.*;
import everybuddy.project.domain.seoulmate.entity.Seoulmate;
import everybuddy.project.domain.seoulmate.entity.SeoulmateProfile;
import everybuddy.project.global.config.BaseException;
import org.springframework.stereotype.Service;

import static everybuddy.project.global.config.BaseResponseStatus.DATABASE_ERROR;
import static everybuddy.project.global.config.BaseResponseStatus.POST_USERS_FAIL_LOGIN;

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

    public PostLoginRes loginSeoulmate(PostLoginReq postLoginReq) throws BaseException {
        try {
            Seoulmate seoulmate = seoulmateDao.getPwd(postLoginReq);
            if (seoulmate.getPassword().equals(postLoginReq.getPassword())) {
                return new PostLoginRes(seoulmate.getSeoulmateIdx(), seoulmate.getName());
            } else {
                throw new BaseException(POST_USERS_FAIL_LOGIN);
            }
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public PostPreferRes savePreference(PostPreferReq postPreferReq, int seoulmateIdx) throws BaseException{
        try {
            int preferrankIdx = seoulmateDao.savePreference(postPreferReq, seoulmateIdx);
            return new PostPreferRes(preferrankIdx);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public void saveInfo(PostInfoReq postInfoReq, int seoulmateIdx) throws BaseException {
        try {
            seoulmateDao.saveInfo(postInfoReq, seoulmateIdx);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public GetSeoulmateProfileRes getSeoulmateProfile(String seoulmateId) {
        SeoulmateProfile seoulmate = seoulmateDao.getSeoulmateProfile(seoulmateId);
        return new GetSeoulmateProfileRes(seoulmate.getName(), seoulmate.getID(), seoulmate.getPassword(), seoulmate.getStudentId(), seoulmate.getSex(), seoulmate.getMajor(), seoulmate.getProfileImg());
    }

}
