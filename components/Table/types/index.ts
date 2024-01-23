import { DSUser } from '@/types/DSUsers/DSUser';
import { DSFile } from '@/types/DSItems/DSFile';
import { AccessorKeys } from '@/components/Table/constants/accessorKeys';

// Type Maps

type TableItemTypeMap = {
  file: DSFile;
  user: DSUser;
};

// Types

export type AnyDataType = TableItemTypeMap[keyof TableItemTypeMap];

export type AnyDataTypeKey = keyof TableItemTypeMap;

export type AnyAccessorKey = (typeof AccessorKeys)[keyof typeof AccessorKeys];

export type ContentDefaultView = 'table-row' | 'row' | 'table' | 'tile';
export type ContentView = 'row' | 'table' | 'tile';

// Generics

export type DataTypeByKey<T extends AnyDataTypeKey> = TableItemTypeMap[T];
