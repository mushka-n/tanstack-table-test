export type DSUserRole =
  | 'owner'
  | 'admin'
  | 'manager'
  | 'collaborator'
  | 'user';

export const getDSUserRoleTranslation = (role: DSUserRole) => {
  switch (role) {
    case 'owner':
      return 'Owner';
    case 'admin':
      return 'DocSpace Admin';
    case 'manager':
      return 'Room Admin';
    case 'collaborator':
      return 'Power User';
    case 'user':
      return 'User';
  }
};
