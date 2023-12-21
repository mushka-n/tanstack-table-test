import { CellContext } from '@tanstack/react-table';
import { DSFile } from '../../../../types/DSItems/DSFile';
import { AccessorKeys } from '../../index.constants';

const CreatedDateColumn = () => {
  return {
    accessorKey: AccessorKeys.DateCreated,
    header: 'Created',

    cell: ({ getValue }: CellContext<DSFile, Date>) => {
      return <div>{getValue().toDateString()}</div>;
    },
  };
};

export default CreatedDateColumn;
