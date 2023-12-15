export const AccessorKeys = Object.freeze({
  NameItem: 'title',
  NameUser: 'displayName',
  Email: 'email',

  AuthorItem: 'createdBy',

  DateCreated: 'created',
  DateUpdated: 'updated',

  SizeItem: 'contentLength',

  TypeFile: 'fileType',
  TypeUser: 'role',
});

export const TableItems = Object.freeze({
  file: {
    id: 'file',
    columns: [
      AccessorKeys.NameItem,
      AccessorKeys.AuthorItem,
      AccessorKeys.DateCreated,
      AccessorKeys.DateUpdated,
      AccessorKeys.SizeItem,
      AccessorKeys.TypeFile,
    ],
  },
  user: {
    id: 'user',
    columns: [
      AccessorKeys.NameItem,
      AccessorKeys.AuthorItem,
      AccessorKeys.DateCreated,
      AccessorKeys.DateUpdated,
      AccessorKeys.SizeItem,
      AccessorKeys.TypeFile,
    ],
  },
});
