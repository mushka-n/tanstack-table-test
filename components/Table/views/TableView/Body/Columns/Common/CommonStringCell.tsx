import { CellContext } from '@tanstack/react-table';
import { AnyDataType } from '@/components/Table/types';

const CommonStringCell = <DT extends AnyDataType>({
  getValue,
}: CellContext<DT, string>) => {
  return <div>{getValue()}</div>;
};

export default CommonStringCell;
