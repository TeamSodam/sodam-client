import { useAppSelector } from 'app/hook';
import { useGetUserImageQuery } from 'features/users/userApi';
import { selectIsLogin } from 'features/users/userSlice';
import { useRouter } from 'next/router';
import Screen from 'styles/Screen';

import GlobalNavDesktop from './Desktop';
import GlobalNavMobile from './Mobile';

export interface MenuListType {
  menuName: string;
  menuURL: string;
  routeTo?: string;
}

export interface NavProps {
  isMyReview: () => boolean;
  getIsActive: (menu: MenuListType) => boolean;
  onClickMenu: (menu: MenuListType) => string;
  userImage: string | undefined;
  isLogin: boolean;
}

export const menuList: MenuListType[] = [
  { menuName: '소품샵 지도', menuURL: '/map' },
  { menuName: '테마별 소품샵', menuURL: '/shop/theme', routeTo: '/shop/theme/아기자기한' },
  { menuName: '저장한 소품샵', menuURL: '/shop/collect' },
  { menuName: 'MY REVIEW', menuURL: '/review/my', routeTo: '/review/my/write' },
];

function GlobalNav() {
  const router = useRouter();
  const isLogin = useAppSelector(selectIsLogin);
  const { data: userImage } = useGetUserImageQuery(undefined, {
    skip: !isLogin,
  });

  const onClickMenu = (menu: MenuListType) => {
    if (menu.routeTo) return menu.routeTo;
    return menu.menuURL;
  };

  const isCurrentPathIncludesMyReview = () => router.asPath.includes('/review/my');

  const getIsActive = (menu: MenuListType) => router.asPath.includes(menu.menuURL);

  const navProps = {
    isLogin,
    onClickMenu,
    getIsActive,
    isMyReview: isCurrentPathIncludesMyReview,
    userImage: userImage?.image,
  };

  return (
    <>
      <Screen desktop wide>
        <GlobalNavDesktop {...navProps} />
      </Screen>
      <Screen mobile tablet>
        <GlobalNavMobile {...navProps} />
      </Screen>
    </>
  );
}

export default GlobalNav;
