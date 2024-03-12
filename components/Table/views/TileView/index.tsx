import { Row, flexRender } from '@tanstack/react-table';
import { AnyDataTypeKey, DataTypeByKey } from '@/components/Table/types';
import styles from './tile.module.css';
import { RefObject, useEffect, useState } from 'react';
import ContextMenu from '@/components/ContextMenu';
import { useContentSelection } from '../../hooks/useContentSelection';
import { useTileVirtualization } from '../../hooks/useTileVirtualization';
import { TILE_THRESHOLDS } from '../../constants';

interface TileViewProps<DTK extends AnyDataTypeKey> {
  dataTypeKey: DTK;
  containerRef: RefObject<HTMLDivElement>;
  contentWidth: number;
  rows: Row<DataTypeByKey<DTK>>[];
  dataTotalLength?: number;
}

const getColesNum = (contentWidth: number) => {
  const thresholds = Object.entries(TILE_THRESHOLDS);

  for (let i = 0; i < thresholds.length; i++) {
    const [colsNum, threshold] = thresholds[i];
    if (contentWidth < threshold) return parseInt(colsNum);
  }

  return thresholds.length;
};

const TileView = <DTK extends AnyDataTypeKey>({
  dataTypeKey,
  containerRef,
  contentWidth,
  rows,
  // dataTotalLength,
}: TileViewProps<DTK>) => {
  const [colsNum, setColsNum] = useState<number>(getColesNum(contentWidth));

  const { selection, setSelection } = useContentSelection(dataTypeKey);
  const canSelect = !!selection && !!setSelection;

  const { vRows, totalSize, measure, scrollToIndex } = useTileVirtualization(
    containerRef,
    rows as Row<unknown>[],
    colsNum
  );

  const onSelectItem = (item: DataTypeByKey<DTK>) => {
    if (!canSelect) return;
    setSelection([item]);
  };

  const highlightElement = (index: number) => {
    const element = document.getElementById(`${index}`);
    if (!element) return;
    console.log(element);
    element.animate(
      [{ backgroundColor: 'yellow' }, { backgroundColor: 'white' }],
      { duration: 10000000 }
    );
  };

  useEffect(() => {
    const newColsNum = getColesNum(contentWidth);
    if (colsNum === newColsNum) return;
    setColsNum(newColsNum);
    measure();
  }, [colsNum, contentWidth, measure]);

  return (
    <>
      <button
        onClick={() => {
          scrollToIndex(120, { align: 'center', behavior: 'smooth' });
          highlightElement(120);
        }}
      >
        Scroll
      </button>
      <tbody
        onContextMenu={(e) => e.preventDefault()}
        style={{
          height: `${totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        <tr
          style={{
            height: `100%`,
            width: '100%',
            position: 'relative',
          }}
        >
          {vRows.map((vRow) => {
            const row = rows[vRow.index];
            const [tile] = row.getAllCells();
            const item = row.original;
            const isSelected = canSelect && selection.includes(item);

            const columnIndex = vRow.index % colsNum;
            const columnWidthPc = 100 / colsNum;

            return (
              <ContextMenu item={item} key={row.id}>
                <td
                  className={styles.row}
                  id={vRow.index.toString()}
                  key={row.id}
                  title={vRow.index.toString()}
                  onClick={() => onSelectItem(item)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: `${columnIndex * columnWidthPc}%`,
                    width: `${columnWidthPc}%`,
                    height: `${rows[vRow.index]}px`,
                    transform: `translateY(${vRow.start}px)`,
                    background: canSelect && isSelected ? '#ccc' : '',
                  }}
                >
                  {flexRender(tile.column.columnDef.cell, tile.getContext())}
                </td>
              </ContextMenu>
            );
          })}
        </tr>
      </tbody>
    </>
  );
};

export default TileView;
