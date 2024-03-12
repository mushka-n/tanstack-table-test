import { CellContext } from '@tanstack/react-table';
import { DSFile } from '@/types/DSItems/DSFile';
import './styles.css';

const FileTitleCell = ({ getValue }: CellContext<DSFile, string>) => {
  return <div className='text'>{getValue()}</div>;
};
export default FileTitleCell;
