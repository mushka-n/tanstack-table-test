import { Row, flexRender } from '@tanstack/react-table';
import { AnyDataTypeKey, DataTypeByKey } from '@/components/Table/types';
import styles from './body.module.css';
import { RefObject } from 'react';
import ContextMenu from '@/components/ContextMenu';
import { useTableVirtualization } from '../../../hooks/useTableVirtualization';
import { useContentSelection } from '../../../hooks/useContentSelection';
import { CellContext } from '@tanstack/react-table';
import { DSFile } from '@/types/DSItems/DSFile';
import DocxIcon from '@/src/icons/docx.svg';
import { MouseEvent } from 'react';
import DropdownMenu from '@/components/DropdownMenu';

interface TableBodyProps<DTK extends AnyDataTypeKey> {
  dataTypeKey: DTK;
  containerRef: RefObject<HTMLDivElement>;
  rows: Row<DataTypeByKey<DTK>>[];
  dataTotalLength?: number;
}

const TableBody = <DTK extends AnyDataTypeKey>({
  dataTypeKey,
  containerRef,
  rows,
  // dataTotalLength,
}: TableBodyProps<DTK>) => {
  const { selection, setSelection } = useContentSelection(dataTypeKey);
  const canSelect = !!selection && !!setSelection;

  const { vRows, offsetTop, offsetBottom, scrollToIndex } =
    useTableVirtualization(rows as Row<unknown>[], containerRef);

  const onSelectItem = (item: DataTypeByKey<DTK>) => {
    if (!canSelect) return;
    setSelection([item]);
  };

  const onToggleSelect = (
    e: MouseEvent<HTMLElement>,
    item: DataTypeByKey<DTK>,
    isSelected: boolean
  ) => {
    if (!selection || !setSelection) return;
    e.stopPropagation();
    if (!isSelected) setSelection([...selection, item]);
    else setSelection(selection.filter((i) => i !== item));
  };

  return (
    <tbody onContextMenu={(e) => e.preventDefault()}>
      <tr>
        <td
          style={{
            minWidth: 'auto',
            height: `${offsetTop}px`,
          }}
        />
      </tr>

      {vRows.map((vRow) => {
        const row = rows[vRow.index];
        const item = row.original;
        const isSelected = canSelect && selection.includes(item);

        return (
          <ContextMenu item={item} key={row.id}>
            <tr
              id={`${vRow.index}`}
              className={styles.row}
              style={{ background: canSelect && isSelected ? '#ccc' : '' }}
              onClick={() => onSelectItem(item)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {cell.column.columnDef.meta?.isCheckbox ? (
                    <div className={styles['selection-wrapper']}>
                      <div
                        className={styles['icon-checkbox-wrapper']}
                        onClick={(e) => onToggleSelect(e, item, isSelected)}
                      >
                        <input
                          className={styles['checkbox']}
                          type='checkbox'
                          checked={isSelected}
                          readOnly
                        />
                        <img src={DocxIcon} className={styles['icon']} />
                      </div>

                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  ) : cell.column.columnDef.meta?.isContextBtn ? (
                    <>
                      <DropdownMenu item={item}>
                        <button
                          style={{
                            marginLeft: '100%',
                            transform: 'translateX(-100%)',
                          }}
                        >
                          ||
                        </button>
                      </DropdownMenu>
                    </>
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </td>
              ))}
            </tr>
          </ContextMenu>
        );
      })}

      <tr>
        <td
          style={{
            minWidth: 'auto',
            height: `${offsetBottom}px`,
          }}
        />
      </tr>
    </tbody>
  );
};

export default TableBody;
