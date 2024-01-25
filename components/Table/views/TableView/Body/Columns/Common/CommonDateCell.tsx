import { CellContext } from '@tanstack/react-table';
import { AnyDataType } from '@/components/Table/types';

const CommonDateCell = ({ getValue }: CellContext<AnyDataType, Date>) => {
  return <div>{getValue().toLocaleString('en-US', { hour12: false })}</div>;
};

export default CommonDateCell;
