import LocalNav from 'components/common/Navbar/LocalNav';
import Image from 'next/image';
import { useRouter } from 'next/router';
import logo from 'public/assets/mainLogo.svg';
import profile from 'public/assets/profile.svg';
import search from 'public/assets/searchIcon.svg';
import styled from 'styled-components';

function GlobalNav() {
  const menuList = [
    { menuName: '소품샵 지도', menuURL: '/map' },
    { menuName: '테마별 소품샵', menuURL: '/shop/theme/list' },
    { menuName: '저장한 소품샵', menuURL: '/shop/collect' },
    { menuName: 'My Review', menuURL: '/review/my' },
  ];

  interface Menu {
    menuName: string;
    menuURL: string;
  }

  const router = useRouter();
  console.log(router);

  const onClickLogo = () => {
    router.push('/');
  };

  const onClickMenu = (menu: Menu) => {
    menu.menuName === 'My Review' ? router.push('/review/my/write') : router.push(menu.menuURL);
  };

  const isCurrentPathIncludesMyReview = () => router.asPath.includes('/review/my');

  const getIsActive = (menu: Menu) => {
    if (menu.menuName === 'My Review') {
      return isCurrentPathIncludesMyReview();
    }
    return menu.menuURL === router.asPath;
  };

  return (
    <NavbarWrapper>
      <GlobalNavWrapper>
        <GlobalNavBar>
          <LeftNav>
            <Logo onClick={() => onClickLogo()}>
              <Image src={logo} alt="logo" />
            </Logo>
            <MenuList>
              {menuList.map((menu) => (
                <Menu
                  key={menu.menuName}
                  onClick={() => onClickMenu(menu)}
                  isActive={getIsActive(menu)}
                >
                  {menu.menuName}
                </Menu>
              ))}
            </MenuList>
          </LeftNav>
          <RightNav>
            <SearchBar>
              <SearchIcon>
                <Image src={search} alt="search" />
              </SearchIcon>
              <SearchText />
            </SearchBar>
            <Login>로그아웃</Login>
            <Profile>
              <Image src={profile} alt="profile" />
            </Profile>
          </RightNav>
        </GlobalNavBar>
      </GlobalNavWrapper>
      {isCurrentPathIncludesMyReview() && <LocalNav />}
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.div``;

const GlobalNavWrapper = styled.div`
  width: 100%;
  padding: 2.8rem 36rem;
  border-bottom: solid 1px #ebe9e8;
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
  color: ${(props) => props.isActive && '#abacfe'};
  font-weight: ${(props) => (props.isActive ? '600' : '400')};
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  width: 28.2rem;
  height: 4rem;
  margin-right: 2.1rem;
  border: 2px solid #abacfe;
  border-radius: 20px;
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.2rem;
  width: 2.1rem;
  height: 2rem;
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
`;

const Profile = styled.div`
  width: 3.4rem;
  height: 3.4rem;
`;

export default GlobalNav;
