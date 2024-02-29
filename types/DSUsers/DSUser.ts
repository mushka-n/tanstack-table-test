import { DSUserRole } from '@/types/DSUsers/DSUserRole';
import { DSGroup } from '../DSGroup';

export type DSUser = {
  id: string;
  displayName: string;
  email: string;
  role: DSUserRole;
  groups: DSGroup[];
  avatarSmall: string;
  profileUrl: string;
  hasAvatar: boolean;
};
