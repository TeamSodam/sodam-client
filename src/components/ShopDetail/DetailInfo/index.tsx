import { usePostBookmarkMutation } from 'features/shops/shopApi';
import useMedia from 'hooks/useMedia';
import Blog from 'public/assets/ic_blog.svg';
import StarIC from 'public/assets/ic_empty_star.svg';
import Instagram from 'public/assets/ic_instagram.svg';
import Phone from 'public/assets/ic_phone.svg';
import SmartStore from 'public/assets/ic_smartstore.svg';
import Sns from 'public/assets/ic_sns.svg';
import Subway from 'public/assets/ic_subway.svg';
import Time from 'public/assets/ic_time.svg';
import Website from 'public/assets/ic_website.svg';
import { useState } from 'react';
import type { AnyStyledComponent } from 'styled-components';
import styled from 'styled-components';
import { Shop } from 'types/shop';

import DesktopLayout from './DesktopLayout';
import IconContent, { IconContentProps } from './IconContent';
import MobileLayout from './MobileLayout';

function DetailInfo({ shopInfo }: { shopInfo: Shop }) {
  const { isMobile } = useMedia();
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
      mainIcon: Subway,
      iconName: '지하철역',
      content: subway,
    },
    {
      mainIcon: Website,
      iconName: '홈페이지',
      content: homepage,
    },
    {
      mainIcon: Phone,
      iconName: '전화번호',
      content: phone,
    },
    {
      mainIcon: Sns,
      iconName: 'SNS',
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
      mainIcon: Time,
      iconName: '영업시간',
      content: time,
    },
  ];

  const showCategory = () => {
    if (typeof category === 'string') return category;
    return category.join(',');
  };

  const showIconContent = () =>
    iconContents.map((iconContent) => <IconContent key={iconContent.iconName} {...iconContent} />);

  const showTheme = (StTheme: AnyStyledComponent) => {
    if (typeof theme === 'string') {
      return <StTheme>{theme}</StTheme>;
    }
    return theme.map((eachTheme) => <StTheme key={eachTheme}>{eachTheme}</StTheme>);
  };

  const toggleBookmark = () => setCurrentBookmarked((prevState) => !prevState);

  const handleClick = () => {
    toggleBookmark();
    bookmarkPost({ shopId, isBookmarked: !currentBookmarked });
  };

  const layoutProps = {
    shopName,
    showCategory,
    showTheme,
    showIconContent,
    BookMarkBtn: <BookMarkBtn isBookmarked={currentBookmarked} onClick={handleClick} />,
  };

  return isMobile ? <MobileLayout {...layoutProps} /> : <DesktopLayout {...layoutProps} />;
}

const BookMarkBtn = styled(StarIC)<{ isBookmarked: boolean }>`
  background-color: transparent;
  border: none;

  fill: ${(props) => props.isBookmarked && props.theme.colors.purpleMain};
`;

export default DetailInfo;
