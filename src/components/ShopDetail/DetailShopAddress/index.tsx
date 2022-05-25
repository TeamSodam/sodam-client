import RoadToggleIC from 'public/assets/ic_address_land.svg';
import LandToggleIC from 'public/assets/ic_address_road.svg';
import CopyIC from 'public/assets/ic_copy.svg';
import LandAddressIC from 'public/assets/ic_land_address.svg';
import RoadAddressIC from 'public/assets/ic_road_address.svg';
import { useState } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { Shop } from 'types/shop';

const ROAD = 'ROAD';
const LAND = 'LAND';
interface AddressToggleMap {
  [key: string]: {
    addressState: React.FC<React.SVGProps<SVGSVGElement>>;
    toggleAddress: React.FC<React.SVGProps<SVGSVGElement>>;
  };
}

const ADDRESS_ICON_MAP: AddressToggleMap = {
  [ROAD]: {
    addressState: RoadAddressIC,
    toggleAddress: RoadToggleIC,
  },
  [LAND]: {
    addressState: LandAddressIC,
    toggleAddress: LandToggleIC,
  },
};

type AddressProps = Pick<Shop, 'roadAddress' | 'landAddress'>;

function DetailShopAddress({ roadAddress, landAddress }: AddressProps) {
  const [currentAddress, setCurrentAddress] = useState(roadAddress);
  const [currentAddressType, setCurrentAddressType] = useState(ROAD);
  const getAddressState = () => {
    const AddressType = ADDRESS_ICON_MAP[currentAddressType].addressState;
    return <AddressType />;
  };

  const getAddressStateToggler = () => {
    const AddressToggler = ADDRESS_ICON_MAP[currentAddressType].toggleAddress;
    return <AddressToggler />;
  };

  const toggleAddressType = () => {
    setCurrentAddress(currentAddressType === ROAD ? landAddress : roadAddress);
    setCurrentAddressType((prevAddressType) => (prevAddressType === ROAD ? LAND : ROAD));
  };

  const copyAddressToClipboard = async () => await navigator.clipboard.writeText(currentAddress);

  return (
    <Container>
      {getAddressState()}
      <Address>{currentAddress}</Address>
      <ToggleBtn onClick={toggleAddressType}>{getAddressStateToggler()}</ToggleBtn>
      <CopyBtn onClick={copyAddressToClipboard}>
        <CopyIC />
      </CopyBtn>
    </Container>
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

  ${applyMediaQuery('desktop')} {
    & svg {
      transform: scale(0.75) translateX(12.5%);
    }
    height: 4.5rem;
    gap: 1rem;
  }
`;

const Address = styled.span`
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.black1};

  ${applyMediaQuery('desktop')} {
    font-size: 1.4rem;
    line-height: 2rem;
  }
`;

const ToggleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
  border: none;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
`;

const CopyBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: fit-content;
  background-color: transparent;
  border: none;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;
export default DetailShopAddress;
