import React, { useState } from 'react';
import styled from 'styled-components';
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
  onChange: (text: string) => void;
  onConfirm: () => void;
}

function UserInfoInput(props: Props) {
  const { label, initialValue, canEdit = false, editOptions } = props;
  const { editText, confirmText } = editOptions || {};

  const [editMode, setEditMode] = useState(false);

  return (
    <StyledRoot>
      <label>{label}</label>
      <input type="text" value={initialValue} readOnly={!canEdit} />
      {editOptions && (
        <button
          onClick={() => {
            editMode ? setEditMode(false) : setEditMode(true);
          }}
        >
          {editMode ? confirmText : editText}
        </button>
      )}
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  margin-bottom: 2.8rem;
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
    &:focus {
      outline: none;
    }
  }
`;

export default UserInfoInput;
