import { Row } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { RefObject } from 'react';
import { AnyDataType } from '../types/dataType';

const ROW_HEIGHT = 48;
const OVERSCAN = 5;

export const useTableVirtualization = (
  rows: Row<AnyDataType>[],
  containerRef: RefObject<HTMLDivElement>
) => {
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: OVERSCAN,
  });

  const vRows = virtualizer.getVirtualItems();

  let offsetTop = 0;
  let offsetBottom = 0;
  if (vRows.length) {
    offsetTop = vRows[0].start || 0;
    offsetBottom =
      rows.length * ROW_HEIGHT - (vRows[vRows.length - 1].end || 0);
  }

  return { vRows, offsetTop, offsetBottom };
};
