import { Row, flexRender } from '@tanstack/react-table';
import { AnyDataTypeKey, DataTypeByKey } from '@/components/Table/types';
import styles from '../Table/Body/body.module.css';
import { RefObject, useEffect, useReducer, useState } from 'react';
import ContextMenu from '@/components/ContextMenu';
import { useTableVirtualization } from '../../hooks/useTableVirtualization';
import { useTableSelection } from '../../hooks/useTableSelection';
import { useTileVirtualization } from '../../hooks/useTileVirtualization';

interface TileViewProps<DTK extends AnyDataTypeKey> {
  dataTypeKey: DTK;
  containerRef: RefObject<HTMLDivElement>;
  tableWidth: number;
  rows: Row<DataTypeByKey<DTK>>[];
  dataTotalLength?: number;
}

const tileThresholds = {
  '1': 600,
  '2': 900,
  '3': 1200,
  '4': 1500,
  '5': 1800,
};

const getColesNum = (tableWidth: number) => {
  const thresholds = Object.entries(tileThresholds);

  for (let i = 0; i < thresholds.length; i++) {
    const [colsNum, threshold] = thresholds[i];
    if (tableWidth < threshold) return parseInt(colsNum);
  }

  return thresholds.length;
};

// const colsNum = 6;

const TileView = <DTK extends AnyDataTypeKey>({
  dataTypeKey,
  containerRef,
  tableWidth,
  rows,
  // dataTotalLength,
}: TileViewProps<DTK>) => {
  const [colsNum, setColsNum] = useState<number>(getColesNum(tableWidth));

  const { selection, setSelection } = useTableSelection(dataTypeKey);
  const canSelect = !!selection && !!setSelection;

  const { vRows, totalSize, measure } = useTileVirtualization(
    containerRef,
    rows as Row<unknown>[],
    colsNum
  );

  const onSelectItem = (item: DataTypeByKey<DTK>) => {
    if (!canSelect) return;
    setSelection([item]);
  };

  useEffect(() => {
    const newColsNum = getColesNum(tableWidth);
    if (colsNum === newColsNum) return;
    setColsNum(newColsNum);
    measure();
  }, [colsNum, tableWidth, measure]);

  return (
    <>
      <tbody
        onContextMenu={(e) => e.preventDefault()}
        style={{
          height: `${totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        <tr style={{ position: 'absolute', top: 0, left: 0 }}>
          <button
            onClick={() => {
              setColsNum(colsNum + 1);
              measure();
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              setColsNum(colsNum - 1);
              measure();
            }}
          >
            -
          </button>
        </tr>

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
              <ContextMenu key={row.id}>
                <td
                  className={styles.row}
                  key={vRow.index}
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
