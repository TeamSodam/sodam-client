import ImageDiv from 'components/common/ImageDiv';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import LocalNav from '../LocalNav';
import NavSearch from '../NavSearch';
import { menuList, NavProps } from '.';

function GlobalNavMobile(props: NavProps) {
  const { onClickMenu, getIsActive, isMyReview, userImage, isLogin } = props;
  return (
    <GlobalNavWrapper>
      <NavTop>
        <h1>
          <Link href="/" passHref>
            <MainLogo />
          </Link>
        </h1>
        <NavTopRightWrapper>
          <NavSearch />
          {isLogin ? (
            <Link href="/mypage" passHref>
              <StyledImage>
                {userImage ? (
                  <Image src={userImage} layout="fill" alt="profile" />
                ) : (
                  <ImageDiv
                    className="profile-icon"
                    src={'/assets/profile.svg'}
                    layout="fill"
                    alt="profile"
                  />
                )}
              </StyledImage>
            </Link>
          ) : (
            <Link passHref href="/auth/login">
              <Login>로그인</Login>
            </Link>
          )}
        </NavTopRightWrapper>
      </NavTop>
      <NavBottom>
        {menuList.map((menu) => (
          <Link key={menu.menuName} href={onClickMenu(menu)} passHref>
            <Menu isActive={getIsActive(menu)}>{menu.menuName}</Menu>
          </Link>
        ))}
      </NavBottom>
      {isMyReview() && <LocalNav />}
    </GlobalNavWrapper>
  );
}

const GlobalNavWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NavTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.5rem 0 1.4rem 0;
`;

const NavBottom = styled.nav`
  display: flex;
  justify-content: space-between;

  padding: 1.7rem 0;
`;

const NavTopRightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  .profile-icon {
    position: relative;
    width: 2rem;
    height: 2rem;
  }
`;

const StyledImage = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;
  img {
    border-radius: 50%;
  }
`;

const Menu = styled.a<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? props.theme.colors.purpleMain : props.theme.colors.black2)};
  font-weight: ${(props) => (props.isActive ? '600' : '400')};

  text-decoration: none;

  font-size: 1rem;
  line-height: 1.4rem;
`;

const MainLogo = styled.a`
  position: relative;
  display: block;
  width: 3.8rem;
  height: 100%;

  &:after {
    position: absolute;
    background-image: url('/assets/mainLogoDesktop.svg');
    background-repeat: no-repeat;

    width: 100%;
    height: 100%;

    content: '';
  }
`;

const Login = styled.a`
  color: ${({ theme }) => theme.colors.black2};
  text-decoration: none;
  font-size: 1rem;
  min-width: fit-content;
  cursor: pointer;
  font-weight: 400;
`;

export default GlobalNavMobile;
