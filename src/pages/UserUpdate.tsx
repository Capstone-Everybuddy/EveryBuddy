import React, { useState, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Main from 'components/Main';
import Button from '../components/Button';
import { useAuth } from 'components/AuthContext';
import { api } from 'api/Client';

interface User {
  user_name: string;
  user_id?: string;
  user_language?: string;
  user_sex: number;
  user_major: string;
  user_pwd?: string;
  user_studentNum?: string;
  profileImage: string;
}

const UserUpdate: React.FC = () => {
  const [userProfile, setUserProfile] = useState<User>({
    user_name: 'USER',
    user_id: 'USERID',
    user_sex: 1,
    user_major: 'computer',
    user_pwd: 'passwordxxx',
    user_studentNum: '20xxxxxxxxx',
    profileImage: 'https://via.placeholder.com/80x80',
  });

  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user) {
          let profileData;
          if (user.role === 'seoulmate') {
            profileData = await api.seoulmates.getSeoulmateProfile(user.idx);
          } else {
            profileData = await api.buddies.getBuddyProfile(user.idx);
          }
          setUserProfile({
            user_name: profileData.name || 'USER',
            user_id: profileData.id || 'USERID',
            user_major: profileData.major || 'computer',
            user_sex: profileData.sex || 1,
            user_pwd: profileData.password || 'passwordxxx',
            user_studentNum: profileData.studentId || '20xxxxxxxxx',
            profileImage:
              profileData.profileImg || 'https://via.placeholder.com/80x80',
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (user) {
        if (user.role === 'seoulmate') {
          console.log('api call modify');

          await api.seoulmates.modifySeoulmateProfile(user.idx, {
            name: userProfile.user_name,
            id: userProfile.user_id,
            password: userProfile.user_pwd,
            studentId: userProfile.user_studentNum,
            profileImg: userProfile.profileImage,
            major: userProfile.user_major,
            sex: userProfile.user_sex,
          });
        } else {
          await api.buddies.modifyBuddyProfile(user.idx, {
            name: userProfile.user_name,
            id: userProfile.user_id,
            password: userProfile.user_pwd,
            studentId: userProfile.user_studentNum,
            profileImg: userProfile.profileImage,
            major: userProfile.user_major,
            sex: userProfile.user_sex,
          });
        }
        alert('Profile updated successfully');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile');
    }
  };

  const editProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <Header title="Edit Profile" />
        <Container>
          <StyledForm onSubmit={handleSubmit}>
            <UserInfo>
              <Edit>
                <label>PASSWORD</label>
                <input
                  name="user_pwd"
                  type="password"
                  placeholder="Password"
                  value={userProfile.user_pwd}
                  onChange={editProfile}
                />
              </Edit>
            </UserInfo>
            {/* submit button */}
            <FormButton>
              <Button text="Submit" type="submit"></Button>
              <Link to="/">
                <Button text="Logout" type="button"></Button>
              </Link>
            </FormButton>
          </StyledForm>
        </Container>
      </Layout.PageContent>
    </Main.Wrapper>
  );
};

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  margin-top: 40px;
  flex-direction: column;
  align-items: center;
`;

const UserInfo = styled.div`
  margin-bottom: 40px;
`;
const Edit = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  label {
    font-weight: 700;
    font-size: 16px;
  }
  input {
    border-radius: 20px;
    border: 1.5px solid #e8e8e8;
    height: 35px;
    margin-left: 30px;
    background-color: #f6f6f6;

    padding-left: 20px; /* 왼쪽에 패딩 추가 */
  }
`;

const FormButton = styled.div`
  width: 300px;
  display: flex;
  Button {
    font-size: 16px;
    margin: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  /* 스크롤바 감추기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 및 Edge */

  /* Webkit 기반 브라우저(Chrome, Safari 등)에서 스크롤바 감추기 */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

export default UserUpdate;
