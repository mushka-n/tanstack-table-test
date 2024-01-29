import { CellContext } from '@tanstack/react-table';
import DocxIcon from '@/src/icons/docx.svg';
import { useContentSelection } from '@/components/Table/hooks/useContentSelection';
import { MouseEvent } from 'react';
import { DSUser } from '@/types/DSUsers/DSUser';

const UserRow = ({ getValue }: CellContext<DSUser, DSUser>) => {
  const item = getValue();

  const { selection, setSelection } = useContentSelection('user');
  const isSelected = selection?.includes(item);

  const onToggleSelect = (e: MouseEvent<HTMLElement>) => {
    if (!selection || !setSelection) return;
    e.stopPropagation();
    if (!isSelected) setSelection([...selection, item]);
    else setSelection(selection.filter((i) => i !== item));
  };

  return (
    <div className='wrapper'>
      <div className='icon-checkbox-wrapper' onClick={onToggleSelect}>
        <input
          className='checkbox'
          type='checkbox'
          checked={isSelected}
          readOnly
        />
        <img src={DocxIcon} className='icon' />
      </div>

      <div
        style={{
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <div className='text' style={{ fontSize: '16px' }}>
          {item.displayName}
        </div>

        <div style={{ fontSize: '14px' }}>{item.email}</div>
      </div>
    </div>
  );
};

export default UserRow;
