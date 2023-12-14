import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

import { useColumnDef } from './useColumnDef';
import { AnyItemType, AnyItemTypeName } from './types';

import Header from './Header';
import Body from './Body';

interface TableProps {
  id: string;
  data: AnyItemType[];
  itemTypeName: AnyItemTypeName;
}

const Table = ({ id, itemTypeName, data }: TableProps) => {
  const table = useReactTable({
    data,
    columns: useColumnDef(id, itemTypeName),
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
  });

  return (
    <table id={id} width={'100%'}>
      <Header tableId={id} table={table} />
      <Body table={table} />
    </table>
  );
};

export default Table;
