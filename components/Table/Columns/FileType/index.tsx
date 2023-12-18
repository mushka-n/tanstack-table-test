import { CellContext } from '@tanstack/react-table';
import { AccessorKeys } from '../../index.constants';
import { DSFile } from '../../../../types/DSItems/DSFile';
import { getFileTypeFullName } from '../../../../types/DSItems/DSFileType';

const DEFAULT_SIZE = undefined;
const MIN_SIZE = 10;
const MAX_SIZE = 100;

const FileTypeColumn = (savedColumnSize?: number) => {
  return {
    accessorKey: AccessorKeys.TypeFile,
    header: 'Type',

    size: savedColumnSize ?? DEFAULT_SIZE,
    minSize: MIN_SIZE,
    maxSize: MAX_SIZE,

    cell: ({ getValue }: CellContext<DSFile, string>) => {
      return <div>{getFileTypeFullName(+getValue())}</div>;
    },
  };
};

export default FileTypeColumn;
