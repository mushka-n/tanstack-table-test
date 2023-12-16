import { CellContext } from '@tanstack/react-table';
import { AccessorKeys } from '../../index.constants';
import { DSFile } from '../../../../types/DSItems/DSFile';

const DEFAULT_SIZE = 120;
const MIN_SIZE = 80;
const MAX_SIZE = 480;

const NameItemColumn = (savedColumnSize?: number) => {
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
