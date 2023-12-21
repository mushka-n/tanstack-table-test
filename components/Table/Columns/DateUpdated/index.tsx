import { CellContext } from '@tanstack/react-table';
import { DSFile } from '../../../../types/DSItems/DSFile';
import { AccessorKeys } from '../../index.constants';

const DateUpdatedColumn = () => {
  return {
    accessorKey: AccessorKeys.DateUpdated,
    header: 'Updated',

    cell: ({ getValue }: CellContext<DSFile, Date>) => {
      return <div>{getValue().toDateString()}</div>;
    },
  };
};

export default DateUpdatedColumn;
