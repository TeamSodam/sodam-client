import ActivePinIC from 'public/assets/ic_active_marker.svg';
import InActivePinIC from 'public/assets/ic_basic_marker.svg';
import StarIC from 'public/assets/ic_star.svg';
import EmptyStarIC from 'public/assets/ic_white_star.svg';
import styled, { css } from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

import { OptionLabel } from '.';

interface OptionInfo {
  icon: Array<React.FC<React.SVGProps<SVGSVGElement>>>;
  label: OptionLabel;
}

const optionList: OptionInfo[] = [
  {
    icon: [ActivePinIC, InActivePinIC],
    label: '인기 순',
  },
  {
    icon: [EmptyStarIC, StarIC],
    label: '내가 저장한',
  },
];

function OptionList({
  currentOption,
  toggleOption,
}: {
  currentOption: string;
  toggleOption: (option: OptionLabel) => void;
}) {
  return (
    <StyledOptionList>
      {optionList.map((option) => {
        const [ActiveIcon, InActiveIcon] = option.icon;
        const isActive = currentOption === option.label;
        const CurrentIcon = isActive ? ActiveIcon : InActiveIcon;
        return (
          <Option key={option.label} onClick={() => toggleOption(option.label)} isActive={isActive}>
            <CurrentIcon />
            <span>{option.label}</span>
          </Option>
        );
      })}
    </StyledOptionList>
  );
}

const StyledOptionList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: 0.1rem solid ${({ theme }) => theme.colors.gray2};

  ${applyMediaQuery('mobile')} {
    flex-direction: row;
    border-right: unset;
  }
`;

const Option = styled.li<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.72%;

  width: 100%;
  height: 9.2%;
  overflow: hidden;

  ${(props) =>
    props.isActive
      ? css`
          color: white;
          background-color: ${({ theme }) => theme.colors.purpleText};
          box-shadow: 0.05rem 0.05rem 0.05rem 0.05rem ${({ theme }) => theme.colors.purpleText};
        `
      : css`
          color: ${({ theme }) => theme.colors.purpleText};
          box-shadow: 0.05rem 0.05rem 0.05rem 0.05rem ${({ theme }) => theme.colors.gray2};
        `};

  &:hover {
    cursor: pointer;
  }

  ${applyMediaQuery('desktop')} {
    & > * {
      transform: scale(0.7);
    }
  }

  ${applyMediaQuery('mobile')} {
    width: 9rem;
    min-height: 2.4rem;
    max-height: 3.5rem;
    gap: unset;
    flex-direction: row;
    justify-content: center;
    padding: 10px 3px;
    box-shadow: unset;
    ${({ isActive, theme }) =>
      isActive
        ? css`
            border: 0.1rem solid ${theme.colors.purpleText};
          `
        : css`
            border: 0.1rem solid ${theme.colors.gray2};
          `};

    /* & > svg,
    & > svg * {
      transform: scale(0.65) translate(-5%, 10%);
    } */
    & > * {
      transform: scale(0.65);
    }

    & > span {
      transform: scale(0.85);
    }
  }
`;

export default OptionList;
