import { ColumnDef } from '@tanstack/react-table';
import { AnyDataTypeKey, DataTypeByKey } from '@/components/Table/types';
import Rows from '@/components/Table/views/Row/Rows';

type useRowDefResult<DTK extends AnyDataTypeKey> = ColumnDef<
  DataTypeByKey<DTK>,
  never
>[];

export const useRowDef = <DTK extends AnyDataTypeKey>(
  dataTypeKey: DTK
): useRowDefResult<DTK> | null => {
  switch (dataTypeKey) {
    case 'file':
      return [Rows.FileRow()] as unknown as useRowDefResult<DTK>;
    case 'user':
      return [Rows.UserRow()] as unknown as useRowDefResult<DTK>;
    default:
      return null;
  }
};
