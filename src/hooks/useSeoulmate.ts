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
const useSeoulmate = () => {
  const { mutate: savePreferenceSeoulmate } = useMutation({
    mutationFn: (seoulmatesPreference: SeoulmatesPreference) =>
      api.seoulmates.savePreference(
        seoulmatesPreference.seoulmateIdx,
        seoulmatesPreference.data,
      ),
    onSuccess: (data: any) => {
      console.log('success', data);
    },
  });

  const { mutate: saveInfoSeoulmate } = useMutation({
    mutationFn: (seoulmatesInfo: SeoulmatesInfo) =>
      api.seoulmates.saveInfo(seoulmatesInfo.seoulmateIdx, seoulmatesInfo.data),
    onSuccess: (data: any) => {
      console.log('success', data);
    },
  });

  return {
    savePreferenceSeoulmate,
    saveInfoSeoulmate,
  };
};

export default useSeoulmate;
