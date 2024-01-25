import { ColumnDef } from '@tanstack/react-table';
import { DSFile } from '@/types/DSItems/DSFile';
import FileRowCell from './FileRowCell';

const FileRow = (): ColumnDef<DSFile, DSFile> => {
  return {
    id: 'file-row',
    accessorFn: (item: DSFile) => item,
    cell: FileRowCell,
  };
};

export default FileRow;
