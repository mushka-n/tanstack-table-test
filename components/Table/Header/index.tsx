import { ColumnSizingState, Table, flexRender } from '@tanstack/react-table';
import { AnyDataType } from '../index.types';
import { AccessorKeys } from '../index.constants';
import { useLayoutEffect, useState } from 'react';

interface TableHeaderProps {
  table: Table<AnyDataType>;
  sizing: ColumnSizingState;
  tableRef: React.RefObject<HTMLTableElement>;
}

const TableHeader = ({ tableRef, table, sizing }: TableHeaderProps) => {
  const [headerGroup] = table.getHeaderGroups();
  const [tableWidth, setTableWidth] = useState(0);

  useLayoutEffect(() => {
    const handleResize = () =>
      tableRef.current && setTableWidth(tableRef.current.offsetWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [tableRef]);

  return (
    <thead>
      <tr>
        {table.getHeaderGroups()[0].headers.map((header, headerIndex) => (
          <th
            key={header.id}
            colSpan={1}
            style={
              header.id !== AccessorKeys.ContextBtn
                ? {
                    position: 'relative',
                    width: `${(sizing[header.id] * (tableWidth - 16)) / 100}px`,
                    minWidth: '10%',
                  }
                : {
                    width: `min-content`,
                    minWidth: `16px`,
                    maxWidth: `16px`,
                  }
            }
          >
            <div
              style={
                header.id !== AccessorKeys.ContextBtn
                  ? {
                      width: '100%',
                      minWidth: `${(tableWidth - 16) / 10}px`,
                    }
                  : {
                      width: `16px`,
                      minWidth: `16px`,
                      maxWidth: `16px`,
                    }
              }
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </div>
            {headerIndex < headerGroup.headers.length - 2 && (
              <div
                onMouseDown={header.getResizeHandler()}
                onTouchStart={header.getResizeHandler()}
                style={{
                  position: 'absolute',
                  right: '0',
                  top: '0',
                  height: '100%',
                  boxSizing: 'border-box',
                  margin: '0 -10px 0 0',
                  width: '17px',
                  padding: '0 8px',
                  cursor: 'col-resize',
                  userSelect: 'none',
                  touchAction: 'none',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: '1px',
                    maxWidth: '1px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    userSelect: 'none',
                    touchAction: 'none',
                  }}
                />
              </div>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
