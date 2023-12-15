import { Table, flexRender } from '@tanstack/react-table';
import { AnyDataType } from '../index.types';
import { useSaveTableSizes } from '../useTableSizing';

interface TableHeaderProps {
  tableId: string;
  table: Table<AnyDataType>;
}

const TableHeader = ({ tableId, table }: TableHeaderProps) => {
  const [headerGroup] = table.getHeaderGroups();

  useSaveTableSizes(tableId, headerGroup);

  return (
    <thead>
      <tr>
        {headerGroup.headers.map((header, headerIndex) => (
          <th
            key={header.id}
            colSpan={header.colSpan}
            style={{ width: header.getSize(), position: 'relative' }}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}

            {headerIndex !== headerGroup.headers.length - 1 && (
              <div
                onMouseDown={header.getResizeHandler()}
                onTouchStart={header.getResizeHandler()}
                className={`resizer ${
                  header.column.getIsResizing() && 'isResizing'
                }`}
                style={{
                  position: 'absolute',
                  right: '0',
                  top: '0',
                  height: '100%',
                  width: '3px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  cursor: 'col-resize',
                  userSelect: 'none',
                  touchAction: 'none',
                }}
              />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
