import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const BottomNav = () => {
  const [activeNav, setActiveNav] = useState(1);

  const location = useLocation();

  useEffect(() => {
    const activeUrl = location.pathname;

    switch (activeUrl) {
      case '/matching':
        setActiveNav(1);
        break;
      case '/chatting':
        setActiveNav(2);
        break;
      case '/profile':
        setActiveNav(3);
        break;
      default:
        setActiveNav(1);
    }
  }, [location.pathname]);
  return (
    <NavWrapper>
      <Link to="/matching" onClick={() => setActiveNav(1)}>
        {activeNav === 1 ? (
          <img
            src="images/bottom_matching_orange.svg"
            alt="matching_orange_icon"
          />
        ) : (
          <img src="images/bottom_matching.svg" alt="matching_icon" />
        )}
      </Link>
      <Link to="/chatting" onClick={() => setActiveNav(2)}>
        {activeNav === 2 ? (
          <img
            src="images/bottom_chatting_orange.svg"
            alt="chatting_orange_icon"
          />
        ) : (
          <img src="images/bottom_chatting.svg" alt="chatting_icon" />
        )}{' '}
      </Link>
      <Link to="/profile" onClick={() => setActiveNav(3)}>
        {activeNav === 3 ? (
          <img
            src="images/bottom_profile_orange.svg"
            alt="profile_orange_icon"
          />
        ) : (
          <img src="images/bottom_profile.svg" alt="profile_icon" />
        )}{' '}
      </Link>
    </NavWrapper>
  );
};

const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 90px;
  padding: 22px 0px;
  margin: 0px;
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
  background: #ffffff;
  box-shadow: 0px 0px 10px 3px rgba(142, 142, 142, 0.1);
  border-radius: 20px;
`;

export default BottomNav;
