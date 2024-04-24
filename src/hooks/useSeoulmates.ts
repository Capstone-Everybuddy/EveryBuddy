import { useMutation } from '@tanstack/react-query';
import { api } from 'api/Client';
import { PostPreferReq } from 'api/Api';

interface SeoulmatesPreference {
  seoulmateIdx: number;
  data: PostPreferReq;
}

/** 서울메이트 정보 입력 훅 */
const useSeoulmates = () => {
  const { mutate: savePreferenceSeoulmates } = useMutation({
    mutationFn: (seoulmatesPreference: SeoulmatesPreference) =>
      api.seoulmates.savePreference(
        seoulmatesPreference.seoulmateIdx,
        seoulmatesPreference.data,
      ),
    onSuccess: (data: any) => {
      console.log('success', data);
    },
  });

  return {
    savePreferenceSeoulmates,
  };
};

export default useSeoulmates;
