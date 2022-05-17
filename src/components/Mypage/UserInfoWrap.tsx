import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { UserImage, UserInfo } from 'types/user';

import UserInfoInput from './UserInfoInput';

interface Props {
  userInfo: UserInfo;
  userImage: UserImage;
}

function UserInfoWrap(props: Props) {
  const { userInfo, userImage } = props;
  const { name, nickname, email } = userInfo;

  return (
    <StyledRoot>
      <h2>{name}님의 정보</h2>
      <div className="outer-wrap">
        <div className="inner-wrap__left">
          <StyledImage>
            <Image src={userImage.image} layout="fill" alt="profile" />
          </StyledImage>
          <button className="button__profile">프로필 사진 설정</button>
        </div>
        <div className="inner-wrap__right">
          <UserInfoInput label="이름" initialValue={name} />
          <UserInfoInput label="닉네임" initialValue={nickname} canEdit editOptions={{editText: '닉네임 수정', confirmText: '수정 완료', onChange: (text: string) => {}, onConfirm: () => {}}} />
          <UserInfoInput label="ID (이메일)" initialValue={email} />
        </div>
      </div>
    </StyledRoot>
  );
}

const StyledRoot = styled.section`
  h2 {
    font-size: 2.6rem;
    font-weight: 700;
    line-height: 3.8rem;
    color: ${theme.colors.purpleText};
    margin-bottom: 5rem;
  }
  .outer-wrap {
    display: flex;
  }
  .inner-wrap {
    &__left {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-right: 4.2rem;
    }
    &__right div:last-child {
      margin: 0;
    }
  }
  button {
    background: none;
    border: none;
  }
  .button {
    &__profile {
      font-size: 1.2rem;
      line-height: 1.7rem;
      color: ${theme.colors.purpleText};
      width: fit-content;
      height: fit-content;
      margin-top: 1.2rem;
    }
  }
`;
const StyledImage = styled.div`
  position: relative;
  width: 11rem;
  height: 11rem;
  border-radius: 50%;
  img {
    border-radius: 50%;
  }
`;

export default UserInfoWrap;
