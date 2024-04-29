package everybuddy.project.domain.buddy;

import everybuddy.project.domain.buddy.dto.*;
import everybuddy.project.domain.buddy.entity.*;
import everybuddy.project.domain.seoulmate.entity.SeoulmateProfile;
import everybuddy.project.global.config.BaseException;
import org.springframework.stereotype.Service;

import static everybuddy.project.global.config.BaseResponseStatus.*;

@Service
public class BuddyService {
    private final BuddyDao buddyDao;

    public BuddyService(BuddyDao buddyDao) {
        this.buddyDao = buddyDao;
    }

    public PostBuddyRes createBuddy(PostBuddyReq postBuddyReq) throws BaseException {
        try {
            int preferenceIdx = buddyDao.createBuddy(postBuddyReq);
            return new PostBuddyRes(preferenceIdx);
        } catch (Exception exception) {
            throw new BaseException(REQUEST_ERROR);
        }
    }

    public PostLoginRes loginBuddy(PostLoginReq postLoginReq) throws BaseException {
        try {
            Buddy buddy = buddyDao.getPwd(postLoginReq);
            if (buddy.getPassword().equals(postLoginReq.getPassword())) {
                return new PostLoginRes(buddy.getBuddyIdx(), buddy.getName());
            } else throw new BaseException(POST_USERS_INVALID_PASSWORD);
        } catch (BaseException exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public PostPreferRes savePreference(PostPreferReq postPreferReq, int buddyIdx) throws BaseException{
        try {
            int preferrankIdx = buddyDao.savePreference(postPreferReq, buddyIdx);
            return new PostPreferRes(preferrankIdx);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public void saveInfo(PostInfoReq postInfoReq, int buddyIdx) throws BaseException {
        try {
            buddyDao.saveInfo(postInfoReq, buddyIdx);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }



    public GetBuddyProfileRes getBuddyProfile(String buddyId) {
        BuddyProfile buddy = buddyDao.getBuddyProfile(buddyId);
        return new GetBuddyProfileRes(buddy.getName(), buddy.getID(), buddy.getPassword(), buddy.getStudentId(), buddy.getNationality(), buddy.getProfileImg());
    }

    public void modifyBuddyProfile(String buddyId, everybuddy.project.domain.buddy.dto.ModifyProfileReq modifyProfileReq) throws BaseException {
        try {
            BuddyProfile buddyProfile = buddyDao.getBuddyProfile(buddyId);
            if (buddyProfile != null) {
                buddyDao.updateProfileById(buddyId, modifyProfileReq);
            } else {
                throw new BaseException(DATABASE_ERROR);
            }
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
