import { ColumnDef } from '@tanstack/react-table';
import { AnyDataTypeKey, DataTypeByKey } from '@/components/Table/types';

import Columns from '@/components/Table/views/Table/Body/Columns';

type useTableColumnDefResult<DTK extends AnyDataTypeKey> = ColumnDef<
  DataTypeByKey<DTK>,
  never
>[];

export const useTableColumnDef = <DTK extends AnyDataTypeKey>(
  dataTypeKey: DTK
): useTableColumnDefResult<DTK> | null => {
  switch (dataTypeKey) {
    case 'file':
      return getFileColumnDef() as unknown as useTableColumnDefResult<DTK>;
    case 'user':
      return getUserColumnDef() as unknown as useTableColumnDefResult<DTK>;
    default:
      return null;
  }
};

const getFileColumnDef = (): useTableColumnDefResult<'file'> => {
  return [
    Columns.NameItemColumn(),
    Columns.AuthorColumn(),
    Columns.CreatedDateColumn(),
    Columns.DateUpdatedColumn(),
    Columns.SizeColumn(),
    Columns.FileTypeColumn(),
    Columns.ContextBtnColumn(),
  ];
};

const getUserColumnDef = (): useTableColumnDefResult<'user'> => {
  return [
    Columns.NameUserColumn(),
    Columns.TypeUserColumn(),
    Columns.EmailColumn(),
    Columns.ContextBtnColumn(),
  ];
};
