import { CellContext, ColumnDef } from '@tanstack/react-table';
import { DSFile } from '@/types/DSItems/DSFile';
import { AccessorKeys } from '@/components/Table/constants/accessorKeys';

const DateUpdatedColumn = (): ColumnDef<DSFile, Date> => {
  return {
    accessorKey: AccessorKeys.DateUpdated,
    header: 'Updated',

    cell: ({ getValue }: CellContext<DSFile, Date>) => {
      return <div>{getValue().toDateString()}</div>;
    },
  };
};

export default DateUpdatedColumn;
