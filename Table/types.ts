export type TableItemTypeMap = {
  file: File;
  person: User;
};

export type AnyItemTypeName = keyof TableItemTypeMap;
export type GetItemTypeByName<T extends AnyItemTypeName> = TableItemTypeMap[T];

// Item Types

export type AnyItemType = TableItemTypeMap[AnyItemTypeName];
export type AnyData = AnyItemType[];

export enum FileType {
  Unknown1 = 1,
  Unknown2 = 2,
  Unknown3 = 3,
  Unknown4 = 4,
  Spreadsheet = 5,
  Presentation = 6,
  Document = 7,
}

export const CellKeys = {
  Title: 'title',
};

export type File = {
  id: number;
  title: string;
  author: User;
  contentLength: string;
  created: Date;
  updated: Date;
  fileType: FileType;
};

export type User = {
  id: string;
  displayName: string;
  avatarSmall: string;
  profileUrl: string;
  hasAvatar: boolean;
};
