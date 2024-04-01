package everybuddy.project.domain.matching;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class MatchingService {
    final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final MatchingDao matchingDao;
    private final MatchingProvider matchingProvider;

    public MatchingService(MatchingDao matchingDao, MatchingProvider matchingProvider) {
        this.matchingDao = matchingDao;
        this.matchingProvider = matchingProvider;
    }
}
