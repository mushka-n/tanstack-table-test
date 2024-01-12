import { CellContext } from '@tanstack/react-table';
import { DSFile } from '@/types/DSItems/DSFile';
import './styles.css';
import DocxIcon from '@/src/icons/docx.svg';
import { useTableSelection } from '@/components/Table/hooks/useTableSelection';

const NameItemCell = ({ getValue }: CellContext<DSFile, DSFile>) => {
  const item = getValue();
  const { selection, addItem, removeItem } = useTableSelection('file');

  const isSelected = selection?.includes(item);

  const onToggleSelect = () => {
    if (!selection || !addItem || !removeItem) return;
    if (!selection.includes(item)) addItem(item);
    else removeItem(item);
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
