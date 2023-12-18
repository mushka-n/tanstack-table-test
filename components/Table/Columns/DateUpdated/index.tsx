import { CellContext } from '@tanstack/react-table';
import { DSFile } from '../../../../types/DSItems/DSFile';
import { AccessorKeys } from '../../index.constants';

const DEFAULT_SIZE = undefined;
const MIN_SIZE = 10;
const MAX_SIZE = 100;

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
