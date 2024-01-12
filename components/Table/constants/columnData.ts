import { AccessorKeys } from './accessorKeys';
import { AnyDataTypeKey } from '@/components/Table/types/dataType';

// In %
export const TABLE_MIN_SIZE = 10;

// In px
export const CONTEXT_BTN_SIZE_PCT = 0;
export const CONTEXT_BTN_SIZE_PX = 40;

const FileItemColumnData = {
  [AccessorKeys.NameItem]: {
    isDefaultVisible: true,
    defaultSize: 40,
  },
  [AccessorKeys.FileAuthorUser]: {
    isDefaultVisible: false,
    defaultSize: -15,
  },
  [AccessorKeys.DateCreated]: {
    isDefaultVisible: true,
    defaultSize: 15,
  },
  [AccessorKeys.DateUpdated]: {
    isDefaultVisible: true,
    defaultSize: 15,
  },
  [AccessorKeys.SizeFile]: {
    isDefaultVisible: true,
    defaultSize: 15,
  },
  [AccessorKeys.TypeFile]: {
    isDefaultVisible: true,
    defaultSize: 15,
  },
  // Context Btn
  [AccessorKeys.ContextBtn]: {
    isDefaultVisible: true,
    defaultSize: 0,
  },
};

const UserItemColumnData = {
  [AccessorKeys.NameUser]: {
    isDefaultVisible: true,
    defaultSize: 100 / 3,
  },
  [AccessorKeys.TypeUser]: {
    isDefaultVisible: true,
    defaultSize: 100 / 3,
  },
  [AccessorKeys.Email]: {
    isDefaultVisible: true,
    defaultSize: 100 / 3,
  },
  // Context Btn
  [AccessorKeys.ContextBtn]: {
    isDefaultVisible: true,
    defaultSize: 0,
  },
};

export const TableDefaultColumnData = Object.freeze({
  file: FileItemColumnData,
  user: UserItemColumnData,
});

export const getDefaultVisibility = (dataTypeKey: AnyDataTypeKey) => {
  const columnData = TableDefaultColumnData[dataTypeKey];
  const entries = Object.entries(columnData);

  const result: { [key: string]: boolean } = {};
  entries.forEach(([key, data]) => (result[key] = data.isDefaultVisible));
  return result;
};

// Default visible column size = 100 / number of default visible columns
// Default hidden column size  = -1 * (100 / number of all columns)
// Context button column size  = 0
export const getDefaultSizing = (dataTypeKey: AnyDataTypeKey) => {
  const columnData = TableDefaultColumnData[dataTypeKey];
  const entries = Object.entries(columnData);

  const result: { [key: string]: number } = {};
  entries.forEach(([key, data]) => (result[key] = data.defaultSize));
  return result;
};
