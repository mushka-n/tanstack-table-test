import { CellContext } from '@tanstack/react-table';
import { AccessorKeys } from '../../index.constants';
import { DSUser } from '../../../../types/DSUsers/DSUser';

const DEFAULT_SIZE = 120;
const MIN_SIZE = 80;
const MAX_SIZE = 480;

const EmailColumn = (savedColumnSize?: number) => {
  return {
    accessorKey: AccessorKeys.Email,
    header: 'Email',

    size: savedColumnSize ?? DEFAULT_SIZE,
    minSize: MIN_SIZE,
    maxSize: MAX_SIZE,

    cell: ({ getValue }: CellContext<DSUser, string>) => {
      return <div>{getValue()}</div>;
    },
  };
};

export default EmailColumn;
