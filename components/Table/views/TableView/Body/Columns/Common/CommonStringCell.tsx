import { CellContext } from '@tanstack/react-table';
import { AnyDataType } from '@/components/Table/types';

const CommonStringCell = ({ getValue }: CellContext<AnyDataType, string>) => {
  return <div>{getValue()}</div>;
};

export default CommonStringCell;
