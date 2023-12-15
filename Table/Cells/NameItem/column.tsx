import NameItemCell from '.';
import { CellContext } from '@tanstack/react-table';
import { AnyItemType } from '../../types';
import { useGetColumnSize } from '../../useTableSizing';

const DEFAULT_SIZE = 120;
const MIN_SIZE = 80;
const MAX_SIZE = 200;

const NameItemColumn = (savedColumnSize?: number) => {
  return {
    accessorKey: 'title',
    header: 'Name',

    size: savedColumnSize ?? DEFAULT_SIZE,
    minSize: MIN_SIZE,
    maxSize: MAX_SIZE,

    cell: ({ getValue }: CellContext<AnyItemType, any>) => {
      return <p>{getValue()}</p>;
    },
  };
};

export default NameItemColumn;
