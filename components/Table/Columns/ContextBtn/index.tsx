import { AccessorKeys, CONTEXT_BTN_SIZE_PX } from '../../index.constants';

const ContextBtnColumn = () => {
  return {
    accessorKey: AccessorKeys.ContextBtn,
    header: 'o',

    size: 0,
    enableHiding: false,

    cell: () => {
      return (
        <div
          style={{
            width: `${CONTEXT_BTN_SIZE_PX}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          |
        </div>
      );
    },
  };
};

export default ContextBtnColumn;
