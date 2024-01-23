import { ColumnDef } from '@tanstack/react-table';
import { AnyDataTypeKey, DataTypeByKey } from '@/components/Table/types';

import Columns from '@/components/Table/views/Table/Body/Columns';
import Rows from '@/components/Table/views/Row/Rows';
import Tiles from '@/components/Table/views/Tile/Tiles';

type ContentDef<DTK extends AnyDataTypeKey> = ColumnDef<
  DataTypeByKey<DTK>,
  unknown
>[];

export const useContentDef = <DTK extends AnyDataTypeKey>(
  dataTypeKey: DTK,
  view: 'row' | 'table' | 'tile'
): ContentDef<DTK> => {
  switch (view) {
    case 'table':
      return tableDef(dataTypeKey);
    case 'row':
      return rowDef(dataTypeKey);
    case 'tile':
      return tileDef(dataTypeKey);
  }
};

export const tableDef = <DTK extends AnyDataTypeKey>(dataTypeKey: DTK) => {
  switch (dataTypeKey) {
    case 'file':
      return [
        Columns.NameItemColumn(),
        Columns.AuthorColumn(),
        Columns.CreatedDateColumn(),
        Columns.DateUpdatedColumn(),
        Columns.SizeColumn(),
        Columns.FileTypeColumn(),
        Columns.ContextBtnColumn(),
      ] as ContentDef<DTK>;
    case 'user':
      return [
        Columns.NameUserColumn(),
        Columns.TypeUserColumn(),
        Columns.EmailColumn(),
        Columns.ContextBtnColumn(),
      ] as ContentDef<DTK>;
    default:
      throw new Error('Unexpected object: ' + dataTypeKey);
  }
};

export const rowDef = <DTK extends AnyDataTypeKey>(dataTypeKey: DTK) => {
  switch (dataTypeKey) {
    case 'file':
      return [Rows.FileRow()] as ContentDef<DTK>;
    case 'user':
      return [Rows.UserRow()] as ContentDef<DTK>;
    default:
      throw new Error('Unexpected object: ' + dataTypeKey);
  }
};

export const tileDef = <DTK extends AnyDataTypeKey>(dataTypeKey: DTK) => {
  switch (dataTypeKey) {
    case 'file':
      return [Tiles.FileTile()] as ContentDef<DTK>;
    case 'user':
      return [Tiles.UserTile()] as ContentDef<DTK>;
    default:
      throw new Error('Unexpected object: ' + dataTypeKey);
  }
};
