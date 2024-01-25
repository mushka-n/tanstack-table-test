import { ColumnSizingState, Header, flexRender } from '@tanstack/react-table';
import {
  CONTEXT_BTN_SIZE_PX,
  TABLE_MIN_SIZE,
} from '@/components/Table/constants/columnData';
import { AccessorKeys } from '@/components/Table/constants/accessorKeys';

interface TableHeaderProps {
  contentWidth: number;
  headers: Header<unknown, unknown>[];
  sizing: ColumnSizingState;
}

const TableHeader = ({ headers, sizing, contentWidth }: TableHeaderProps) => {
  return (
    <thead
      style={{
        position: 'sticky',
        zIndex: 100,
        top: 0,
        background: '#efefef',
      }}
    >
      <tr>
        {headers.map((header, headerIndex) => (
          <th
            key={header.id}
            colSpan={1}
            style={
              header.id !== AccessorKeys.ContextBtn
                ? {
                    position: 'relative',
                    height: '40px',
                    padding: 0,
                    width: `${
                      (sizing[header.id] *
                        (contentWidth - CONTEXT_BTN_SIZE_PX)) /
                      100
                    }px`,
                  }
                : {
                    height: '40px',
                    width: `${CONTEXT_BTN_SIZE_PX}px`,
                  }
            }
          >
            <div
              style={
                header.id !== AccessorKeys.ContextBtn
                  ? {
                      width: `${
                        (contentWidth - CONTEXT_BTN_SIZE_PX) / TABLE_MIN_SIZE
                      }px`,
                    }
                  : {
                      display: 'flex',
                      justifyContent: 'flex-end',
                      width: `${CONTEXT_BTN_SIZE_PX}px`,
                    }
              }
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </div>

            {headerIndex < headers.length - 2 && (
              <div
                onMouseDown={header.getResizeHandler()}
                onTouchStart={header.getResizeHandler()}
                style={{
                  position: 'absolute',
                  right: '0',
                  top: '0',
                  height: '100%',
                  boxSizing: 'border-box',
                  margin: '0 -8px 0 0',
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
