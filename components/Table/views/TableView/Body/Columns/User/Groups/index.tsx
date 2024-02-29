import { CellContext } from '@tanstack/react-table';
import { DSUser } from '@/types/DSUsers/DSUser';
import SelectDemo from '@/components/Select';
import { DSGroup } from '@/types/DSGroup';

const UserGroupsCell = ({ getValue }: CellContext<DSUser, DSGroup[]>) => {
  return <div>{<SelectDemo />}</div>;
};

export default UserGroupsCell;
