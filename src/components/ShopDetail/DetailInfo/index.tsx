import Blog from 'public/assets/ic_blog.svg';
import Instagram from 'public/assets/ic_instagram.svg';
import Phone from 'public/assets/ic_phone.svg';
import SmartStore from 'public/assets/ic_smartstore.svg';
import Sns from 'public/assets/ic_sns.svg';
import Subway from 'public/assets/ic_subway.svg';
import Time from 'public/assets/ic_time.svg';
import Website from 'public/assets/ic_website.svg';
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
    close,
    isBookmarked,
  } = shopInfo;

  console.log(instagram, blog, store);

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
      content: close,
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

  return (
    <Container>
      <LeftWrapper>
        <UpWrapper>
          <h1>레프트라이트 오브젝트 두줄 레프트라이트 오브젝트 두줄</h1>
          <p>{showCategory()}</p>
        </UpWrapper>
        <DownWrapper />
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
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr;
`;

const UpWrapper = styled.div`
  grid-row: 1 / 4;
  border-bottom: 1px solid ${({ theme }) => theme.colors.purpleText};

  & > h1 {
    font-size: 3rem;
    line-height: 4.4rem;
    color: ${({ theme }) => theme.colors.black2};
    font-weight: 700;
  }

  & > p {
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 2.6rem;
    color: ${({ theme }) => theme.colors.gray1};
  }
`;

const DownWrapper = styled.div`
  grid-row: 2 / 3;
  /* background-color: blue; */
`;

const RightWrapper = styled.div`
  flex: 1.7;
  height: 72%;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
`;

const IconWrapper = styled.div`
  background-color: purple;
`;

export default DetailInfo;
