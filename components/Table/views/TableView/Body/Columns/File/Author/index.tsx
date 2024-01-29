import { CellContext } from '@tanstack/react-table';
import { DSFile } from '@/types/DSItems/DSFile';
import { DSUser } from '@/types/DSUsers/DSUser';

const FileAuthorCell = ({ getValue }: CellContext<DSFile, DSUser>) => {
  return <div>{getValue().displayName}</div>;
};

export default FileAuthorCell;
