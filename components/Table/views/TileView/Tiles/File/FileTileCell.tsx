import { CellContext } from '@tanstack/react-table';
import { DSFile } from '@/types/DSItems/DSFile';
import DocxIcon from '@/src/icons/docx.svg';
import { useTableSelection } from '@/components/Table/hooks/useTableSelection';
import { MouseEvent } from 'react';
import { DataTypeKeys } from '@/components/Table/enums';

const FileTileCell = ({ getValue }: CellContext<DSFile, DSFile>) => {
  const item = getValue();

  const { selection, setSelection } = useTableSelection(DataTypeKeys.File);
  const isSelected = selection?.includes(item);

  const onToggleSelect = (e: MouseEvent<HTMLElement>) => {
    if (!selection || !setSelection) return;
    e.stopPropagation();
    if (!isSelected) setSelection([...selection, item]);
    else setSelection(selection.filter((i) => i !== item));
  };

  return (
    <div
      className='wrapper'
      style={{ display: 'flex', flexDirection: 'column', padding: '8px' }}
    >
      <div
        style={{
          width: '100%',
          height: '140px',
          background: '#ddd',
          borderRadius: '4px',
        }}
      />

      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <div className='icon-checkbox-wrapper' onClick={onToggleSelect}>
          <input
            className='checkbox'
            type='checkbox'
            checked={isSelected}
            readOnly
          />
          <img src={DocxIcon} className='icon' />
        </div>

        <div className='text' style={{ fontSize: '16px' }}>
          {item.title}
        </div>
      </div>
    </div>
  );
};
export default FileTileCell;
