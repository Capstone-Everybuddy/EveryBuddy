import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Main from 'components/Main';
import segmented from '../assets/segmented.png';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { useAuth } from 'components/AuthContext';
import { api } from 'api/Client';
import { matchingInfo } from 'data/matching';

interface User {
  user_name: string;
  user_id?: string;
  user_major?: number;
  user_language?: string;
  user_pwd?: string;
  user_studentNum?: string;
  profileImage: string;
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<User>({
    user_name: 'USER',
    user_id: 'USERID',
    user_major: 0,
    user_language: 'English',
    user_studentNum: '20xxxxxxxxx',
    profileImage:
      'https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg',
  });

  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user) {
          let profileData;
          if (user.role === 'seoulmate') {
            console.log('api 로딩');

            profileData = await api.seoulmates.getSeoulmateProfile(user.idx);
          } else {
            profileData = await api.buddies.getBuddyProfile(user.idx);
          }
          setUserProfile({
            user_name: profileData.name || 'USER',
            user_id: profileData.id || 'USERID',
            user_major: Number(profileData.major) || 0,
            user_studentNum: profileData.studentId || '20xxxxxxxxx',
            profileImage:
              profileData.profileImg ||
              'https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg',
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <Header title="My Profile" />
        <Image src={segmented} alt="토글" />
        <UserProfile>
          <ProfileSection>
            <ProfileImage>
              <img src={userProfile.profileImage} alt="프로필사진" />
            </ProfileImage>
            <UserInfo>
              <h1>{userProfile.user_name}</h1>
              <p>{userProfile.user_id}</p>
              <p>{userProfile.user_studentNum}</p>
              <p>{matchingInfo.major[userProfile.user_major!]}</p>
            </UserInfo>
          </ProfileSection>
          <Link to="/userupdate">
            <Button text="Edit Info" />
          </Link>
        </UserProfile>
      </Layout.PageContent>
    </Main.Wrapper>
  );
};

const Image = styled.img`
  margin-top: 10px;
  width: 95%;
`;

const UserProfile = styled.div`
  width: 100%;
`;

const ProfileSection = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.div`
  img {
    border-radius: 35px;
    width: 80px;
  }
`;

const UserInfo = styled.div`
  /* 사용자 정보 스타일 */

  text-align: center;
  margin-bottom: 50px;
  p {
    color: black;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 20px;
  }
`;

export default Profile;
