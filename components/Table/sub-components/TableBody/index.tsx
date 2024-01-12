import { Row, flexRender } from '@tanstack/react-table';
import { AnyDataType, AnyDataTypeKey } from '@/components/Table/types/dataType';
import styles from './body.module.css';
import { RefObject } from 'react';
import ContextMenu from '@/components/ContextMenu';
import { useTableVirtualization } from '../../hooks/useTableVirtualization';
import { useTableSelection } from '../../hooks/useTableSelection';

interface TableBodyProps {
  dataTypeKey: AnyDataTypeKey;
  containerRef: RefObject<HTMLDivElement>;
  rows: Row<AnyDataType>[];
  dataTotalLength?: number;
}

const TableBody = ({
  dataTypeKey,
  containerRef,
  rows,
  dataTotalLength,
}: TableBodyProps) => {
  const { selection, setSelection } = useTableSelection(dataTypeKey);
  const canSelect = !!selection && !!setSelection;

  const { vRows, offsetTop, offsetBottom } = useTableVirtualization(
    rows,
    containerRef
  );

  const onSelectItem = (item: AnyDataType) => {
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
        const row = rows[vRow.index] as Row<AnyDataType>;
        const item = row.original;
        const isSelected = canSelect && selection.includes(item);

        return (
          <ContextMenu>
            <tr
              className={styles.row}
              key={row.id}
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

      {!!dataTotalLength && rows.length < dataTotalLength && (
        <tr>
          <td
            colSpan={99}
            style={{
              minWidth: 'auto',
              height: `48px`,
              width: '100%',
              background: 'grey',
              textAlign: 'center',
            }}
          >
            <div>LOADING NEXT PAGE</div>
          </td>
        </tr>
      )}

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
