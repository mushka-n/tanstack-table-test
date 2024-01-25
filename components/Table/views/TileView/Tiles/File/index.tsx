import { ColumnDef } from '@tanstack/react-table';
import { DSFile } from '@/types/DSItems/DSFile';
import FileTileCell from './FileTileCell';

const FileTile = (): ColumnDef<DSFile, DSFile> => {
  return {
    id: 'file-row',
    accessorFn: (item: DSFile) => item,

    cell: FileTileCell,
  };
};

export default FileTile;
