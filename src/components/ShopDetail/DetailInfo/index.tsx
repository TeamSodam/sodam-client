import { useAppSelector } from 'app/hook';
import { usePostBookmarkMutation } from 'features/shops/shopApi';
import { selectIsLogin } from 'features/users/userSlice';
import useMedia from 'hooks/useMedia';
import { useRouter } from 'next/router';
import Blog from 'public/assets/ic_blog.svg';
import Instagram from 'public/assets/ic_instagram.svg';
import SmartStore from 'public/assets/ic_smartstore.svg';
import { useState } from 'react';
import { copyToClipboard } from 'src/utils/copyToClipboard';
import type { AnyStyledComponent } from 'styled-components';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { getBackgroundImageCss } from 'styles/mixin';
import { Shop } from 'types/shop';

import DesktopLayout from './DesktopLayout';
import IconContent, { IconContentProps } from './IconContent';
import MobileLayout from './MobileLayout';

function DetailInfo({
  shopInfo,
  fireToast,
}: {
  shopInfo: Shop;
  fireToast: (text: string) => void;
}) {
  const { isMobile, isTablet } = useMedia();
  const isSmallDevice = isMobile || isTablet;
  const isLogin = useAppSelector(selectIsLogin);
  const router = useRouter();
  const {
    shopName,
    category,
    theme,
    phone,
    time,
    homepage,
    instagram,
    subway,
    store,
    blog,
    isBookmarked,
    shopId,
  } = shopInfo;

  const [currentBookmarked, setCurrentBookmarked] = useState(isBookmarked);
  const [bookmarkPost] = usePostBookmarkMutation();

  const iconContents: IconContentProps[] = [
    {
      iconName: '지하철역',
      content: subway,
      iconUrl: '/assets/ic_subway.svg',
      mobileOrder: 1,
    },
    {
      iconName: '홈페이지',
      content: homepage,
      iconUrl: '/assets/ic_website.svg',
      mobileOrder: 4,
    },
    {
      iconName: '전화번호',
      content: phone,
      iconUrl: '/assets/ic_phone.svg',
      mobileOrder: 2,
    },
    {
      iconName: 'SNS',
      iconUrl: '/assets/ic_sns.svg',
      mobileOrder: 5,
      content: [
        {
          icon: Instagram,
          isFilled: !!instagram,
          link: instagram || '',
        },
        {
          icon: SmartStore,
          isFilled: !!store,
          link: store || '',
        },
        {
          icon: Blog,
          isFilled: !!blog,
          link: blog || '',
        },
      ],
    },
    {
      iconName: '영업시간',
      content: time,
      iconUrl: '/assets/ic_time.svg',
      mobileOrder: 3,
    },
  ];

  const showCategory = () => {
    if (typeof category === 'string') return category;
    return category.join(',');
  };

  const showIconContent = () => {
    const orderedIconContents = isSmallDevice
      ? [...iconContents].sort((a, b) => a.mobileOrder - b.mobileOrder)
      : iconContents;

    return orderedIconContents.map((iconContent) => (
      <IconContent key={iconContent.iconName} {...iconContent} />
    ));
  };

  const showTheme = (StTheme: AnyStyledComponent) => {
    if (typeof theme === 'string') {
      return <StTheme>{theme}</StTheme>;
    }
    return theme.map((eachTheme) => <StTheme key={eachTheme}>{eachTheme}</StTheme>);
  };

  const toggleBookmark = () => setCurrentBookmarked((prevState) => !prevState);

  const handleClick = () => {
    if (isLogin) {
      toggleBookmark();
      bookmarkPost({ shopId, isBookmarked: !currentBookmarked });
    } else {
      router.push(`/auth/login?from=${encodeURIComponent(router.asPath)}`);
    }
  };

  const copyCurrentLink = async () => {
    await copyToClipboard(
      location.href,
      () => fireToast('클립보드에 복사했어요.'),
      () => fireToast('복사에 실패했어요.'),
    );
  };

  const layoutProps = {
    shopName,
    showCategory,
    showTheme,
    showIconContent,
    BookMarkBtn: <BookMarkBtn isBookmarked={currentBookmarked} onClick={handleClick} />,
    copyCurrentLink,
  };

  return isSmallDevice ? <MobileLayout {...layoutProps} /> : <DesktopLayout {...layoutProps} />;
}

const BookMarkBtn = styled.button<{ isBookmarked: boolean }>`
  ${({ isBookmarked }) =>
    getBackgroundImageCss(isBookmarked ? '/assets/ic_pin_star.svg' : '/assets/ic_empty_star.svg')};

  border: none;
  width: 3.2rem;
  height: 3.2rem;

  ${applyMediaQuery('mobile', 'tablet')} {
    width: 1.78rem;
    height: 1.78rem;
  }
`;

export default DetailInfo;
