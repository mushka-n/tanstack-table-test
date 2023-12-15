import { CellContext } from '@tanstack/react-table';
import { DSFile } from '../../../constants/DSItems/DSFile';
import { AccessorKeys } from '../../index.constants';

const DEFAULT_SIZE = 120;
const MIN_SIZE = 80;
const MAX_SIZE = 160;

const DateUpdatedColumn = (savedColumnSize?: number) => {
  return {
    accessorKey: AccessorKeys.DateUpdated,
    header: 'Updated',

    size: savedColumnSize ?? DEFAULT_SIZE,
    minSize: MIN_SIZE,
    maxSize: MAX_SIZE,

    cell: ({ getValue }: CellContext<DSFile, Date>) => {
      return <div>{getValue().toDateString()}</div>;
    },
  };
};

export default DateUpdatedColumn;
