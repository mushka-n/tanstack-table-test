import { ColumnDef } from '@tanstack/react-table';
import { AnyDataTypeKey } from './index.types';

import Columns from './Columns';
import { DSFile } from '../../types/DSItems/DSFile';
import { DSUser } from '../../types/DSUsers/DSUser';

export const useColumnDef = (
  dataTypeKey: AnyDataTypeKey
): ColumnDef<DSFile, never>[] | ColumnDef<DSUser, never>[] => {
  switch (dataTypeKey) {
    case 'file':
      return getFileColumnDef();
    case 'user':
      return getUserColumnDef();
  }
};

const getFileColumnDef = (): ColumnDef<DSFile, never>[] => {
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

const getUserColumnDef = (): ColumnDef<DSUser, never>[] => {
  return [
    Columns.NameUserColumn(),
    Columns.TypeUserColumn(),
    Columns.EmailColumn(),
    Columns.ContextBtnColumn(),
  ];
};
