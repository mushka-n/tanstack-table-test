import { DSUserRole } from '@/types/DSUsers/DSUserRole';

export type DSUser = {
  id: string;
  displayName: string;
  email: string;
  role: DSUserRole;
  avatarSmall: string;
  profileUrl: string;
  hasAvatar: boolean;
};
