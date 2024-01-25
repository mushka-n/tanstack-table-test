import { CellContext } from '@tanstack/react-table';
import { AccessorKeys } from '@/components/Table/constants/accessorKeys';
import { DSUser } from '@/types/DSUsers/DSUser';

const EmailColumn = () => {
  return {
    accessorKey: AccessorKeys.Email,
    header: 'Email',

    cell: ({ getValue }: CellContext<DSUser, string>) => {
      return <div>{getValue()}</div>;
    },
  };
};

export default EmailColumn;
