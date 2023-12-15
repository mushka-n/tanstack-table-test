import { ColumnDef } from '@tanstack/react-table';
import { AccessorKeys } from './index.constants';
import { AnyDataTypeKey } from './index.types';
import { useGetTableSizes } from './useTableSizing';

import Columns from './Columns';
import { DSFile } from '../../types/DSItems/DSFile';
import { DSUser } from '../../types/DSUsers/DSUser';

export const useColumnDef = (
  tableId: string,
  itemTypeName: AnyDataTypeKey = 'file'
): ColumnDef<DSFile, never>[] | ColumnDef<DSUser, never>[] => {
  const columnSizes = useGetTableSizes(tableId);

  if (itemTypeName === 'file') return getFileColumnDef(columnSizes);
  return getUserColumnDef(columnSizes);
};

const getFileColumnDef = (
  columnSizes: Record<string, number> | null
): ColumnDef<DSFile, never>[] => {
  return [
    Columns.NameItemColumn(columnSizes?.[AccessorKeys.NameItem]),
    Columns.AuthorColumn(columnSizes?.[AccessorKeys.AuthorItem]),
    Columns.CreatedDateColumn(columnSizes?.[AccessorKeys.DateCreated]),
    Columns.DateUpdatedColumn(columnSizes?.[AccessorKeys.DateUpdated]),
    Columns.SizeColumn(columnSizes?.[AccessorKeys.SizeItem]),
    Columns.FileTypeColumn(columnSizes?.[AccessorKeys.TypeFile]),
  ];
};

const getUserColumnDef = (
  columnSizes: Record<string, number> | null
): ColumnDef<DSUser, never>[] => {
  return [
    Columns.NameUserColumn(columnSizes?.[AccessorKeys.NameUser]),
    Columns.TypeUserColumn(columnSizes?.[AccessorKeys.TypeUser]),
    Columns.EmailColumn(columnSizes?.[AccessorKeys.Email]),
  ];
};
