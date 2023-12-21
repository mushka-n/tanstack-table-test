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

export const TABLE_MIN_SIZE = 10;

const FileItemColumnData = Object.freeze({
  [AccessorKeys.NameItem]: {
    isDefaultVisible: true,
  },
  [AccessorKeys.FileAuthorUser]: {
    isDefaultVisible: false,
  },
  [AccessorKeys.DateCreated]: {
    isDefaultVisible: true,
  },
  [AccessorKeys.DateUpdated]: {
    isDefaultVisible: true,
  },
  [AccessorKeys.SizeFile]: {
    isDefaultVisible: true,
  },
  [AccessorKeys.TypeFile]: {
    isDefaultVisible: true,
  },
  [AccessorKeys.ContextBtn]: {
    isDefaultVisible: true,
  },
});

const UserItemColumnData = Object.freeze({
  [AccessorKeys.NameUser]: {
    isDefaultVisible: true,
  },
  [AccessorKeys.TypeUser]: {
    isDefaultVisible: true,
  },
  [AccessorKeys.Email]: {
    isDefaultVisible: true,
  },
  [AccessorKeys.ContextBtn]: {
    isDefaultVisible: true,
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

export const getDefaultSizing = (dataTypeKey: AnyDataTypeKey) => {
  const columnData = TableDefaultColumnData[dataTypeKey];
  const columnEntries = Object.entries(columnData);

  const visibleColumnsNum = columnEntries.filter(
    ([key, data]) => key !== AccessorKeys.ContextBtn && data.isDefaultVisible
  ).length;

  const result: { [key: string]: number } = {};
  columnEntries.forEach(
    ([key, data]) =>
      (result[key] =
        key !== AccessorKeys.ContextBtn && data.isDefaultVisible
          ? 100 / visibleColumnsNum
          : 0)
  );
  return result;
};
