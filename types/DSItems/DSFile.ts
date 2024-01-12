import { DSUser } from '@/types/DSUsers/DSUser';
import { DSFileType } from '@/types/DSItems/DSFileType';

export type DSFile = {
  id: number;
  title: string;
  createdBy: DSUser;
  contentLength: string;
  created: Date;
  updated: Date;
  fileType: DSFileType;
};
