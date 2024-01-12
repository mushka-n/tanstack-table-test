import { Row, flexRender } from '@tanstack/react-table';
import { AnyDataType } from '../index.types';
import styles from './body.module.css';
import { DSUser } from '../../../types/DSUsers/DSUser';
import { useVirtualizer } from '@tanstack/react-virtual';
import { RefObject } from 'react';
import ContextMenu from '../../ContextMenu';

const ROW_HEIGHT = 48;
const OVERSCAN = 10;

interface TableBodyProps {
  containerRef: RefObject<HTMLDivElement>;
  rows: Row<AnyDataType>[];
  dataTotalLength?: number;
}

const TableBody = ({ containerRef, rows, dataTotalLength }: TableBodyProps) => {
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: OVERSCAN,
  });

  const vRows = virtualizer.getVirtualItems();

  let offsetTop = 0;
  let offsetBottom = 0;
  if (vRows.length) {
    offsetTop = vRows[0].start || 0;
    offsetBottom =
      rows.length * ROW_HEIGHT - (vRows[vRows.length - 1].end || 0);
  }

  return (
    <tbody onContextMenu={(e) => e.preventDefault()}>
      <tr>
        <td style={{ height: `${offsetTop}px` }} />
      </tr>

      {vRows.map((vRow) => {
        const row = rows[vRow.index] as Row<DSUser>;
        return (
          <ContextMenu>
            <tr
              className={styles.row}
              key={row.id}
              style={{
                height: `48px`,
                borderBottom: '1px solid #dedede',
              }}
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
        <td style={{ height: `${offsetBottom}px` }} />
      </tr>
    </tbody>
  );
};

export default TableBody;
