import { DSUser } from '../DSUsers/DSUser';
import { DSFileType } from './DSFileType';

export type DSFile = {
  id: number;
  title: string;
  createdBy: DSUser;
  contentLength: string;
  created: Date;
  updated: Date;
  fileType: DSFileType;
};
