import { DSUser } from '@/types/DSUsers/DSUser';
import { DSFile } from '@/types/DSItems/DSFile';
import { AccessorKeys } from '@/components/Table/constants/accessorKeys';

type TableItemTypeMap = {
  file: DSFile;
  user: DSUser;
};

// type TableDataLocalStorage = {
//   [tableId: string]: {
//     [columnKey: string]: {
//       size: number;
//       isVisible: boolean;
//     };
//   };
// };

// Simple

export type AnyDataType = TableItemTypeMap[keyof TableItemTypeMap];

export type AnyDataTypeKey = keyof TableItemTypeMap;

export type AnyAccessorKey = (typeof AccessorKeys)[keyof typeof AccessorKeys];

// Computed

export type GetItemTypeByName<T extends AnyDataTypeKey> = TableItemTypeMap[T];
