import java.util.*;
import java.util.stream.Collectors;


public class GaleShapley {
    static Map<String, Integer> calculateProviderCapacity(Map<String, List<String>> demanders, Set<String> providers) {
        int numDemanders = demanders.size();
        int numProviders = providers.size();
        int baseCapacity = numDemanders / numProviders;
        Map<String, Integer> providerCapacity = new HashMap<>();
        Map<String, Integer[]> preferenceCount = new HashMap<>();

        for (String provider : providers) {
            providerCapacity.put(provider, baseCapacity);
            preferenceCount.put(provider, new Integer[]{0, 0, 0});
        }

        int remainingCapacity = numDemanders - baseCapacity * numProviders;

        for (Map.Entry<String, List<String>> entry : demanders.entrySet()) {
            List<String> preferences = entry.getValue();
            for (int i = 0; i < preferences.size(); i++) {
                String provider = preferences.get(i);
                preferenceCount.get(provider)[i]++;
            }
        }

        List<Map.Entry<String, Integer[]>> sortedProviders = new ArrayList<>(preferenceCount.entrySet());
        sortedProviders.sort((a, b) -> {
            int cmp = b.getValue()[0].compareTo(a.getValue()[0]);
            if (cmp == 0) cmp = b.getValue()[1].compareTo(a.getValue()[1]);
            if (cmp == 0) cmp = b.getValue()[2].compareTo(a.getValue()[2]);
            return cmp;
        });

        for (int i = 0; i < remainingCapacity; i++) {
            String provider = sortedProviders.get(i).getKey();
            providerCapacity.put(provider, providerCapacity.get(provider) + 1);
        }

        return providerCapacity;
    }

    static Map<String, List<String>> galeShapleyOneToMany(Map<String, List<String>> providers, Map<String, List<String>> demanders, Map<String, Integer> providerCapacity) {
        Map<String, List<String>> matches = new HashMap<>();
        Map<String, Deque<String>> proposals = new HashMap<>();
        Set<String> freeDemanders = new HashSet<>(demanders.keySet());

        for (String demander : demanders.keySet()) {
            proposals.put(demander, new ArrayDeque<>(demanders.get(demander)));
        }

        while (!freeDemanders.isEmpty()) {
            Map<String, List<String>> currentProposals = new HashMap<>();
            for (String demander : new HashSet<>(freeDemanders)) {
                if (!proposals.get(demander).isEmpty()) {
                    String provider = proposals.get(demander).poll();
                    currentProposals.computeIfAbsent(provider, k -> new ArrayList<>()).add(demander);
                }
            }

            for (Map.Entry<String, List<String>> entry : currentProposals.entrySet()) {
                String provider = entry.getKey();
                List<String> allCandidates = new ArrayList<>(matches.getOrDefault(provider, new ArrayList<>()));
                allCandidates.addAll(entry.getValue());

                allCandidates.sort(Comparator.comparingInt(a -> providers.get(provider).indexOf(a)));

                List<String> updatedMatches = new ArrayList<>(allCandidates.subList(0, Math.min(providerCapacity.get(provider), allCandidates.size())));
                Set<String> rejected = new HashSet<>(allCandidates);
                rejected.removeAll(updatedMatches);

                matches.put(provider, updatedMatches);
                for (String demander : rejected) {
                    if (!proposals.get(demander).isEmpty()) {
                        freeDemanders.add(demander);
                    }
                }
            }

            freeDemanders.removeAll(matches.values().stream().flatMap(Collection::stream).collect(Collectors.toSet()));
        }

        return matches;
    }

    public static void main(String[] args) {
      Map<String, List<String>> providers = new HashMap<>();
      providers.put("1", Arrays.asList("1", "2", "3", "4", "5", "6", "7", "8", "9", "10"));
      providers.put("2", Arrays.asList("6", "7", "8", "10", "9", "1", "2", "4", "3", "5"));
      providers.put("3", Arrays.asList("9", "1", "3", "7", "2", "4", "10", "5", "6", "8"));
  
      Map<String, List<String>> demanders = new HashMap<>();
      demanders.put("1", Arrays.asList("3", "1", "2"));
      demanders.put("2", Arrays.asList("3", "2", "1"));
      demanders.put("3", Arrays.asList("1", "2", "3"));
      demanders.put("4", Arrays.asList("1", "3", "2"));
      demanders.put("5", Arrays.asList("1", "3", "2"));
      demanders.put("6", Arrays.asList("2", "3", "1"));
      demanders.put("7", Arrays.asList("1", "2", "3"));
      demanders.put("8", Arrays.asList("2", "1", "3"));
      demanders.put("9", Arrays.asList("2", "1", "3"));
      demanders.put("10", Arrays.asList("1", "2", "3"));
  
      Set<String> providersSet = new HashSet<>(providers.keySet());
      Map<String, Integer> providerCapacity = calculateProviderCapacity(demanders, providersSet);
  
      Map<String, List<String>> matches = galeShapleyOneToMany(providers, demanders, providerCapacity);
      System.out.println("Matches: " + matches);
  }
}  
