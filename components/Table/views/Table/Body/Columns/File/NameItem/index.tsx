import { ColumnDef } from '@tanstack/react-table';
import { AccessorKeys } from '@/components/Table/constants/accessorKeys';
import { DSFile } from '@/types/DSItems/DSFile';
import './styles.css';
import NameItemCell from './NameItemCell';

const NameItemColumn = (): ColumnDef<DSFile, DSFile> => {
  return {
    accessorKey: AccessorKeys.NameItem,
    accessorFn: (item: DSFile) => item,
    header: 'Name',
    enableHiding: false,

    cell: NameItemCell,
  };
};

export default NameItemColumn;
