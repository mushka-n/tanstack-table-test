import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { useColumnDef } from './useColumnDef';
import { AnyDataType, AnyDataTypeKey } from './index.types';
import { useTableVisibility } from './useTableVisibility';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { useEffect, useRef } from 'react';
import { useTableSizing } from './useTableSizing';

interface TableProps {
  id: string;
  dataTypeKey: AnyDataTypeKey;
  data: AnyDataType[];
  dataTotalLength?: number;
  onBottomReached?: () => void;
}

const Table = ({
  id,
  dataTypeKey,
  data,
  dataTotalLength,
  onBottomReached,
}: TableProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const [sizing, setSizing, onSizingChange, sizingInfo, setSizingInfo] =
    useTableSizing(id, dataTypeKey);

  const [visibility, onVisibilityChange] = useTableVisibility(id, dataTypeKey);

  const table = useReactTable({
    data,
    // @ts-expect-error: -
    // ColumnDef generic can't understand the difference between AnyDataType and (DSFile | DSUser | ...),
    // but table data doesn't accept union types
    columns: useColumnDef(dataTypeKey),
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnSizing: sizing,
      columnSizingInfo: sizingInfo,
      columnVisibility: visibility,
    },
    columnResizeMode: 'onChange',
    onColumnVisibilityChange: (visibilityUpdater) =>
      onVisibilityChange(visibilityUpdater, sizing, setSizing),
    onColumnSizingChange: onSizingChange,
    onColumnSizingInfoChange: setSizingInfo,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    enableColumnPinning: true,
  });

  useEffect(() => {
    if (!containerRef?.current || !onBottomReached) return;

    const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
    const hasReachedBottom = scrollHeight - scrollTop - clientHeight < 300;

    if (hasReachedBottom) onBottomReached();
  }, [onBottomReached]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'row-reverse', height: '100%' }}
    >
      <div
        style={{
          minWidth: '120px',
          margin: '0 0 0 16px',
        }}
      >
        {table.getAllLeafColumns().map((column) => (
          <div key={column.id}>
            <label>
              <input
                type={'checkbox'}
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
              />
              {column.id}
            </label>
          </div>
        ))}
      </div>

      <div
        ref={containerRef}
        className='table-container'
        onScroll={onBottomReached}
      >
        <div>
          <table
            id={id}
            ref={tableRef}
            style={{
              tableLayout: 'fixed',
              position: 'relative',
              width: '100%',
              backgroundColor: '#efefeffa',
              height: '100%',
              borderCollapse: 'collapse',
            }}
            cellPadding={0}
            cellSpacing={0}
          >
            <TableHeader
              containerRef={containerRef}
              headers={table.getHeaderGroups()[0].headers}
              sizing={sizing}
            />

            <TableBody
              containerRef={containerRef}
              rows={table.getRowModel().rows}
              dataTotalLength={dataTotalLength}
            />
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
