import { CellContext, ColumnDef } from '@tanstack/react-table';
import { AccessorKeys } from '@/components/Table/constants/accessorKeys';
import { DSFile } from '@/types/DSItems/DSFile';
import './styles.css';
import DocxIcon from '@/src/icons/docx.svg';

const NameItemColumn = (): ColumnDef<DSFile, never> => {
  return {
    accessorKey: AccessorKeys.NameItem,
    header: 'Name',
    enableHiding: false,

    cell: ({ getValue }: CellContext<DSFile, string>) => {
      return (
        <div className='wrapper'>
          <div className='icon-checkbox-wrapper'>
            <input className='checkbox' type='checkbox' />
            <img src={DocxIcon} className='icon' alt='React logo' />
          </div>

          {getValue()}
        </div>
      );
    },
  };
};

export default NameItemColumn;
