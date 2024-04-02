package everybuddy.project.domain.matching;

import everybuddy.project.domain.matching.dto.GetMatchingRes;
import everybuddy.project.global.config.BaseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

import static everybuddy.project.global.config.BaseResponseStatus.DATABASE_ERROR;

@Service
public class MatchingService {
    final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final MatchingDao matchingDao;

    public MatchingService(MatchingDao matchingDao) {
        this.matchingDao = matchingDao;
    }



    public GetMatchingRes getMatching(Integer buddyIdx) throws BaseException {
        try {
            GetMatchingRes getMatchingRes = matchingDao.getMatching(buddyIdx);
            return getMatchingRes;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public List<GetMatchingRes> getMatchings(Integer seoulmateIdx) throws BaseException {
        try {
            List<GetMatchingRes> getMatchingsRes = matchingDao.getMatchings(seoulmateIdx);
            return getMatchingsRes;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
