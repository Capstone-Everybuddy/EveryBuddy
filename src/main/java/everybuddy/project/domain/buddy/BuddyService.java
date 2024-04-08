package everybuddy.project.domain.buddy;

import everybuddy.project.domain.buddy.dto.PostBuddyReq;
import everybuddy.project.domain.buddy.dto.PostBuddyRes;
import everybuddy.project.domain.buddy.dto.PostLoginReq;
import everybuddy.project.domain.buddy.dto.PostLoginRes;
import everybuddy.project.domain.buddy.entity.Buddy;
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
}
