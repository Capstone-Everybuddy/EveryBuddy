import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Main from 'components/Main';
import segmented from '../assets/segmented.png';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

interface User {
  user_name: string;
  user_id?: string;
  user_language?: string;
  user_pwd?: string;
  user_studentNum?: string;
  profileImage: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User>({
    user_name: '유저',
    user_id: '유저아이디',
    user_language: 'English',
    user_pwd: 'passwordxxx',
    user_studentNum: '20xxxxxxxxx',
    profileImage: 'https://via.placeholder.com/80x80',
  });

  const token = sessionStorage.getItem('token');
  const name = sessionStorage.getItem('name');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`서버URL/user?user_name=${name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      const result = await response.json();
      if (response.status === 200) {
        setUser({
          user_name: result.name,
          user_id: result.user_id,
          user_pwd: result.user_pwd,
          user_language: result.user_language,
          user_studentNum: result.user_studentNum,
          profileImage: result.profileImage,
        });
      } else {
        console.log('실패');
      }
    };
    fetchData();
  }, [name, token]);

  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <Header title="My Profile" />
        <Image src={segmented} alt="토글" />
        <UserProfile>
          <ProfileSection>
            <ProfileImage>
              <img src={user.profileImage} alt="프로필사진" />
            </ProfileImage>
            <UserInfo>
              <h1>{user.user_name}</h1>
              <p>{user.user_id}</p>
              <p>{user.user_pwd}</p>
              <p>{user.user_language}</p>
              <p>{user.user_studentNum}</p>
            </UserInfo>
          </ProfileSection>
          <Link to="/userupdate">
            <Button text="정보 수정하기" />
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
