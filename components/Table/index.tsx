import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

import { useColumnDef } from './useColumnDef';
import { AnyDataType, AnyDataTypeKey } from './index.types';
import { useTableVisibility } from './useColumnVisibility';
import Header from './Header';
import Body from './Body';

interface TableProps {
  id: string;
  data: AnyDataType[];
  dataTypeKey: AnyDataTypeKey;
}

const Table = ({ id, dataTypeKey, data }: TableProps) => {
  const [columnVisibility, setColumnVisibility] = useTableVisibility(
    id,
    dataTypeKey
  );

  const table = useReactTable({
    data,
    // @ts-expect-error: -
    // ColumnDef generic can't understand the difference between AnyDataType and (DSFile | DSUser | ...) ,
    // but table data can only be provided as a single type
    columns: useColumnDef(id, dataTypeKey),
    getCoreRowModel: getCoreRowModel(),
    state: { columnVisibility },
    columnResizeMode: 'onChange',
    onColumnVisibilityChange: setColumnVisibility,
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
        style={{
          padding: '8px',
          width: '100%',
          backgroundColor: '#efefeffa',
          height: 'max-content  ',
        }}
      >
        <Header tableId={id} table={table} />
        <Body table={table} />
      </table>
    </>
  );
};

export default Table;
