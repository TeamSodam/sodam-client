import SearchIC from 'public/assets/ic_search_mobile.svg';
import MainLogoIC from 'public/assets/mainLogoDesktop.svg';
import ProfileIC from 'public/assets/profile_mobile.svg';
import styled from 'styled-components';

import { NavProps } from '.';

function GlobalNavMobile(props: NavProps) {
  return (
    <GlobalNavWrapper>
      <NavTop>
        <MainLogoIC />
        <NavTopRightWrapper>
          <SearchIcon />
          <ProfileIC />
        </NavTopRightWrapper>
      </NavTop>
      <NavBottom />
    </GlobalNavWrapper>
  );
}

const GlobalNavWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.5rem 0 1.4rem 0;
`;

const NavTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NavBottom = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const NavTopRightWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SearchIcon = styled(SearchIC)`
  transform: translate(1px, 1px);
`;

export default GlobalNavMobile;
