import { CellContext } from '@tanstack/react-table';
import { AccessorKeys } from '@/components/Table/constants/accessorKeys';
import { DSFile } from '@/types/DSItems/DSFile';
import { getFileTypeFullName } from '@/types/DSItems/DSFileType';

const FileTypeColumn = () => {
  return {
    accessorKey: AccessorKeys.TypeFile,
    header: 'Type',

    cell: ({ getValue }: CellContext<DSFile, string>) => {
      return <div>{getFileTypeFullName(+getValue())}</div>;
    },
  };
};

export default FileTypeColumn;
