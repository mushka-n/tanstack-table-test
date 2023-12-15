import { DSUser } from '../constants/DSUsers/DSUser';
import { DSFile } from '../constants/DSItems/DSFile';

type TableItemTypeMap = {
  file: DSFile;
  user: DSUser;
};

// Simple

export type AnyDataType = TableItemTypeMap[keyof TableItemTypeMap];

export type AnyDataTypeKey = keyof TableItemTypeMap;

// Computed

export type GetItemTypeByName<T extends AnyDataTypeKey> = TableItemTypeMap[T];
