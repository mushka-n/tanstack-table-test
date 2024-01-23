import { CellContext } from '@tanstack/react-table';
import { DSFile } from '@/types/DSItems/DSFile';
import './styles.css';
import DocxIcon from '@/src/icons/docx.svg';
import { useTableSelection } from '@/components/Table/hooks/useTableSelection';
import { MouseEvent } from 'react';

const NameItemCell = ({ getValue }: CellContext<DSFile, DSFile>) => {
  const item = getValue();

  const { selection, setSelection } = useTableSelection('file');

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

      <div className='text'>{item.title}</div>
    </div>
  );
};
export default NameItemCell;
