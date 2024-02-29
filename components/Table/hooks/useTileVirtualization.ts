import { Row } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { RefObject } from 'react';

const ROW_HEIGHT = 196;
const OVERSCAN = 1;

export const useTileVirtualization = (
  containerRef: RefObject<HTMLDivElement>,
  rows: Row<unknown>[],
  colsNum: number
) => {
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: OVERSCAN * colsNum,
    lanes: colsNum,
  });

  const vRows = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();
  const measure = virtualizer.measure;

  const scrollToIndex = virtualizer.scrollToIndex;

  return { vRows, totalSize, measure, scrollToIndex };
};
