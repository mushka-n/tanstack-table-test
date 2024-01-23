import { Row } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { RefObject } from 'react';

const ROW_HEIGHT = 48;
const OVERSCAN = 5;

export const useTableVirtualization = (
  rows: Row<unknown>[],
  containerRef: RefObject<HTMLDivElement>
) => {
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: OVERSCAN,
  });

  const vRows = virtualizer.getVirtualItems();

  const totalSize = virtualizer.getTotalSize();

  let offsetTop = 0;
  let offsetBottom = 0;
  if (vRows.length) {
    offsetTop = Math.max(0, vRows[0].start - virtualizer.options.scrollMargin);
    offsetBottom = Math.max(0, totalSize - vRows[vRows.length - 1].end);
  }

  return { vRows, totalSize, offsetTop, offsetBottom };
};
