import { DSUser } from '../DSUsers/DSUser';

export type DSGroup = {
  id: string;
  name: string;
  manager?: DSUser;
  members: DSUser[];
};
