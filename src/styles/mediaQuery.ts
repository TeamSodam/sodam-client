export type Device = 'mobile' | 'tablet' | 'desktop' | 'wide';
type DeviceQuery = {
  [key in Device]: string;
};

// 추후에 break-point 수정 필요
export const deviceQuery: DeviceQuery = {
  mobile: '(max-width: 703px)',
  tablet: '(min-width: 704px) and (max-width: 895px)',
  desktop: '(min-width: 896px)',
  wide: '(min-width: 1600px)',
};

export const applyMediaQuery = (device: Device): string =>
  `@media screen and ${deviceQuery[device]}`;
