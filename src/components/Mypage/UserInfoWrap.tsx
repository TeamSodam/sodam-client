import {
  useDeleteUserImageMutation,
  useEditUserImageMutation,
  useEditUserNicknameMutation,
} from 'features/users/userApi';
import Image from 'next/image';
import React, { useState } from 'react';
import cropImage from 'src/utils/cropImage';
import dataURItoBlob from 'src/utils/dataURItoBlob';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';
import { UserImage, UserInfo } from 'types/auth';

import UserInfoInput from './UserInfoInput';

interface Props {
  userInfo: UserInfo;
  userImage: UserImage;
}

function UserInfoWrap(props: Props) {
  const { userInfo, userImage } = props;
  const { name, nickname, email } = userInfo;

  const profileDefaultImg = '/assets/profile_default.svg';

  const [editNickname] = useEditUserNicknameMutation();
  const [editProfile] = useEditUserImageMutation();
  const [deleteProfile] = useDeleteUserImageMutation();

  const [nicknameData, setNicknameData] = useState(nickname);
  const [profileToggle, setProfileToggle] = useState(false);
  const [profileImg, setProfileImg] = useState(
    userImage.image === '' ? profileDefaultImg : userImage.image,
  );

  const onChangeNickname = (text: string) => {
    setNicknameData(text);
  };

  const onSubmitNickname = async (): Promise<boolean | null> => {
    if (nicknameData.length === 0) return null;
    try {
      await editNickname({ nickname: nicknameData }).unwrap();
      return true;
    } catch (e) {
      return false;
    }
  };

  const onProfileToggle = () => {
    setProfileToggle(!profileToggle);
  };

  const onSubmitProfile = async (image: Blob) => {
    const imageFile: File = new File([image], 'profile.png', {
      lastModified: new Date().getTime(),
      type: 'image/png',
    });
    await editProfile(imageFile);
  };

  const onEditProfile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      if (reader.result instanceof ArrayBuffer || !reader.result) {
        setProfileImg(userImage.image);
      } else {
        const canvas: HTMLCanvasElement = await cropImage(reader.result, 1);
        const croppedImage = canvas.toDataURL('image/png');
        const croppedFile = dataURItoBlob(croppedImage);
        setProfileImg(croppedImage);
        onSubmitProfile(croppedFile);
      }
    };
    onProfileToggle();
  };

  const onDeleteProfile = async () => {
    await deleteProfile();
    setProfileImg(profileDefaultImg);
    onProfileToggle();
  };

  return (
    <StyledRoot>
      <div>
        <h2>{name}님의 정보</h2>
        <div className="outer-wrap">
          <div className="inner-wrap__left">
            <StyledImage>
              <Image src={profileImg} layout="fill" alt="profile" />
            </StyledImage>
            <button className="button__profile" onClick={onProfileToggle}>
              프로필 사진 설정
            </button>
            {profileToggle && (
              <StyledProfileToggle>
                <li>
                  <button>새로운 프로필 사진 등록</button>
                  <StyledInput type="file" accept="image/*" multiple onChange={onEditProfile} />
                </li>
                <li>
                  <button onClick={onDeleteProfile}>현재 사진 삭제</button>
                </li>
              </StyledProfileToggle>
            )}
          </div>
          <div className="inner-wrap__right">
            <UserInfoInput label="이름" initialValue={name} />
            <UserInfoInput
              label="닉네임"
              initialValue={nicknameData}
              canEdit
              editOptions={{
                editText: '닉네임 수정',
                confirmText: '수정 완료',
                failText: '이미 사용 중인 닉네임입니다',
                onChange: onChangeNickname,
                onConfirm: onSubmitNickname,
              }}
            />
            <UserInfoInput label="ID (이메일)" initialValue={email} />
          </div>
        </div>
      </div>
    </StyledRoot>
  );
}

const StyledRoot = styled.section`
  width: 66.4rem;
  height: 31.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 2px solid ${theme.colors.grayBg};
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
      width: 11rem;
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
  ${applyMediaQuery('mobile')} {
    width: 31.2rem;
    height: 22rem;
    border-bottom: 1px solid ${theme.colors.grayBg};
    h2 {
      font-size: 1.8rem;
      line-height: 3rem;
      margin-bottom: 3.1rem;
    }
    .inner-wrap__left {
      margin-right: 1.6rem;
      width: 6.6rem;
    }
    .button__profile {
      width: 6.7rem;
      padding: 0;
      font-size: 1rem;
      line-height: 1.2rem;
      margin-top: 1rem;
      transform: scale(0.8);
      transform-origin: top center;
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
  ${applyMediaQuery('mobile')} {
    width: 6.6rem;
    height: 6.6rem;
  }
`;
const StyledProfileToggle = styled.ul`
  width: 13.9rem;
  height: 5.8rem;
  border-radius: 0.5rem;
  box-shadow: 0 3px 8px 0 rgba(87, 82, 76, 0.15);
  margin-top: 0.8rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  animation: fadeIn 0.8s;
  li button {
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0;
  }
  li:first-child button {
    color: ${theme.colors.purpleText};
  }
  li:last-child button {
    color: ${theme.colors.gray1};
  }
  ${applyMediaQuery('mobile')} {
    width: 8.4rem;
    height: 4rem;
    border-radius: 0.4rem;
    margin-top: 0.5rem;
    padding: 0.8rem;
    li {
      height: 1.2rem;
      width: 7rem;
    }
    li > button {
      height: 1.2rem;
      width: 9.5rem;
      font-size: 1rem;
      transform: scale(0.7);
      transform-origin: top left;
    }
  }
  @keyframes fadeIn {
    from {
      transform: translateY(-10%);
      opacity: 0.5;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
const StyledInput = styled.input`
  width: 11.9rem;
  height: 1.45rem;
  margin-top: -1.45rem;
  display: block;
  opacity: 0;
  &:hover {
    cursor: pointer;
  }
  ${applyMediaQuery('mobile')} {
    width: 7rem;
    height: 1.2rem;
    margin-top: -1.5rem;
  }
`;

export default UserInfoWrap;
