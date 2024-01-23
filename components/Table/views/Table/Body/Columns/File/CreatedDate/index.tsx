import { CellContext, ColumnDef } from '@tanstack/react-table';
import { DSFile } from '@/types/DSItems/DSFile';
import { AccessorKeys } from '@/components/Table/constants/accessorKeys';

const CreatedDateColumn = (): ColumnDef<DSFile, Date> => {
  return {
    accessorKey: AccessorKeys.DateCreated,
    header: 'Created',

    cell: ({ getValue }: CellContext<DSFile, Date>) => {
      return <div>{getValue().toLocaleString('en-US', { hour12: false })}</div>;
    },
  };
};

export default CreatedDateColumn;
