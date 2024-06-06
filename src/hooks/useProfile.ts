import { useQuery } from '@tanstack/react-query';
import { api } from 'api/Client';
import { useAuth } from 'components/AuthContext';
import React from 'react';

const useProfile = () => {
  const { user } = useAuth();

  let profile;
  if (user) {
    if (user.role === 'seoulmate') {
      const { data } = useQuery({
        queryKey: ['SeoulmateProfile', user.idx],
        queryFn: () => api.seoulmates.getSeoulmateProfile(user.idx),
      });
      profile = data;
    } else {
      const { data } = useQuery({
        queryKey: ['BuddyProfile', user.idx],
        queryFn: () => api.buddies.getBuddyProfile(user.idx),
      });
      profile = data;
    }
  }
  return {
    profile,
  };
};

export default useProfile;
