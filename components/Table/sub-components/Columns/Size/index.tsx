import { CellContext } from '@tanstack/react-table';
import { AccessorKeys } from '@/components/Table/constants/accessorKeys';
import { DSFile } from '@/types/DSItems/DSFile';

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
