import { useMutation } from '@tanstack/react-query';
import { api } from 'api/Client';
import { PostInfoReq, PostPreferReq } from 'api/Api';

interface SeoulmatesPreference {
  seoulmateIdx: number;
  data: PostPreferReq;
}

interface SeoulmatesInfo {
  seoulmateIdx: number;
  data: PostInfoReq;
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

  const { mutate: saveInfoSeoulmates } = useMutation({
    mutationFn: (seoulmatesInfo: SeoulmatesInfo) =>
      api.seoulmates.saveInfo(seoulmatesInfo.seoulmateIdx, seoulmatesInfo.data),
    onSuccess: (data: any) => {
      console.log('success', data);
    },
  });

  return {
    savePreferenceSeoulmates,
    saveInfoSeoulmates,
  };
};

export default useSeoulmates;
