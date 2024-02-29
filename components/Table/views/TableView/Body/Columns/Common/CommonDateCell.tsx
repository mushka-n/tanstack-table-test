import { CellContext } from '@tanstack/react-table';
import { AnyDataType } from '@/components/Table/types';

const CommonDateCell = <DT extends AnyDataType>({
  getValue,
}: CellContext<DT, Date>) => {
  return <div>{getValue().toLocaleString('en-US', { hour12: false })}</div>;
};

export default CommonDateCell;
