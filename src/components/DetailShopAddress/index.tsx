import RoadToggleIC from 'public/assets/ic_address_land.svg';
import LandToggleIC from 'public/assets/ic_address_road.svg';
import CopyIC from 'public/assets/ic_copy.svg';
import LandAddressIC from 'public/assets/ic_land_address.svg';
import RoadAddressIC from 'public/assets/ic_road_address.svg';
import { useState } from 'react';
import styled from 'styled-components';

interface AddressToggleMap {
  [key: string]: React.FC<React.SVGProps<SVGSVGElement>>;
}

const ADDRESS_STATE_MAP: AddressToggleMap = {
  ROAD: RoadAddressIC,
  LAND: LandAddressIC,
};

const ROAD = 'ROAD';
const LAND = 'LAND';

function DetailShopAddress() {
  const [currentAddressType, setCurrentAddressType] = useState(ROAD);
  const getAddressState = () => {
    const AddressType = ADDRESS_STATE_MAP[currentAddressType];
    return <AddressType />;
  };

  return (
    <Container>
      {getAddressState()}
      <Address>상세주소 최대 길이 상세주소 최대 길이 상세주소 최대 길이 상세주소 최대 길이</Address>
      <RoadToggleIC />
      <CopyIC />
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
`;

const Address = styled.span`
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.black1};
`;

export default DetailShopAddress;
