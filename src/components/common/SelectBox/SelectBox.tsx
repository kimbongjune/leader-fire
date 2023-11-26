import ArrowDown from '../../../../public/images/icons/arrow-drop-down.svg';
import Select, { ActionMeta, DropdownIndicatorProps, IndicatorsContainerProps, MultiValue, SingleValue, ValueContainerProps, components } from 'react-select';
import styled from '@emotion/styled';

interface Props {
  width?: number;
  height?: number;
  padding?: string;
  options: { label: string; value: string }[];
  defaultValue?: { value: string; label: string };
  onChange: (value: { value: string; label: string } | null) => void;
}

const SelectBox = (props: Props) => {

  const handleChange = (newValue: MultiValue<{
    value: string;
    label: string;
  }> | SingleValue<{
      value: string;
      label: string;
  }>, actionMeta: ActionMeta<{
      value: string;
      label: string;
  }>) => {
    if (newValue) {
      props.onChange(newValue as SingleValue<{ value: string; label: string }>);
    }
  };

  const DropdownIndicator = (props: DropdownIndicatorProps<any>) => {
    return (
      <components.DropdownIndicator {...props}>
        <ArrowDown width="20px" height="20px" color="#343A40" />
      </components.DropdownIndicator>
    );
  };

  return (
    <SelectWrapper padding={props.padding} width={props.width} height={props.height}>
      <Select classNamePrefix="react-select" value={props.defaultValue} defaultValue={props.defaultValue} options={props.options} components={{ DropdownIndicator }} onChange={handleChange} />
    </SelectWrapper>
  );
};

export default SelectBox;

SelectBox.defaultProps = {
  defaultValue: { value: '', label: '' },
  options: [
    { value: '2023년 9월 10일', label: '2023년 9월 10일' },
    { value: '2023년 9월 11일', label: '2023년 9월 11일' },
    { value: '2023년 9월 12일', label: '2023년 9월 12일' },
  ],
};

const SelectWrapper = styled.div<any>`
  flex: 1;
  div[data-value] {
    display: none;
  }

  .react-select__control {
    border: 1px solid #e9ecef;
    border-radius: 4px;
    width: ${({ width }) => (width ? `${width}px` : '100%')};
    height: ${({ height }) => height}px;
    min-height: ${({ height }) => height}px;
    box-shadow: none;
    outline: none;
  }

  .react-select__indicators {
    padding: 0;
  }

  .react-select__indicator-separator {
    display: none;
  }

  .react-select__value-container {
    padding: 0;
    width: fit-content;

    .react-select__single-value {
      padding: 0;
      padding: ${({ padding }) => padding};
      padding-right: 0;
      margin-left: 0;
      margin-right: 0;
      overflow: visible;
      font-family: Pretendard SemiBold;
      font-size: 14px;
    }
  }

  .react-select__indicator {
    padding: ${({ padding }) => padding};
    padding-left: 0;
  }
`;
