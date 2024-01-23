import { CellContext, ColumnDef } from '@tanstack/react-table';
import { DSFile } from '@/types/DSItems/DSFile';
import { DSUser } from '@/types/DSUsers/DSUser';
import { AccessorKeys } from '@/components/Table/constants/accessorKeys';

const AuthorColumn = (): ColumnDef<DSFile, DSUser> => {
  return {
    accessorKey: AccessorKeys.FileAuthorUser,
    header: 'Author',

    cell: ({ getValue }: CellContext<DSFile, DSUser>) => {
      return <div>{getValue().displayName}</div>;
    },
  };
};

export default AuthorColumn;
