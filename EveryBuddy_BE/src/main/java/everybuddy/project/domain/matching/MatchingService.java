package everybuddy.project.domain.matching;

import everybuddy.project.domain.matching.dto.*;
import everybuddy.project.domain.matching.entity.*;
import everybuddy.project.global.config.BaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static everybuddy.project.global.config.BaseResponseStatus.BEFORE_MATCHING;
import static everybuddy.project.global.config.BaseResponseStatus.DATABASE_ERROR;

@Service
public class MatchingService {
    private final MatchingDao matchingDao;

    // 의존성 주입
    @Autowired
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

    public List<GetMatchingRes> getMatchingsWithB(Integer buddyIdx) throws BaseException {
        int state = matchingDao.getState();
        if (state == 0) throw new BaseException(BEFORE_MATCHING);
        try {
            int seoulmateIdx = matchingDao.getSeoulmateIdx(buddyIdx);
            List<GetMatchingRes> getMatchingRes = matchingDao.getMatchings(seoulmateIdx);
            return getMatchingRes;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public List<GetMatchingRes> getMatchingsWithS(Integer seoulmateIdx) throws BaseException {
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

    public void print(Map<String, List<String>> somethings) {
        for (Map.Entry<String, List<String>> entry: somethings.entrySet()) {
            String s = entry.getKey();
            List<String> ls = entry.getValue();
            System.out.print("key: "+s +", value: ");
            for (int i=0; i<ls.size(); i++) {
                System.out.print(ls.get(i) +" ");
            }
            System.out.println();
        }
    }

    @Transactional
    // practice
    public void applyGaleShapley() throws BaseException {
        Map<String, List<String>> providers = matchingDao.Providers();
        Map<String, List<String>> demanders = matchingDao.Demanders();
        print(providers);
        print(demanders);

        Set<String> providersSet = new HashSet<>(providers.keySet());
        Map<String, Integer> providerCapacity = GaleShapley.calculateProviderCapacity(demanders, providersSet);
        Map<String, List<String>> matches = GaleShapley.galeShapleyOneToMany(providers, demanders, providerCapacity);

        System.out.println("Matches:");
        for (Map.Entry<String, List<String>> entry : matches.entrySet()) {
            String demanderIdx = entry.getKey();
            List<String> providerIdxs = entry.getValue();
            System.out.println("Demander Index: " + demanderIdx + ", Providers: " + providerIdxs);
        }
        matchingDao.saveMatching(matches);
        matchingDao.saveChatroom(matches);
    }
}
