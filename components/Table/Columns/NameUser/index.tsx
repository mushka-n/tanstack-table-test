import { CellContext } from '@tanstack/react-table';
import { AccessorKeys } from '../../index.constants';
import { DSUser } from '../../../../types/DSUsers/DSUser';

const DEFAULT_SIZE = undefined;
const MIN_SIZE = 10;
const MAX_SIZE = 100;

const NameUserColumn = (savedColumnSize?: number) => {
  return {
    accessorKey: AccessorKeys.NameUser,
    header: 'Name',

    size: savedColumnSize ?? DEFAULT_SIZE,
    minSize: MIN_SIZE,
    maxSize: MAX_SIZE,

    enableHiding: false,

    cell: ({ getValue }: CellContext<DSUser, string>) => {
      return <div>{getValue()}</div>;
    },
  };
};

export default NameUserColumn;
