import { CONTEXT_BTN_SIZE_PX } from '@/components/Table/constants/columnData';

const CommonContextBtnCell = () => {
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
};

export default CommonContextBtnCell;
