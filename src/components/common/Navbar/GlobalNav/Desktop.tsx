import { useAppDispatch } from 'app/hook';
import LocalNav from 'components/common/Navbar/LocalNav';
import { logout } from 'features/users/userSlice';
import Image from 'next/image';
import Link from 'next/link';
import SearchICDesktop from 'public/assets/ic_search_desktop.svg';
import MainLogoIC from 'public/assets/mainLogo.svg';
import MainLogoDesktopIC from 'public/assets/mainLogoDesktop.svg';
import ProfileIC from 'public/assets/profile.svg';
import SearchIC from 'public/assets/searchIcon.svg';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import Screen from 'styles/Screen';

import { menuList, NavProps } from '.';

function GlobalNavDesktop(props: NavProps) {
  const {
    onClickMenu,
    isMyReview: isCurrentPathIncludesMyReview,
    getIsActive,
    userImage,
    isLogin,
  } = props;

  const dispatch = useAppDispatch();

  return (
    <>
      <GlobalNavWrapper>
        <GlobalNavBar>
          <LeftNav>
            <Link href="/" passHref>
              <Logo>
                <Screen wide>
                  <MainLogoIC />
                </Screen>
                <Screen tablet desktop>
                  <MainLogoDesktopIC />
                </Screen>
              </Logo>
            </Link>
            <MenuList>
              {menuList.map((menu) => (
                <Link key={menu.menuName} href={onClickMenu(menu)} passHref>
                  <Menu isActive={getIsActive(menu)}>{menu.menuName}</Menu>
                </Link>
              ))}
            </MenuList>
          </LeftNav>
          <RightNav>
            <SearchBar>
              <SearchIcon>
                <Screen wide>
                  <SearchIC />
                </Screen>
                <Screen tablet desktop>
                  <SearchICDesktop />
                </Screen>
              </SearchIcon>
              <SearchText />
            </SearchBar>
            {isLogin ? (
              <>
                <Logout onClick={() => dispatch(logout())}>로그아웃</Logout>
                <Link href="/mypage" passHref>
                  <Profile>
                    {userImage ? (
                      <Image src={userImage} layout="fill" alt="profile" />
                    ) : (
                      <ProfileIC />
                    )}
                  </Profile>
                </Link>
              </>
            ) : (
              <Link passHref href="/auth/login">
                <Login>로그인</Login>
              </Link>
            )}
          </RightNav>
        </GlobalNavBar>
      </GlobalNavWrapper>
      {isCurrentPathIncludesMyReview() && <LocalNav />}
    </>
  );
}

const GlobalNavWrapper = styled.div`
  width: 100%;
  height: 8.2rem;
  min-height: 8.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:after {
    content: '';
    position: absolute;
    width: ${({ theme }) => theme.clientWidth}px;
    top: 8.2rem;
    background-color: ${({ theme }) => theme.colors.navLine};
    height: 1px;
  }

  ${applyMediaQuery('desktop')} {
    height: 5.4rem;
    min-height: 5.4rem;

    &:after {
      top: 5.4rem;
    }
  }
`;

const GlobalNavBar = styled.div`
  width: 119.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${applyMediaQuery('desktop')} {
    margin-right: 12.5%;
  }
`;

const RightNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  width: 5.8rem;
  height: 2.6rem;
  margin-right: 4.3rem;

  &:hover {
    cursor: pointer;
  }

  display: flex;
  align-items: center;

  ${applyMediaQuery('desktop')} {
    margin-right: 2rem;
  }
`;

const MenuList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 500;

  & > a {
    min-width: fit-content;
  }

  ${applyMediaQuery('desktop')} {
    font-size: 1.2rem;
    line-height: 1.7rem;
  }
`;

const Menu = styled.a<{ isActive: boolean }>`
  margin-right: 3.2rem;
  color: ${(props) => (props.isActive ? props.theme.colors.purpleMain : props.theme.colors.black2)};
  font-weight: ${(props) => (props.isActive ? '600' : '400')};

  &:hover {
    cursor: pointer;
  }

  text-decoration: none;

  ${applyMediaQuery('desktop')} {
    margin-right: 2.8rem;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  width: 28.2rem;
  height: 4rem;
  margin-right: 2.1rem;
  border: 2px solid ${({ theme }) => theme.colors.purpleMain};
  border-radius: 20px;

  ${applyMediaQuery('desktop')} {
    width: 15.7rem;
    height: 2.2rem;
  }
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.2rem;
  width: 2.1rem;
  height: 2rem;
  cursor: pointer;

  ${applyMediaQuery('desktop')} {
    width: 1.1rem;
    height: 1.1rem;
    margin-left: 0.8rem;
  }
`;

const SearchText = styled.input`
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  margin: 0 1rem;

  &:focus {
    outline: none;
  }
`;

const Logout = styled.button`
  font-family: 'Noto Sans KR';
  padding: 0;
  border: none;
  background-color: transparent;
  font-size: 1.6rem;
  margin-right: 2.7rem;
  min-width: fit-content;
  cursor: pointer;

  ${applyMediaQuery('desktop')} {
    font-size: 1.2rem;
    line-height: 1.7rem;
  }
`;

const Login = styled.a`
  color: inherit;
  text-decoration: none;
  font-size: 1.6rem;
  margin-right: 2.7rem;
  min-width: fit-content;
  cursor: pointer;

  ${applyMediaQuery('desktop')} {
    font-size: 1.2rem;
    line-height: 1.7rem;
  }
`;

const Profile = styled.div`
  position: relative;
  width: 3.4rem;
  height: 3.4rem;
  cursor: pointer;
  img {
    border-radius: 50%;
  }

  ${applyMediaQuery('desktop')} {
    width: 2.2rem;
    height: 2.2rem;

    & svg {
      transform: scale(0.647) translate(-30%, -30%);
    }
  }
`;

export default GlobalNavDesktop;
