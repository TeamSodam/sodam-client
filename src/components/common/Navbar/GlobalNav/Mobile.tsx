import Link from 'next/link';
import SearchIC from 'public/assets/ic_search_mobile.svg';
import ProfileIC from 'public/assets/profile_mobile.svg';
import styled from 'styled-components';

import { menuList, NavProps } from '.';

function GlobalNavMobile(props: NavProps) {
  const { onClickMenu, getIsActive } = props;
  return (
    <GlobalNavWrapper>
      <NavTop>
        <h1>
          <Link href="/" passHref>
            <MainLogo />
          </Link>
        </h1>
        <NavTopRightWrapper>
          <SearchIcon />
          <ProfileIC />
        </NavTopRightWrapper>
      </NavTop>
      <NavBottom>
        {menuList.map((menu) => (
          <Link key={menu.menuName} href={onClickMenu(menu)} passHref>
            <Menu isActive={getIsActive(menu)}>{menu.menuName}</Menu>
          </Link>
        ))}
      </NavBottom>
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
  gap: 1.5rem;
`;

const SearchIcon = styled(SearchIC)`
  transform: translate(1px, 1px);
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

export default GlobalNavMobile;
