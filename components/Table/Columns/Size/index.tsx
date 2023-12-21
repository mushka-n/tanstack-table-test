import { CellContext } from '@tanstack/react-table';
import { AccessorKeys } from '../../index.constants';
import { DSFile } from '../../../../types/DSItems/DSFile';

const SizeColumn = () => {
  return {
    accessorKey: AccessorKeys.SizeFile,
    header: 'Size',

    cell: ({ getValue }: CellContext<DSFile, string>) => {
      return <div>{getValue()}</div>;
    },
  };
};

export default SizeColumn;
