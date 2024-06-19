package everybuddy.project.domain.buddy;

import everybuddy.project.domain.buddy.dto.*;
import everybuddy.project.domain.buddy.entity.*;
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

    public String saveBuddyPreference(PostPreferReq postPreferReq, int buddyIdx) throws BaseException{
        try {
            buddyDao.saveBuddyPreference(postPreferReq, buddyIdx);
            String result = "요청에 성공했습니다.";
            return result;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public void saveBuddyInfo(PostBuddyInfoReq postBuddyInfoReq, int buddyIdx) throws BaseException {
        try {
            buddyDao.saveBuddyInfo(postBuddyInfoReq, buddyIdx);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }



    public GetBuddyProfileRes getBuddyProfile(int buddyIdx) {
        BuddyProfile buddy = buddyDao.getBuddyProfile(buddyIdx);
        return new GetBuddyProfileRes(buddy.getName(), buddy.getID(), buddy.getStudentId(), buddy.getProfileImg(), buddy.getMajor(), buddy.getSex(), buddy.getContinent(), buddy.getMotherTongue());
    }

    public void modifyBuddyProfile(int buddyIdx, everybuddy.project.domain.buddy.dto.ModifyProfileReq modifyProfileReq) throws BaseException {
        try {
            BuddyProfile buddyProfile = buddyDao.getBuddyProfile(buddyIdx);
            if (buddyProfile != null) {
                buddyDao.updateProfileById(buddyIdx, modifyProfileReq);
            } else {
                throw new BaseException(DATABASE_ERROR);
            }
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
