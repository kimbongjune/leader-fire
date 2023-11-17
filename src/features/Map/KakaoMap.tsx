import useDeviceType from '@/hooks/useDeviceType';
import theme from '@/theme/colors';
import { DeviceType } from '@/types/types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const KakaoMap = () => {
  const deviceType = useDeviceType();

  return (
    <MapContainer className="map_container" deviceType={deviceType}>
      <Map id="map" />
      {/* 지도타입 컨트롤 div 입니다 */}
      {/* <MapControlWrapper>
        <div className="custom_typecontrol radius_border">
        <span id="btnRoadmap" className="selected_btn">
        지도
        </span>
        <span id="btnSkyview" className="btn">
        스카이뷰
        </span>
        </div>
      </MapControlWrapper> */}
    </MapContainer>
  );
};

export default KakaoMap;

const MapContainer = styled.div<{ deviceType: DeviceType }>`
  width: 100%;
  // height: 100vh;
  flex: 1;
  position: relative;
  ${({ deviceType }) => {
    return (
      deviceType === 'tabletHorizontal' &&
      css`
        min-height: 588px;
        border-radius: 8px;
        overflow: hidden;
      `
    );
  }}

  .destinationMarker-wrapper {
    position: relative;
  }
  .destinationMarker-label {
    display: flex;
    position: absolute;
    width: fit-content;
    bottom: -45px;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 8px;
    gap: 4px;
    border-radius: 4px;
    border: 1px solid ${theme.colors.gray2};
    background-color: ${theme.colors.white};
    color: #e57878;
    font-family: 'Pretendard Bold';
    font-size: 12px;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.24px;
  }

  .delete-button {
    color: ${theme.colors.darkBlue};
  }
`;

const Map = styled.div`
  width: 100%;
  height: 100%;
`;

const MapControlWrapper = styled.div`
  position: absolute;
  top: 150px;
  left: 0;
  z-index: 99;
`;
