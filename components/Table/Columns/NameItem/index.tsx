import { CellContext, ColumnDef } from '@tanstack/react-table';
import { AccessorKeys } from '../../index.constants';
import { DSFile } from '../../../../types/DSItems/DSFile';

const DEFAULT_SIZE = undefined;
const MIN_SIZE = 10;
const MAX_SIZE = 100;

const NameItemColumn = (savedColumnSize?: number): ColumnDef<DSFile, never> => {
  return {
    accessorKey: AccessorKeys.NameItem,
    header: 'Name',

    size: savedColumnSize ?? DEFAULT_SIZE,
    minSize: MIN_SIZE,
    maxSize: MAX_SIZE,

    enableHiding: false,

    cell: ({ getValue }: CellContext<DSFile, string>) => {
      return <div>{getValue()}</div>;
    },
  };
};

export default NameItemColumn;
