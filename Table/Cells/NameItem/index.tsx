import { CellContext } from '@tanstack/react-table';
import { AnyItemType } from '../../types';

const NameItemCell = ({ getValue }: CellContext<AnyItemType, any>) => {
  return <p>{getValue()}</p>;
};

export default NameItemCell;
