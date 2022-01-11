import Image from 'next/image';
import { useRouter } from 'next/router';
import logo from 'public/assets/mainLogo.svg';
import profile from 'public/assets/profile.svg';
import search from 'public/assets/searchIcon.svg';
import styled from 'styled-components';

function GlobalNav() {
  const menuList = [
    { menuName: '소품샵 지도', menuURL: '/shopmap' },
    { menuName: '테마별 소품샵', menuURL: '/themeshop' },
    { menuName: '저장한 소품샵', menuURL: '/savedshop' },
    { menuName: 'My Review', menuURL: '/myreview' },
  ];

  const router = useRouter();
  console.log(router.pathname);
  const onClickMenu = (menu: { menuName: string; menuURL: string }) => {
    router.push(menu.menuURL);
  };

  return (
    <NavbarWrapper>
      <Navbar>
        <LeftNav>
          <Logo>
            <Image src={logo} alt="logo" />
          </Logo>
          <MenuList>
            {menuList.map((menu) => (
              <Menu
                key={menu.menuName}
                onClick={() => onClickMenu(menu)}
                isActive={menu.menuURL === router.asPath}
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
      </Navbar>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.div`
  width: 100%;
  padding: 2.8rem 36rem;
`;

const Navbar = styled.div`
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

  & > a {
    min-width: fit-content;
  }
`;

const Menu = styled.a<{ isActive: boolean }>`
  margin-right: 3.2rem;
  color: ${(props) => props.isActive && '#abacfe'};
  font-weight: ${(props) => props.isActive && 'bold'};
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
