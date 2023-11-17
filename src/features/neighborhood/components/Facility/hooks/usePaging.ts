import { useState } from 'react';

const usePaging = ({ dataLength }: { dataLength: number }) => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  const handleNext = () => {
    setVisibleIndex(prev => Math.min(prev + 2, dataLength - 1));
  };

  const handlePrev = () => {
    setVisibleIndex(prev => Math.max(prev - 2, 0));
  };

  return {
    visibleIndex,
    handleNext,
    handlePrev,
    setVisibleIndex,
  };
};

export default usePaging;
