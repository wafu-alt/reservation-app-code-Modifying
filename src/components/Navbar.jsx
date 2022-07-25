import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../components/Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import baseStyle from '../styles/baseStyle';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const handleRegisterClick = () => {
    setRegisterModalOpen(true);
  };

  // 마이페이지
  const handleMyPageClick = () => {
    navigate('/mypage');
  };
  // 로그아웃
  const handleLogoutClick = () => {
    sessionStorage.clear();
    setIsLogin(false);
    alert('로그아웃 되었습니다.');
  };

  useEffect(() => {
    if (sessionStorage.getItem('token') !== null) {
      setIsLogin(true);
    }
  });

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <>
      <Modal open={loginModalOpen} close={() => setLoginModalOpen(false)}>
        <LoginForm close={() => setLoginModalOpen(false)} />
      </Modal>
      <Modal open={registerModalOpen} close={() => setRegisterModalOpen(false)}>
        <RegisterForm close={() => setRegisterModalOpen(false)} />
      </Modal>
      <NavigationBarWrap>
        <NavigationBar>
          <LogoWrap>
            <Logo src="images/logo.png" alt="logo" onClick={handleLogoClick} />
          </LogoWrap>
          <NavigationMenuWrap>
            <NavigationMunu>
              <StyledLink to="/about">About</StyledLink>
            </NavigationMunu>
            <NavigationMunu>
              <StyledLink to="/site">Cabins</StyledLink>
            </NavigationMunu>
            <NavigationMunu>
              <StyledLink to="/reservation">Reservation</StyledLink>
            </NavigationMunu>
          </NavigationMenuWrap>
          <SignWrap>
            {isLogin ? (
              <>
                <Sign onClick={handleMyPageClick}>MyPage</Sign>
                <Sign onClick={handleLogoutClick}>Logout</Sign>
              </>
            ) : (
              <>
                <Sign onClick={handleLoginClick}>Login</Sign>
                <Sign onClick={handleRegisterClick}>Register</Sign>
              </>
            )}
          </SignWrap>
        </NavigationBar>
      </NavigationBarWrap>
    </>
  );
};

export default Navbar;

const NavigationBarWrap = styled.header`
  width: 100%;
  height: 90px;
  border-bottom: 1px solid darkgray;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  font-weight: bold;
  z-index: 999;
  background-color: white;
`;

const NavigationBar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;
`;

const LogoWrap = styled.div`
  width: 200px;
`;

const Logo = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

const NavigationMenuWrap = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  justify-content: center;
  align-items: center;
`;

const NavigationMunu = styled.li`
  & + & {
    margin-left: 3rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: ${baseStyle.navbarFontSize};
  color: ${baseStyle.navbarColor};
  transition: color 0.5s;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  &:hover {
    cursor: pointer;
    color: ${baseStyle.navbarHoverColor};
  }
`;

const SignWrap = styled.ul`
  display: flex;
  margin: 0;
  justify-content: end;
  list-style: none;
  width: 200px;
`;

const Sign = styled.li`
  font-size: ${baseStyle.navbarFontSize};
  color: ${baseStyle.navbarColor};
  transition: color 0.5s;

  &:hover {
    cursor: pointer;
    color: ${baseStyle.navbarHoverColor};
  }

  & + & {
    margin-left: 2rem;
  }
`;
