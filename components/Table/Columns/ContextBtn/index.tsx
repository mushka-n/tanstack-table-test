import { AccessorKeys } from '../../index.constants';

const ContextBtnColumn = () => {
  return {
    accessorKey: AccessorKeys.ContextBtn,
    header: '|',

    size: 0,
    enableHiding: false,

    cell: () => {
      return <div style={{ width: '16px' }}>|</div>;
    },
  };
};

export default ContextBtnColumn;
