import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

import { useColumnDef } from './useColumnDef';
import { AnyDataType, AnyDataTypeKey } from './index.types';

import Header from './Header';
import Body from './Body';

interface TableProps {
  id: string;
  data: AnyDataType[];
  itemTypeName: AnyDataTypeKey;
}

const Table = ({ id, itemTypeName, data }: TableProps) => {
  const table = useReactTable({
    data,
    // @ts-expect-error: -
    // ColumnDef generic can't understand the difference between AnyDataType and (DSFile | DSUser | ...) ,
    // but table data should can be provided as a single type
    columns: useColumnDef(id, itemTypeName),
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
  });

  return (
    <table id={id} style={{ width: '100%', backgroundColor: '#efefeffa' }}>
      <Header tableId={id} table={table} />
      <Body table={table} />
    </table>
  );
};

export default Table;
