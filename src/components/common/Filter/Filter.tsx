import { DeviceType } from '@/types/types';
import styled from '@emotion/styled';
import React, { FunctionComponent, ReactNode, Children, Fragment, useState, useEffect } from 'react';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';

export type FilterItemProps = {
  filterName?: string;
  onClick?: () => void;
  deviceType?: DeviceType;
};

interface Props {
  queryKey: string;
  filterNames: string[];
  filterItem: FunctionComponent<FilterItemProps>;
  onClick?: (name: string) => void;
  deviceType?: DeviceType;
}

const Filter = (props: Props) => {
  const [filterName, setFilterName] = useQueryParam(props.queryKey, StringParam);

  const handleClickButton = (name: string) => {
    // 현재 선택된 필터와 클릭된 필터가 같은 경우, URL에서 해당 type 제거
    if (filterName === name) {
      setFilterName(undefined);
    } else {
      // 다른 필터가 클릭된 경우, URL에 해당 type 추가
      setFilterName(name);
    }
  };

  return (
    <Wrapper className="filter-container">
      {props.filterNames?.map((name, index) => {
        return <props.filterItem deviceType={props.deviceType} key={index} filterName={props.filterNames[index]} onClick={() => handleClickButton(name)} />;
      })}
    </Wrapper>
  );
};

export default Filter;

Filter.defaultProps = {
  queryKey: 'test',
  filterNames: ['apple', 'pear', 'strawberry', 'lemon'],
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
