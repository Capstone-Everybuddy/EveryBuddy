import { useMutation } from '@tanstack/react-query';
import { PostBuddyInfoReq, PostPreferReq } from 'api/Api';
import { api } from 'api/Client';

interface BuddyPreference {
  buddyIdx: number;
  data: PostPreferReq;
}

interface BuddyInfo {
  buddyIdx: number;
  data: PostBuddyInfoReq;
}

const useBuddy = () => {
  const { mutate: savePreferenceBuddy } = useMutation({
    mutationFn: (buddyPreference: BuddyPreference) =>
      api.buddies.saveBuddyPreference(
        buddyPreference.buddyIdx,
        buddyPreference.data,
      ),
    onSuccess: (data: any) => {
      console.log('success', data);
    },
  });

  const { mutate: saveInfoBuddy } = useMutation({
    mutationFn: (buddyInfo: BuddyInfo) =>
      api.buddies.saveBuddyInfo(buddyInfo.buddyIdx, buddyInfo.data),
    onSuccess: (data: any) => {
      console.log('success', data);
    },
  });
  return { savePreferenceBuddy, saveInfoBuddy };
};

export default useBuddy;
