import { ContextMenu } from '@radix-ui/react-context-menu';

const CommonContextBtnCell = () => {
  return (
    <div
      style={{
        width: `${40}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      {/* <ContextMenu item={item}> */}
      <button>CB</button> {/* </ContextMenu> */}
    </div>
  );
};

export default CommonContextBtnCell;
