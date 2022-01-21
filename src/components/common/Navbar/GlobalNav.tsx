import LocalNav from 'components/common/Navbar/LocalNav';
import { useRouter } from 'next/router';
import MainLogoIC from 'public/assets/mainLogo.svg';
import ProfileIC from 'public/assets/profile.svg';
import SearchIC from 'public/assets/searchIcon.svg';
import styled from 'styled-components';

interface MenuListType {
  menuName: string;
  menuURL: string;
  routeTo?: string;
}

function GlobalNav() {
  const menuList: MenuListType[] = [
    { menuName: '소품샵 지도', menuURL: '/map' },
    { menuName: '테마별 소품샵', menuURL: '/shop/theme', routeTo: '/shop/theme/아기자기한' },
    { menuName: '저장한 소품샵', menuURL: '/shop/collect' },
    { menuName: 'MY REVIEW', menuURL: '/review/my', routeTo: '/review/my/write' },
  ];

  const router = useRouter();

  const onClickLogo = () => {
    router.push('/');
  };

  const onClickMenu = (menu: MenuListType) => {
    if (menu.routeTo) return menu.routeTo;
    return menu.menuURL;
  };

  const isCurrentPathIncludesMyReview = () => router.asPath.includes('/review/my');

  const getIsActive = (menu: MenuListType) => router.asPath.includes(menu.menuURL);

  return (
    <>
      <GlobalNavWrapper>
        <GlobalNavBar>
          <LeftNav>
            <Logo onClick={onClickLogo}>
              <MainLogoIC />
            </Logo>
            <MenuList>
              {menuList.map((menu) => (
                <Menu key={menu.menuName} href={onClickMenu(menu)} isActive={getIsActive(menu)}>
                  {menu.menuName}
                </Menu>
              ))}
            </MenuList>
          </LeftNav>
          <RightNav>
            <SearchBar>
              <SearchIcon>
                <SearchIC />
              </SearchIcon>
              <SearchText />
            </SearchBar>
            <Login>로그아웃</Login>
            <Profile>
              <ProfileIC />
            </Profile>
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
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid 1px ${({ theme }) => theme.colors.navLine};
`;

const GlobalNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 119.5rem;
`;

const LeftNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  width: 5.8rem;
  height: 2.6rem;
  margin-right: 4.3rem;

  &:hover {
    cursor: pointer;
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
`;

const Menu = styled.a<{ isActive: boolean }>`
  margin-right: 3.2rem;
  color: ${(props) => (props.isActive ? props.theme.colors.purpleMain : props.theme.colors.black2)};
  font-weight: ${(props) => (props.isActive ? '600' : '400')};

  &:hover {
    cursor: pointer;
  }

  text-decoration: none;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  width: 28.2rem;
  height: 4rem;
  margin-right: 2.1rem;
  border: 2px solid ${({ theme }) => theme.colors.purpleMain};
  border-radius: 20px;
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.2rem;
  width: 2.1rem;
  height: 2rem;
  cursor: pointer;
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

const Login = styled.div`
  font-size: 1.6rem;
  margin-right: 2.7rem;
  min-width: fit-content;
  cursor: pointer;
`;

const Profile = styled.div`
  width: 3.4rem;
  height: 3.4rem;
  cursor: pointer;
`;

export default GlobalNav;
