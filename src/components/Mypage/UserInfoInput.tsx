import React, { useState } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';

interface Props {
  label: string;
  initialValue: string;
  canEdit?: boolean;
  editOptions?: EditOptions;
}
interface EditOptions {
  editText: string;
  confirmText: string;
  failText: string;
  onChange: (text: string) => void;
  onConfirm: () => Promise<boolean | null>;
}
interface StyledProps {
  isEmail: boolean;
}

function UserInfoInput(props: Props) {
  const { label, initialValue, canEdit = false, editOptions } = props;
  const { editText, confirmText, failText, onChange, onConfirm } = editOptions || {};

  const [editMode, setEditMode] = useState(false);
  const [isFail, setIsFail] = useState(false);

  const onClickHandler = async () => {
    if (editMode && onConfirm) {
      const result = await onConfirm();
      if (typeof result !== 'boolean') return;
      if (result) {
        setEditMode(false);
        setIsFail(false);
      } else {
        setIsFail(true);
      }
    } else {
      setEditMode(true);
    }
  };

  return (
    <StyledRoot isEmail={initialValue.includes('@')}>
      <div>
        <label>{label}</label>
        <input
          type="text"
          value={initialValue}
          onChange={(e) => onChange && onChange(e.target.value)}
          readOnly={canEdit ? !editMode : true}
          className={editMode ? 'outline' : 'default'}
          placeholder="변경할 닉네임을 입력해주세요"
        />
        {editOptions && (
          <button onClick={onClickHandler}>{editMode ? confirmText : editText}</button>
        )}
      </div>
      {isFail && <p>{failText}</p>}
    </StyledRoot>
  );
}

const StyledRoot = styled.div<StyledProps>`
  margin-bottom: 2.8rem;
  height: 2.8rem;
  div {
    height: inherit;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  label {
    display: inline-block;
    width: 7.2rem;
    color: ${theme.colors.purpleText};
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 2.2rem;
    margin-right: 2.5rem;
  }
  input {
    border: none;
    color: ${theme.colors.black2};
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 2.2rem;
    width: 23.5rem;
    height: 2.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:focus {
      outline: none;
    }
  }
  .outline {
    border: 1px solid ${theme.colors.purpleText};
    border-radius: 0.5rem;
    font-size: 1rem;
    padding: 0.7rem 0.8rem;
    color: ${theme.colors.black1};
  }
  button {
    width: 7.1rem;
    height: 2.2rem;
    border-radius: 0.5rem;
    color: white;
    background-color: ${theme.colors.purpleMain} !important;
    font-size: 1rem;
    font-weight: 500;
    line-height: 2.2rem;
    margin-left: 1.5rem;
  }
  p {
    transform: translateX(9.9rem);
    margin-top: 0.4rem;
    color: ${theme.colors.purpleText};
  }
  ${applyMediaQuery('tablet')} {
    margin-bottom: 2.4rem;
    height: 2.4rem;
    label {
      width: 6.3rem;
      font-size: 1.3rem;
    }
    input {
      font-size: 1.3rem;
      width: 18rem;
    }
    p {
      transform: translateX(9.3rem);
    }
  }
  ${applyMediaQuery('mobile')} {
    margin-bottom: 1.6rem;
    height: 1.4rem;
    label {
      width: 4.8rem;
      font-size: 1rem;
      line-height: 1.4rem;
      margin-right: 1.3rem;
    }
    input {
      font-size: 1rem;
      line-height: 1.1rem;
      width: ${({ isEmail }) => (isEmail ? 16 : 10.3)}rem;
      &::placeholder {
        overflow: visible;
        transform: scale(0.7);
        transform-origin: left;
      }
    }
    .outline {
      border-radius: 0.3rem;
      font-size: 1rem;
      padding: 0.6rem;
    }
    button {
      font-family: 'Noto Sans KR', sans-serif;
      width: 6rem;
      height: 1.8rem;
      border-radius: 0.3rem;
      font-size: 1rem;
      line-height: 1.4rem;
      margin-left: 0.5rem;
      white-space: nowrap;
    }
    p {
      font-size: 1rem;
      transform: translateX(2rem) scale(0.6);
      margin-top: 0.1rem;
    }
  }
`;

export default UserInfoInput;
