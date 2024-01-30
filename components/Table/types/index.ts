import { DSUser } from '@/types/DSUsers/DSUser';
import { DSFile } from '@/types/DSItems/DSFile';

// Type Maps

export type TableDataTypeMap = {
  file: DSFile;
  user: DSUser;
};

// Types

export type AnyDataTypeKey = keyof TableDataTypeMap;

export type AnyDataType = TableDataTypeMap[AnyDataTypeKey];

// Generics

export type DataTypeByKey<DTK extends AnyDataTypeKey> = TableDataTypeMap[DTK];
