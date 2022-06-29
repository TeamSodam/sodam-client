import useToast from 'hooks/useToast';
import { useEffect, useState } from 'react';
import { copyToClipboard } from 'src/utils/copyToClipboard';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { getBackgroundImageCss } from 'styles/mixin';
import { Shop } from 'types/shop';

const ROAD = '도로명';
const LAND = '지번';

interface StButtonprops {
  url: string;
}

const ADDRESS_ICON_MAP = {
  [ROAD]: '/assets/ic_road_address.svg',
  [LAND]: '/assets/ic_land_address.svg',
};

type AddressProps = Pick<Shop, 'roadAddress' | 'landAddress'>;

function DetailShopAddress({ roadAddress, landAddress }: AddressProps) {
  const { toast, fireToast } = useToast();
  const [currentAddress, setCurrentAddress] = useState(roadAddress);
  const [currentAddressType, setCurrentAddressType] = useState<keyof typeof ADDRESS_ICON_MAP>(LAND);

  const toggleAddressType = () => {
    setCurrentAddress(currentAddressType === ROAD ? landAddress : roadAddress);
    setCurrentAddressType((prevAddressType) => (prevAddressType === ROAD ? LAND : ROAD));
  };

  const copyAddressToClipboard = async () => {
    await copyToClipboard(
      currentAddress,
      () => {
        fireToast('주소를 복사했어요.');
      },
      () => {
        fireToast('주소 복사에 실패했어요.');
      },
    );
  };

  useEffect(() => {
    setCurrentAddress(roadAddress);
    setCurrentAddressType(ROAD);
  }, [roadAddress]);

  return (
    <>
      <Container>
        <AddressLabel url={ADDRESS_ICON_MAP[currentAddressType]} />
        <Address>{currentAddress}</Address>
        <ButtonWrapper>
          <ToggleButton
            onClick={toggleAddressType}
            url="/assets/ic_address_toggle.svg"
            id="address-toggle"
            type="button"
          />
          <label htmlFor="address-toggle">{currentAddressType === ROAD ? LAND : ROAD}</label>
        </ButtonWrapper>

        <ButtonWrapper>
          <CopyBtn
            onClick={copyAddressToClipboard}
            url="/assets/ic_copy.svg"
            id="address-copy"
            type="button"
          />
          <label htmlFor="address-copy">복사</label>
        </ButtonWrapper>
      </Container>
      {toast}
    </>
  );
}

const Container = styled.div`
  width: calc(100% - 4rem);
  height: 6.7rem;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 3px 8px rgba(87, 82, 76, 0.15);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;

  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);

  z-index: 2;

  ${applyMediaQuery('desktop', 'tablet')} {
    & svg {
      transform: scale(0.75) translateX(12.5%);
    }
    height: 4.5rem;
    gap: 1rem;
  }
  ${applyMediaQuery('mobile')} {
    height: 3rem;
    padding: 0 0.5rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  & > label {
    min-width: fit-content;
    font-size: 1.5rem;
    line-height: 2rem;
    color: ${({ theme }) => theme.colors.purpleText};
  }
  ${applyMediaQuery('mobile')} {
    gap: 0.2rem;

    & > label {
      transform: scale(0.6);
      font-size: 0.6rem;
      line-height: 1.5rem;
    }
  }
`;

const Address = styled.span`
  font-weight: 500;
  font-size: 2rem;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.black1};

  ${applyMediaQuery('desktop', 'tablet')} {
    font-size: 1.4rem;
    line-height: 2rem;
  }
  ${applyMediaQuery('mobile')} {
    word-break: keep-all;
    font-size: 0.6rem;
    line-height: 1.5rem;
    transform: scale(0.6);
    margin: 0 -3.5rem;
  }
`;

const BackgroundButton = styled.button<StButtonprops>`
  ${({ url }) => getBackgroundImageCss(url)};
  background-color: transparent;
  border: none;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;
const CopyBtn = styled(BackgroundButton)`
  width: 1.9rem;
  height: 1.9rem;
  ${applyMediaQuery('mobile')} {
    width: 1.2rem;
    min-width: 1.2rem;
    height: 1.2rem;
    margin-right: -0.5rem;
    margin-left: -1rem;
  }
`;

const ToggleButton = styled(BackgroundButton)`
  width: 1.9rem;
  height: 1.9rem;
  ${applyMediaQuery('mobile')} {
    width: 1.2rem;
    min-width: 1.2rem;
    height: 1.2rem;
    margin-right: -0.5rem;
  }
`;

const AddressLabel = styled.span<StButtonprops>`
  ${({ url }) => getBackgroundImageCss(url)};
  width: 6.3rem;
  height: 2.6rem;

  ${applyMediaQuery('mobile')} {
    min-width: 2.7rem;
    width: 2.7rem;
    height: 1.1rem;
    background-size: contain;
  }
`;

export default DetailShopAddress;
