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

    public String savePreference(PostPreferReq postPreferReq, int seoulmateIdx) throws BaseException{
        try {
            seoulmateDao.savePreference(postPreferReq, seoulmateIdx);
            String result = "요청에 성공했습니다.";
            return result;
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
    
    public void modifySeoulmateProfile(String seoulmateId, ModifyProfileReq modifyProfileReq) throws BaseException {
        try {
            // 서울메이트의 아이디(seoulmateId)를 통해 프로필을 가져옵니다.
            SeoulmateProfile seoulmateProfile = seoulmateDao.getSeoulmateProfile(seoulmateId);
            if (seoulmateProfile != null) {
                // 프로필을 가져왔다면 수정을 수행합니다.
                seoulmateDao.updateProfileById(seoulmateId, modifyProfileReq);
            } else {
                // 프로필을 찾을 수 없을 때 예외를 발생시킵니다.
                throw new BaseException(DATABASE_ERROR);
            }
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

}
