import { ColumnSizingState, Header } from '@tanstack/react-table';
import { TABLE_MIN_SIZE_PCT } from '@/components/Table/constants';
import styles from './header.module.css';
import ColumnHeader from './ColumnHeader';
import { useMemo } from 'react';

interface TableHeaderProps {
  contentWidth: number;
  headers: Header<unknown, unknown>[];
  sizing: ColumnSizingState;
}

const TableHeader = ({ headers, sizing, contentWidth }: TableHeaderProps) => {
  const totalFlexWidth = useMemo(() => {
    const totalFixedWidth = headers
      .filter((h) => !!h.column.columnDef.meta?.fixedWidthPx)
      .reduce((acc, h) => acc + h.column.columnDef.meta!.fixedWidthPx!, 0);
    return contentWidth - totalFixedWidth;
  }, [contentWidth, headers]);

  return (
    <thead className={styles.tableHeader}>
      <tr>
        {headers.map((header, index) => {
          const columnWidth =
            header.column.columnDef.meta?.fixedWidthPx ||
            (sizing[header.id] * totalFlexWidth) / 100;

          const columnMinWidth =
            header.column.columnDef.meta?.fixedWidthPx ||
            totalFlexWidth / TABLE_MIN_SIZE_PCT;

          const isLast = index === headers.length - 1;
          const isResizable =
            !isLast && !headers[index + 1].column.columnDef.meta?.fixedWidthPx;

          return (
            <ColumnHeader
              key={header.id}
              header={header}
              width={columnWidth}
              minWidth={columnMinWidth}
              isResizable={isResizable}
            />
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
