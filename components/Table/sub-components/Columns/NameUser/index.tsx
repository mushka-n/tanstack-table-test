import { CellContext } from '@tanstack/react-table';
import { AccessorKeys } from '@/components/Table/constants/accessorKeys';
import { DSUser } from '@/types/DSUsers/DSUser';

const NameUserColumn = () => {
  return {
    accessorKey: AccessorKeys.NameUser,
    header: 'Name',

    enableHiding: false,

    cell: ({ getValue }: CellContext<DSUser, string>) => {
      return <div>{getValue()}</div>;
    },
  };
};

export default NameUserColumn;
