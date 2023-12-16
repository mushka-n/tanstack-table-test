import { AnyDataTypeKey } from './index.types';

export const AccessorKeys = Object.freeze({
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
    defaultSize: 200,
    minSize: undefined,
    maxSize: undefined,
  },
  [AccessorKeys.FileAuthorUser]: {
    isDefaultVisible: false,
    defaultSize: 200,
    minSize: undefined,
    maxSize: undefined,
  },
  [AccessorKeys.DateCreated]: {
    isDefaultVisible: true,
    defaultSize: 200,
    minSize: undefined,
    maxSize: undefined,
  },
  [AccessorKeys.DateUpdated]: {
    isDefaultVisible: true,
    defaultSize: 200,
    minSize: undefined,
    maxSize: undefined,
  },
  [AccessorKeys.SizeFile]: {
    isDefaultVisible: true,
    defaultSize: 200,
    minSize: undefined,
    maxSize: undefined,
  },
  [AccessorKeys.TypeFile]: {
    isDefaultVisible: true,
    defaultSize: 200,
    minSize: undefined,
    maxSize: undefined,
  },
});

const UserItemColumnData = Object.freeze({
  [AccessorKeys.NameUser]: {
    isDefaultVisible: true,
    defaultSize: 200,
    minSize: undefined,
    maxSize: undefined,
  },
  [AccessorKeys.TypeUser]: {
    isDefaultVisible: true,
    defaultSize: 200,
    minSize: undefined,
    maxSize: undefined,
  },
  [AccessorKeys.Email]: {
    isDefaultVisible: true,
    defaultSize: 200,
    minSize: undefined,
    maxSize: undefined,
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
