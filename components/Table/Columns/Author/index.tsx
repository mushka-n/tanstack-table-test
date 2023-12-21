import { CellContext } from '@tanstack/react-table';
import { DSFile } from '../../../../types/DSItems/DSFile';
import { DSUser } from '../../../../types/DSUsers/DSUser';
import { AccessorKeys } from '../../index.constants';

const AuthorColumn = () => {
  return {
    accessorKey: AccessorKeys.FileAuthorUser,
    header: 'Author',

    cell: ({ getValue }: CellContext<DSFile, DSUser>) => {
      return <div>{getValue().displayName}</div>;
    },
  };
};

export default AuthorColumn;
