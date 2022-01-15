import { useRouter } from 'next/router';
import styled from 'styled-components';

function LocalNav() {
  interface MenuList {
    menuName: string;
    menuURL: string;
  }

  const reviewMenuList = [
    { menuName: '내가 작성한 리뷰', menuURL: '/review/my/write' },
    { menuName: '스크랩한 리뷰', menuURL: '/review/my/scrap' },
  ];

  const router = useRouter();
  console.log(router.pathname);
  const onClickMenu = (menu: MenuList) => {
    router.push(menu.menuURL);
  };

  return (
    <LocalNavbarWrapper>
      <LocalNavbar>
        {reviewMenuList.map((menu) => (
          <ReviewMenu
            key={menu.menuName}
            onClick={() => onClickMenu(menu)}
            isActive={menu.menuURL === router.asPath}
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
  padding: 0 36rem;
  border-bottom: solid 1px ${({ theme }) => theme.colors.navLine};
`;

const LocalNavbar = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.gray1};

  & > a {
    min-width: fit-content;
  }
  width: 119.5rem;
`;

const ReviewMenu = styled.a<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  margin-right: 3.2rem;
  height: 6.2rem;
  font-weight: 500;
  color: ${(props) => props.isActive && props.theme.colors.purpleMain};
  font-weight: ${(props) => (props.isActive ? '600' : '400')};
  border-bottom: ${(props) => props.isActive && ('solid 2px' || props.theme.colors.purpleMain)};
`;
export default LocalNav;
