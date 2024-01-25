import { CellContext } from '@tanstack/react-table';
import { DSFile } from '@/types/DSItems/DSFile';
import DocxIcon from '@/src/icons/docx.svg';
import { useTableSelection } from '@/components/Table/hooks/useTableSelection';
import { MouseEvent } from 'react';
import { DataTypeKeys } from '@/components/Table/enums';

const FileRowCell = ({ getValue }: CellContext<DSFile, DSFile>) => {
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
          {item.title}
        </div>

        <div style={{ fontSize: '14px' }}>
          {item.created.toLocaleString('en-US', { hour12: false })}
        </div>
      </div>
    </div>
  );
};
export default FileRowCell;
