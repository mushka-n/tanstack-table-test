import { Row, flexRender } from '@tanstack/react-table';
import { AnyDataTypeKey, DataTypeByKey } from '@/components/Table/types';
import styles from './body.module.css';
import { RefObject } from 'react';
import ContextMenu from '@/components/ContextMenu';
import { useTableVirtualization } from '../../../hooks/useTableVirtualization';
import { useContentSelection } from '../../../hooks/useContentSelection';

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
              style={{
                boxSizing: 'border-box',
                height: `48px`,
                width: '100%',
                borderBottom: '1px solid #dedede',
                background: canSelect && isSelected ? '#ccc' : '',
              }}
              onClick={() => onSelectItem(item)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
