package everybuddy.project.domain.buddy;

import everybuddy.project.domain.buddy.dto.PostBuddyReq;
import everybuddy.project.domain.buddy.dto.PostBuddyRes;
import everybuddy.project.global.config.BaseException;
import org.springframework.stereotype.Service;

import static everybuddy.project.global.config.BaseResponseStatus.REQUEST_ERROR;

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
}
