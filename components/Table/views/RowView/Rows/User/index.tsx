import { CellContext, ColumnDef } from '@tanstack/react-table';
import { DSUser } from '@/types/DSUsers/DSUser';

const UserRow = (): ColumnDef<DSUser, DSUser> => {
  return {
    id: 'user-row',
    accessorFn: (item: DSUser) => item,

    cell: ({ getValue }: CellContext<DSUser, DSUser>) => {
      return <div>{getValue().displayName}</div>;
    },
  };
};

export default UserRow;
