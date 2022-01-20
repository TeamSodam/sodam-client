import { usePostBookmarkMutation } from 'features/shops/shopApi';
import Blog from 'public/assets/ic_blog.svg';
import StarIC from 'public/assets/ic_empty_star.svg';
import Instagram from 'public/assets/ic_instagram.svg';
import Phone from 'public/assets/ic_phone.svg';
import ShareIC from 'public/assets/ic_share.svg';
import SmartStore from 'public/assets/ic_smartstore.svg';
import Sns from 'public/assets/ic_sns.svg';
import Subway from 'public/assets/ic_subway.svg';
import Time from 'public/assets/ic_time.svg';
import Website from 'public/assets/ic_website.svg';
import { useState } from 'react';
import styled from 'styled-components';
import { Shop } from 'types/shop';

import IconContent, { IconContentProps } from './IconContent';

function DetailInfo({ shopInfo }: { shopInfo: Shop }) {
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

  const iconContentList: IconContentProps[] = [
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
    iconContentList.map((iconContent) => (
      <IconContent key={iconContent.iconName} {...iconContent} />
    ));

  const showTheme = () => {
    if (typeof theme === 'string') {
      return <Theme>{theme}</Theme>;
    }
    return theme.map((eachTheme) => <Theme key={eachTheme}>{eachTheme}</Theme>);
  };

  const toggleBookmark = () => setCurrentBookmarked((prevState) => !prevState);

  const handleClick = () => {
    toggleBookmark();
    let isTrue = true;
    if (currentBookmarked) {
      isTrue = false;
    }
    bookmarkPost({ shopId, isBookmarked: isTrue });
  };

  return (
    <Container>
      <LeftWrapper>
        <UpWrapper>
          <h1>{shopName}</h1>
          <p>{showCategory()}</p>
        </UpWrapper>
        <DownWrapper>
          <ThemeList>{showTheme()}</ThemeList>
          <IconWrapper>
            <BookMarkBtn isBookmarked={currentBookmarked} onClick={handleClick} />
            <ShareIC />
          </IconWrapper>
        </DownWrapper>
      </LeftWrapper>
      <RightWrapper>{showIconContent()}</RightWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 21.9rem;
  gap: 10.7rem;
`;

const LeftWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  height: 100%;
`;

const UpWrapper = styled.div`
  max-height: 75%;

  padding-bottom: 3.2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.purpleText};

  & > h1 {
    width: 95%;
    font-size: 3rem;
    line-height: 4.4rem;
    color: ${({ theme }) => theme.colors.black2};
    font-weight: 700;
    margin-bottom: 0.8rem;

    display: -webkit-box;
    white-space: normal;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > p {
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 2.6rem;
    color: ${({ theme }) => theme.colors.gray1};
  }
`;

const DownWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const RightWrapper = styled.div`
  flex: 1.7;
  height: 72%;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
`;

const ThemeList = styled.ul`
  display: flex;
  gap: 0.8rem;
`;

const Theme = styled.li`
  display: flex;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.purpleText};
  color: white;
  border-radius: 3rem;

  font-weight: 700;
  font-size: 1.2rem;
  line-height: 2rem;

  padding: 0.2rem 1.2rem;

  &:before {
    content: '#';
  }
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 2.3rem;

  & svg:hover {
    cursor: pointer;
  }
`;

const BookMarkBtn = styled(StarIC)<{ isBookmarked: boolean }>`
  background-color: transparent;
  border: none;

  fill: ${(props) => props.isBookmarked && props.theme.colors.purpleMain};
`;

export default DetailInfo;
