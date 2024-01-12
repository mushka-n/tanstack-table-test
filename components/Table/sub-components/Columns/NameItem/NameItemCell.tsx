import { CellContext } from '@tanstack/react-table';
import { DSFile } from '@/types/DSItems/DSFile';
import './styles.css';
import DocxIcon from '@/src/icons/docx.svg';
import { useTableSelection } from '@/components/Table/hooks/useTableSelection';

const NameItemCell = ({ getValue }: CellContext<DSFile, DSFile>) => {
  const item = getValue();

  const { selection, setSelection } = useTableSelection('file');

  const isSelected = selection?.includes(item);

  const onToggleSelect = () => {
    if (!selection || !setSelection) return;
    if (!selection.includes(item)) setSelection([...selection, item]);
    else setSelection(selection.filter((i) => i !== item));
  };

  return (
    <div className='wrapper'>
      <div className='icon-checkbox-wrapper'>
        <input
          className='checkbox'
          type='checkbox'
          checked={isSelected}
          onChange={onToggleSelect}
        />
        <img src={DocxIcon} className='icon' />
      </div>

      {item.title}
    </div>
  );
};
export default NameItemCell;
