import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Main from 'components/Main';
import { MdEdit } from 'react-icons/md';
import Button from '../components/Button';

interface UserUpdateProps {
  name: string | null;
  token: string | null;
}

const UserUpdate: React.FC<UserUpdateProps> = ({ name, token }) => {
  const [user_name, setUser_name] = useState<string>();
  const [user_id, setUser_id] = useState<string>();
  const [user_pwd, setUser_pwd] = useState<string>();
  const [user_language, setUser_language] = useState<string>();
  const [user_major, setUser_major] = useState<string>();
  const [user_studentNum, setUser_studentNum] = useState<string>();
  const [image, setImage] = useState<string>(
    'https://via.placeholder.com/80x80',
  );
  const [previewImageSrc, setPreviewImageSrc] = useState<string>(
    'https://via.placeholder.com/80x80',
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (name && token) {
        // name과 token이 존재할 때에만 요청을 보냄
        const response = await fetch(`서버URL/user?user_name=${name}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });
        const result = await response.json();
        if (response.status === 200) {
          setUser_name(result.user_name);
          setUser_id(result.user_id);
          setUser_pwd(result.user_pwd);
          setUser_language(result.user_language);
          setUser_major(result.user_major);
          setImage(result.profileImage);
          setPreviewImageSrc(result.profileImage);
        } else {
          console.log('실패');
        }
      }
    };

    fetchData();
  }, [name, token]);

  // handleSubmit 함수를 정의하거나 사용하지 않도록 수정

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  // 이미지 변경 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedImage = files[0];
      // 이미지를 미리보기에 설정
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageSrc(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
      // 이미지를 서버에 업로드하거나 다른 작업 수행
    }
  };

  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <Header title="Edit Profile" />
        <StyledForm onSubmit={handleSubmit}>
          <UserImg>
            <img
              src={previewImageSrc}
              alt=""
              style={{ width: '80px', height: '80px' }}
            />
            <MdEditIcon
              onClick={() => inputRef.current && inputRef.current.click()}
            />
            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </UserImg>
          <UserInfo>
            <Edit>
              <label>NAME</label>
              <input
                type="text"
                value={user_name}
                placeholder="Name"
                onChange={(e) => setUser_name(e.target.value)}
              />
            </Edit>

            <Edit>
              <label>ID</label>
              <input
                type="text"
                value={user_id}
                placeholder="Id"
                onChange={(e) => setUser_id(e.target.value)}
              />
            </Edit>

            <Edit>
              <label>PASSWORD</label>
              <input
                type="text"
                value={user_pwd}
                placeholder="Password"
                onChange={(e) => setUser_pwd(e.target.value)}
              />
            </Edit>

            <Edit>
              <label>LANGUAGE</label>
              <input
                type="text"
                value={user_language}
                placeholder="Language"
                onChange={(e) => setUser_language(e.target.value)}
              />
            </Edit>

            <Edit>
              <label>MAJOR</label>
              <input
                type="text"
                value={user_major}
                placeholder="Major"
                onChange={(e) => setUser_major(e.target.value)}
              />
            </Edit>

            <Edit>
              <label>STUDENT NUMBER</label>
              <input
                type="text"
                value={user_studentNum}
                placeholder="Student Number"
                onChange={(e) => setUser_studentNum(e.target.value)}
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
const UserImg = styled.div`
  img {
    border-radius: 35px;
  }
`;

const MdEditIcon = styled(MdEdit)`
  position: absolute;
  top: 210px;
  right: 160px;
  cursor: pointer;
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

    &::placeholder {
      padding-left: 20px;
    }
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

export default UserUpdate;
