import { AccessorKeys } from '../../index.constants';

const DEFAULT_SIZE = 16;
const MIN_SIZE = 16;
const MAX_SIZE = 16;

const ContextBtnColumn = (savedColumnSize?: number) => {
  return {
    accessorKey: AccessorKeys.ContextBtn,
    header: '|',

    size: savedColumnSize ?? DEFAULT_SIZE,
    minSize: MIN_SIZE,
    maxSize: MAX_SIZE,

    cell: () => {
      return <div style={{ width: '16px' }}>|</div>;
    },
  };
};

export default ContextBtnColumn;
