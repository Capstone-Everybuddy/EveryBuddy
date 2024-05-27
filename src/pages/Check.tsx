import React, { useEffect } from 'react';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Main from 'components/Main';
import { useNavigate } from 'react-router-dom';

const Check = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a check process
    setTimeout(() => {
      // Set the isChecked flag in localStorage to true and navigate back to register
      localStorage.setItem('isChecked', 'true');
      navigate('/register');
    }, 2000); // 2 seconds delay
  }, [navigate]);

  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <Header title="Chat" />
        <h1>안녕하세요</h1>
      </Layout.PageContent>
    </Main.Wrapper>
  );
};

export default Check;
