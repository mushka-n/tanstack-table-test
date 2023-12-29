import { Row, Table, flexRender } from '@tanstack/react-table';
import { AnyDataType } from '../index.types';
import styles from './body.module.css';
import { DSUser } from '../../../types/DSUsers/DSUser';
import { useVirtualizer } from '@tanstack/react-virtual';
import { RefObject } from 'react';
interface TableBodyProps {
  containerRef: RefObject<HTMLDivElement>;
  table: Table<AnyDataType>;
}

const TableBody = ({ containerRef, table }: TableBodyProps) => {
  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 48,
    overscan: 20,
  });

  const vRows = virtualizer.getVirtualItems();

  let offsetTop = 0;
  let offsetBottom = 0;

  if (vRows?.length) {
    offsetTop = vRows[0]?.start || 0;
    offsetBottom = rows.length * 48 - (vRows[vRows.length - 1].end || 0);
  }

  return (
    <tbody>
      <tr>
        <td style={{ height: `${offsetTop}px` }} />
      </tr>

      {vRows.map((vRow) => {
        const row = rows[vRow.index] as Row<DSUser>;
        return (
          <tr
            className={styles.row}
            key={row.id}
            style={{
              height: `48px`,
            }}
          >
            {row.getVisibleCells().map((cell) => {
              return (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        );
      })}

      <tr>
        <td style={{ height: `${offsetBottom}px` }} />
      </tr>
    </tbody>
  );
};

export default TableBody;
