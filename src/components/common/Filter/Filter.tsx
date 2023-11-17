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
  const [filterName, setFilterName] = useQueryParam(props.queryKey);

  const handleClickButton = async (name: string) => {
    if (props.onClick) {
      props.onClick(name);
      return;
    }
    setFilterName(name);
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
