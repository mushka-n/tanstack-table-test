import { DSUser } from '@/types/DSUsers/DSUser';
import { DSFileType } from '@/types/DSItems/DSFileType';

export type DSFile = {
  id: number;
  title: string;
  roomName: string;
  createdBy: DSUser;
  contentLength: string;
  created: Date;
  updated: Date;
  erasure: Date;
  fileType: DSFileType;
};
