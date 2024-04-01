package everybuddy.project.domain.matching;

import everybuddy.project.domain.matching.dto.GetMatchingRes;
import everybuddy.project.global.config.BaseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import static everybuddy.project.global.config.BaseResponseStatus.DATABASE_ERROR;

@Service
public class MatchingProvider {
    private final MatchingDao matchingDao;

    final Logger logger = LoggerFactory.getLogger(this.getClass());

    public MatchingProvider(MatchingDao matchingDao) {
        this.matchingDao = matchingDao;
    }

    public GetMatchingRes getMatching(Integer matchingIdx) throws BaseException {
        try {
            GetMatchingRes getMatchingRes = matchingDao.getMatching(matchingIdx);
            return getMatchingRes;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
