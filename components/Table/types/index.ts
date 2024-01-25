import { DSUser } from '@/types/DSUsers/DSUser';
import { DSFile } from '@/types/DSItems/DSFile';

import { ColumnDef } from '@tanstack/react-table';

// Type Maps

export type TableDataTypeMap = {
  file: DSFile;
  user: DSUser;
};

// Types

export type AnyDataTypeKey = keyof TableDataTypeMap;

export type AnyDataType = TableDataTypeMap[AnyDataTypeKey];

export type ContentView = 'row' | 'table' | 'tile';

export type ContentSettings<DTK extends AnyDataTypeKey> = {
  dataTypeKey: DTK;
  defaultView: ContentView;
  views: {
    table: {
      columns: ColumnDef<DataTypeByKey<DTK>, unknown>[];
    };
    row: ColumnDef<DataTypeByKey<DTK>, DataTypeByKey<DTK>>[];
    tile: ColumnDef<DataTypeByKey<DTK>, DataTypeByKey<DTK>>[];
  };
};

// Generics

export type DataTypeByKey<DTK extends AnyDataTypeKey> = TableDataTypeMap[DTK];
