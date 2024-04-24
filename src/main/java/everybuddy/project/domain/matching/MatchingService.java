package everybuddy.project.domain.matching;

import everybuddy.project.domain.matching.dto.*;
import everybuddy.project.domain.matching.entity.*;
import everybuddy.project.global.config.BaseException;
import org.springframework.stereotype.Service;

import java.util.List;

import static everybuddy.project.global.config.BaseResponseStatus.BEFORE_MATCHING;
import static everybuddy.project.global.config.BaseResponseStatus.DATABASE_ERROR;

@Service
public class MatchingService {
    private final MatchingDao matchingDao;

    public MatchingService(MatchingDao matchingDao) {
        this.matchingDao = matchingDao;
    }

    public void postMatching(List<Matching> postMatchingReq) throws BaseException {
        try {
            matchingDao.postMatching(postMatchingReq);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public GetMatchingRes getMatching(Integer buddyIdx) throws BaseException {
        int state = matchingDao.getState();
        if (state == 0) throw new BaseException(BEFORE_MATCHING);
        try {
            GetMatchingRes getMatchingRes = matchingDao.getMatching(buddyIdx);
            return getMatchingRes;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public List<GetMatchingRes> getMatchings(Integer seoulmateIdx) throws BaseException {
        int state = matchingDao.getState();
        if (state == 0) throw new BaseException(BEFORE_MATCHING);
        try {
            List<GetMatchingRes> getMatchingsRes = matchingDao.getMatchings(seoulmateIdx);
            return getMatchingsRes;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public List<Team> getEntire() throws BaseException {
        int state = matchingDao.getState();
        if (state == 0) throw new BaseException(BEFORE_MATCHING);
        try {
            List<Team> teams = matchingDao.getEntire();
            return teams;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public int getState() throws BaseException {
        try {
            int state = matchingDao.getState();
            return state;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public void deleteMatching() throws BaseException {
        try {
            matchingDao.deleteMatching();
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
