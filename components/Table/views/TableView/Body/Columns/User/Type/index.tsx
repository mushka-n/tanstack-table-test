import { CellContext } from '@tanstack/react-table';
import { DSUser } from '@/types/DSUsers/DSUser';
import {
  DSUserRole,
  getDSUserRoleTranslation,
} from '@/types/DSUsers/DSUserRole';

const UserTypeCell = ({ getValue }: CellContext<DSUser, DSUserRole>) => {
  return <div>{getDSUserRoleTranslation(getValue())}</div>;
};

export default UserTypeCell;
