import { Header, flexRender } from '@tanstack/react-table';
import styles from './header.module.css';

type ColumnHeaderProps = {
  header: Header<unknown, unknown>;
  width: number;
  minWidth: number;
  isResizable: boolean;
};

const ColumnHeader = ({
  header,
  width,
  minWidth,
  isResizable,
}: ColumnHeaderProps) => {
  return (
    <th
      key={header.id}
      colSpan={1}
      className={styles.column}
      style={{ width: `${width}px` }}
    >
      <div style={{ width: `${minWidth}px` }}>
        {flexRender(header.column.columnDef.header, header.getContext())}
      </div>

      {isResizable && (
        <div
          className={styles.resizeHandleWrapper}
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
        >
          <div className={styles.resizeHandle} />
        </div>
      )}
    </th>
  );
};

export default ColumnHeader;
