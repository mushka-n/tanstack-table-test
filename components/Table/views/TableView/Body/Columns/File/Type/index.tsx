import { CellContext } from '@tanstack/react-table';
import { DSFile } from '@/types/DSItems/DSFile';
import { getFileTypeFullName } from '@/types/DSItems/DSFileType';

const FileTypeCell = ({ getValue }: CellContext<DSFile, string>) => {
  return <div>{getFileTypeFullName(+getValue())}</div>;
};

export default FileTypeCell;
