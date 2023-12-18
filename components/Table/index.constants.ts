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

const FileItemColumnData = Object.freeze({
  [AccessorKeys.NameItem]: {
    isDefaultVisible: true,
    defaultSize: 20,
    minSize: 10,
    maxSize: 80,
  },
  [AccessorKeys.FileAuthorUser]: {
    isDefaultVisible: false,
    defaultSize: 20,
    minSize: 10,
    maxSize: 80,
  },
  [AccessorKeys.DateCreated]: {
    isDefaultVisible: true,
    defaultSize: 20,
    minSize: 10,
    maxSize: 80,
  },
  [AccessorKeys.DateUpdated]: {
    isDefaultVisible: true,
    defaultSize: 20,
    minSize: 10,
    maxSize: 80,
  },
  [AccessorKeys.SizeFile]: {
    isDefaultVisible: true,
    defaultSize: 20,
    minSize: 10,
    maxSize: 80,
  },
  [AccessorKeys.TypeFile]: {
    isDefaultVisible: true,
    defaultSize: 20,
    minSize: 10,
    maxSize: 80,
  },
  [AccessorKeys.ContextBtn]: {
    isDefaultVisible: true,
    defaultSize: 16,
    minSize: 16,
    maxSize: 16,
  },
});

const UserItemColumnData = Object.freeze({
  [AccessorKeys.NameUser]: {
    isDefaultVisible: true,
    defaultSize: 20,
    minSize: 10,
    maxSize: 80,
  },
  [AccessorKeys.TypeUser]: {
    isDefaultVisible: true,
    defaultSize: 20,
    minSize: 10,
    maxSize: 80,
  },
  [AccessorKeys.Email]: {
    isDefaultVisible: true,
    defaultSize: 20,
    minSize: 10,
    maxSize: 80,
  },
  [AccessorKeys.ContextBtn]: {
    isDefaultVisible: true,
    defaultSize: 16,
    minSize: 16,
    maxSize: 16,
  },
});

export const TableDefaultColumnData = Object.freeze({
  file: FileItemColumnData,
  user: UserItemColumnData,
});

export const getDefaultVisibility = (dataTypeKey: AnyDataTypeKey) => {
  const columnData = TableDefaultColumnData[dataTypeKey];

  let result = {};
  Object.entries(columnData).forEach(
    ([accessorKey, data]) =>
      (result = { ...result, [accessorKey]: data.isDefaultVisible })
  );
  return result;
};

export const getDefaultSizing = (dataTypeKey: AnyDataTypeKey) => {
  const columnData = TableDefaultColumnData[dataTypeKey];

  let result = {};
  Object.entries(columnData).forEach(
    ([accessorKey, data]) =>
      (result = { ...result, [accessorKey]: data.defaultSize })
  );
  return result;
};

export const getAccessorKeys = (dataTypeKey: AnyDataTypeKey) => {
  const columnData = TableDefaultColumnData[dataTypeKey];
  return Object.keys(columnData);
};
