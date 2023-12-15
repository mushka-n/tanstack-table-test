import { CellContext } from '@tanstack/react-table';
import { DSFile } from '../../../constants/DSItems/DSFile';
import { AccessorKeys } from '../../index.constants';

const DEFAULT_SIZE = 120;
const MIN_SIZE = 80;
const MAX_SIZE = 160;

const CreatedDateColumn = (savedColumnSize?: number) => {
  return {
    accessorKey: AccessorKeys.DateCreated,
    header: 'Created',

    size: savedColumnSize ?? DEFAULT_SIZE,
    minSize: MIN_SIZE,
    maxSize: MAX_SIZE,

    cell: ({ getValue }: CellContext<DSFile, Date>) => {
      return <div>{getValue().toDateString()}</div>;
    },
  };
};

export default CreatedDateColumn;
