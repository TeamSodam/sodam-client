import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

function LocalNav() {
  interface MenuList {
    menuName: string;
    menuURL: string[];
  }

  const reviewMenuList = [
    { menuName: '내가 작성한 리뷰', menuURL: ['/review/my/write', '/review/my/emptyWrite'] },
    { menuName: '스크랩한 리뷰', menuURL: ['/review/my/scrap', '/review/my/emptyScrap'] },
  ];

  const router = useRouter();
  const onClickMenu = (menu: MenuList) => {
    router.push(menu.menuURL[0]);
  };

  return (
    <LocalNavbarWrapper>
      <LocalNavbar>
        {reviewMenuList.map((menu) => (
          <ReviewMenu
            key={menu.menuName}
            onClick={() => onClickMenu(menu)}
            isActive={menu.menuURL.some((url) => url === router.asPath)}
          >
            {menu.menuName}
          </ReviewMenu>
        ))}
      </LocalNavbar>
    </LocalNavbarWrapper>
  );
}

const LocalNavbarWrapper = styled.div`
  width: 100%;
  height: 6.2rem;

  ${applyMediaQuery('desktop')} {
    height: 4.2rem;
  }
  ${applyMediaQuery('mobile')} {
    height: 3.6rem;
  }
`;

const NavLineStyle = css`
  content: '';
  position: absolute;
  top: calc(8.2rem + 6.2rem);
  left: 0;
  ${applyMediaQuery('desktop')} {
    top: calc(5.4rem + 4.2rem);
  }
  width: ${({ theme }) => theme.clientWidth}px;
  background-color: ${({ theme }) => theme.colors.navLine};
  height: 1px;
`;

const LocalNavbar = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.gray1};

  ${applyMediaQuery('desktop', 'tablet')} {
    font-size: 1.1rem;
    line-height: 1.6rem;
    height: 4.2rem;
  }
  ${applyMediaQuery('mobile')} {
    font-size: 1rem;
    line-height: 1.4rem;
    height: 3.6rem;
  }

  & > a {
    min-width: fit-content;
  }
  width: 100%;
  height: 100%;

  &::after {
    ${NavLineStyle}
    ${applyMediaQuery('mobile')} {
      top: calc(5.9rem + 4.8rem + 3.6rem);
    }
  }
  &::before {
    ${NavLineStyle}
    ${applyMediaQuery('mobile')} {
      top: calc(5.9rem + 4.8rem);
    }
  }
`;

const ReviewMenu = styled.a<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  margin-right: 3.2rem;
  height: 100%;
  font-weight: 500;
  cursor: pointer;
  color: ${(props) => props.isActive && props.theme.colors.purpleMain};
  font-weight: ${(props) => (props.isActive ? '600' : '400')};
  border-bottom: ${(props) => props.isActive && ('solid 2px' || props.theme.colors.purpleMain)};
  margin-bottom: ${(props) => (props.isActive ? '-2px' : '0')};

  &:hover {
    cursor: pointer;
  }
`;
export default LocalNav;
