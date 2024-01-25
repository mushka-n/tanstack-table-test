import { CellContext, ColumnDef } from '@tanstack/react-table';
import { DSFile } from '@/types/DSItems/DSFile';
import { DSUser } from '@/types/DSUsers/DSUser';
import { ColumnIds } from '@/components/Table/constants';

const AuthorColumn = (): ColumnDef<DSFile, DSUser> => {
  return {
    id: ColumnIds.file.author,
    accessorKey: 'createdBy',
    header: 'Author',

    cell: ({ getValue }: CellContext<DSFile, DSUser>) => {
      return <div>{getValue().displayName}</div>;
    },
  };
};

export default AuthorColumn;
