import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

import { useColumnDef } from './useColumnDef';
import { AnyDataType, AnyDataTypeKey } from './index.types';
import { useTableVisibility } from './useTableVisibility';
import Header from './Header';
import Body from './Body';
import { Dispatch, SetStateAction, useRef } from 'react';
import { useTableSizing } from './useTableSizing';

interface TableProps {
  id: string;
  data: AnyDataType[];
  dataTypeKey: AnyDataTypeKey;
  selection: AnyDataType[];
  setSelection: Dispatch<SetStateAction<AnyDataType[]>>;
}

const Table = ({ id, dataTypeKey, data }: TableProps) => {
  const tableRef = useRef<HTMLTableElement>(null);

  const [sizing, onResize, setSizingInfo] = useTableSizing(id, dataTypeKey);
  const [visibility, setVisibility] = useTableVisibility(id, dataTypeKey);

  const table = useReactTable({
    data,
    // @ts-expect-error: -
    // ColumnDef generic can't understand the difference between AnyDataType and (DSFile | DSUser | ...) ,
    // but table data can only be provided as a single type
    columns: useColumnDef(id, dataTypeKey),
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnSizing: sizing,
      columnVisibility: visibility,
    },
    columnResizeMode: 'onChange',
    onColumnVisibilityChange: setVisibility,
    onColumnSizingChange: onResize,
    onColumnSizingInfoChange: setSizingInfo,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    enableColumnPinning: true,
  });

  return (
    <>
      <div style={{ width: 'max-content', margin: '0 0 24px auto' }}>
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

      <table
        id={id}
        ref={tableRef}
        style={{
          padding: '8px',
          width: '100%',
          backgroundColor: '#efefeffa',
          height: 'max-content  ',
        }}
      >
        <Header
          tableId={id}
          table={table}
          tableRef={tableRef}
          sizing={sizing}
        />
        <Body table={table} />
      </table>
    </>
  );
};

export default Table;
