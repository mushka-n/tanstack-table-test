import { AnyDataTypeKey } from './index.types';

export const AccessorKeys = Object.freeze({
  ContextBtn: 'contextBtn',
  DateCreated: 'created',
  DateUpdated: 'updated',
  Email: 'email',
  FileAuthorUser: 'createdBy',
  NameItem: 'title',
  NameRoom: 'title',
  NameUser: 'displayName',
  RoomOwnerUser: 'createdBy',
  SizeFile: 'contentLength',
  TypeFile: 'fileType',
  TypeUser: 'role',
});

// In %
export const TABLE_MIN_SIZE = 10;

// In px
export const CONTEXT_BTN_SIZE_PCT = 0;
export const CONTEXT_BTN_SIZE_PX = 40;

const FileItemColumnData = Object.freeze({
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
  [AccessorKeys.ContextBtn]: {
    isDefaultVisible: true,
    defaultSize: CONTEXT_BTN_SIZE_PCT,
  },
});

const UserItemColumnData = Object.freeze({
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
  [AccessorKeys.ContextBtn]: {
    isDefaultVisible: true,
    defaultSize: CONTEXT_BTN_SIZE_PCT,
  },
});

export const TableDefaultColumnData = Object.freeze({
  file: FileItemColumnData,
  user: UserItemColumnData,
});

export const getAccessorKeys = (dataTypeKey: AnyDataTypeKey) => {
  const columnData = TableDefaultColumnData[dataTypeKey];
  return Object.keys(columnData);
};

export const getDefaultVisibility = (dataTypeKey: AnyDataTypeKey) => {
  const columnData = TableDefaultColumnData[dataTypeKey];

  let result = {};
  Object.entries(columnData).forEach(
    ([key, data]) => (result = { ...result, [key]: data.isDefaultVisible })
  );
  return result;
};

// Default visible column size = 100 / number of default visible columns
// Default hidden column size  = -1 * (100 / number of all columns)
// Context button column size  = 0
export const getDefaultSizing = (dataTypeKey: AnyDataTypeKey) => {
  const columnData = TableDefaultColumnData[dataTypeKey];
  const entries = Object.entries(columnData);

  const columns = entries.filter(([key]) => key !== AccessorKeys.ContextBtn);
  const visibleColumns = columns.filter(([, data]) => data.isDefaultVisible);

  const result: { [key: string]: number } = {};
  entries.forEach(([key, data]) => (result[key] = data.defaultSize));
  return result;
};

console.log(getDefaultSizing('file'));
