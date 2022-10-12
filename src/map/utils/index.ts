/* eslint-disable no-dupe-class-members */
import { latlngList } from 'map/data/latlng';
import { RefObject } from 'react';
import { KakaoLatLng, KakaoMap, KakaoMarker, StatusText, xy } from 'types/map';

const INITIAL_CENTER = [33.450701, 126.570667];

interface ICreateMapOptions {
  center: KakaoLatLng;
  level: number;
}

type XY = [number, number];
type MarkerImage = Record<string, unknown>;

interface ICreateMarkerOptions {
  markerPosition: KakaoLatLng | null;
  imageXY: XY;
  offsetXY: XY;
  shopName: string;
}

interface ICreateMarkerWithImage {
  markerPosition: KakaoLatLng | null;
  image: MarkerImage;
  shopName: string;
}

class KakaoUtils {
  private MARKER_SRC = '/assets/ic_basic_marker.svg';
  private ACTIVE_MARKER_SRC = '/assets/ic_active_marker.svg';
  kakaoInstance: KakaoMap = undefined;
  constructor(private globalKakao: KakaoMap, containerRef: RefObject<HTMLElement>) {
    this.createMap(containerRef, {
      center: this.createLatLng(INITIAL_CENTER[0], INITIAL_CENTER[1]),
      level: 4,
    });
  }

  triggerEvent(marker: KakaoMarker, eventType: 'click') {
    this.globalKakao.maps.event.trigger(marker, eventType);
  }

  addListener(marker: KakaoMarker, eventType: 'click', callbackFn: () => void) {
    this.globalKakao.maps.event.addListener(marker, eventType, callbackFn);
  }

  createMap<T>(containerRef: RefObject<T>, options?: ICreateMapOptions) {
    const mapInstance = new this.globalKakao.maps.Map(containerRef.current, options);

    this.kakaoInstance = mapInstance;
  }

  isMapExist() {
    return this.kakaoInstance !== undefined;
  }

  createMarkerImageSize(imageXY: XY) {
    const [x, y] = imageXY;
    return new this.globalKakao.maps.Size(x, y);
  }

  createMarkerImageOption(offsetXY: XY) {
    const [x, y] = offsetXY;
    return { offset: new this.globalKakao.maps.Point(x, y) };
  }

  createMarkerImage(imageXY: XY, offsetXY: XY, isActive?: boolean) {
    const imageSize = this.createMarkerImageSize(imageXY);
    const imageOption = this.createMarkerImageOption(offsetXY);

    const markerSrc = isActive ? this.ACTIVE_MARKER_SRC : this.MARKER_SRC;

    return new this.globalKakao.maps.MarkerImage(markerSrc, imageSize, imageOption);
  }

  createMarker(markerInfo: ICreateMarkerOptions): KakaoMarker;
  createMarker(markerInfo: ICreateMarkerWithImage): KakaoMarker;
  createMarker(markerInfo: ICreateMarkerOptions | ICreateMarkerWithImage): KakaoMarker {
    const { markerPosition, shopName } = markerInfo;

    const image =
      'image' in markerInfo
        ? markerInfo.image
        : this.createMarkerImage(markerInfo.imageXY, markerInfo.offsetXY);

    return new this.globalKakao.maps.Marker({
      position: markerPosition,
      image,
      clickable: true,
      title: shopName,
    });
  }

  createCustomOverlay(marker: KakaoMarker) {
    return new this.globalKakao.maps.CustomOverlay({
      map: this.kakaoInstance,
      position: marker.getPosition(),
    });
  }

  setMapLevel(level: number) {
    this.kakaoInstance?.setLevel(level);
  }

  createLatLng(lat: number, lng: number): KakaoLatLng {
    return new this.globalKakao.maps.LatLng(lat, lng);
  }

  async getLocationByAddress({
    address,
    shopName,
  }: {
    address: string;
    shopName?: string;
  }): Promise<KakaoLatLng | null> {
    const geocoder = new this.globalKakao.maps.services.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.addressSearch(address, (result: xy[], status: StatusText) => {
        if (status === this.globalKakao.maps.services.Status.OK) {
          resolve(this.createLatLng(result[0].y, result[0].x));
        } else {
          if (shopName && shopName in latlngList) {
            resolve(this.createLatLng(latlngList[shopName].y, latlngList[shopName].x));
          } else reject(Error(`${address} 에 대한 검색에 실패했어요.`));
        }
      });
    });
  }

  setCenter(coords: KakaoLatLng) {
    this.kakaoInstance?.setCenter(coords);
  }

  panBy(panXY: XY) {
    const [x, y] = panXY;
    this.kakaoInstance.panBy(x, y);
  }
}

export default KakaoUtils;
