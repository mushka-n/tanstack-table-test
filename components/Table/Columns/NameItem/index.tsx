import { CellContext, ColumnDef } from '@tanstack/react-table';
import { AccessorKeys } from '../../index.constants';
import { DSFile } from '../../../../types/DSItems/DSFile';

const NameItemColumn = (): ColumnDef<DSFile, never> => {
  return {
    accessorKey: AccessorKeys.NameItem,
    header: 'Name',

    enableHiding: false,

    cell: ({ getValue }: CellContext<DSFile, string>) => {
      return <div>{getValue()}</div>;
    },
  };
};

export default NameItemColumn;
