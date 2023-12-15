import { CellContext } from '@tanstack/react-table';
import { DSFile } from '../../../../types/DSItems/DSFile';
import { DSUser } from '../../../../types/DSUsers/DSUser';
import { AccessorKeys } from '../../index.constants';

const DEFAULT_SIZE = 120;
const MIN_SIZE = 80;
const MAX_SIZE = 480;

const AuthorColumn = (savedColumnSize?: number) => {
  return {
    accessorKey: AccessorKeys.AuthorItem,
    header: 'Author',

    size: savedColumnSize ?? DEFAULT_SIZE,
    minSize: MIN_SIZE,
    maxSize: MAX_SIZE,

    cell: ({ getValue }: CellContext<DSFile, DSUser>) => {
      return <div>{getValue().displayName}</div>;
    },
  };
};

export default AuthorColumn;
