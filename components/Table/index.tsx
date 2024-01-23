import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import { AnyDataTypeKey, ContentDefaultView, DataTypeByKey } from './types';
import { useTableVisibility } from './hooks/useTableVisibility';
import { useEffect, useRef, useState } from 'react';
import { useTableSizing } from './hooks/useTableSizing';
import RowView from './views/Row';
import { useContentWidth } from './hooks/useContentWidth';
import TableView from './views/Table';
import TileView from './views/Tile';
import { useContentDef } from './hooks/useContentDef';

interface TableProps<DTK extends AnyDataTypeKey> {
  id: string;

  defaultView?: ContentDefaultView;
  dataTypeKey: DTK;

  data: DataTypeByKey<DTK>[];
  dataTotalLength?: number;

  onBottomReached?: () => void;
}

const Table = <DTK extends AnyDataTypeKey>({
  id,
  defaultView = 'table',
  dataTypeKey,
  data,
  dataTotalLength,
  onBottomReached,
}: TableProps<DTK>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tableWidth = useContentWidth(containerRef);

  const [viewInternal, setViewInternal] = useState<string>(defaultView);
  const onChangeViewInternal = (e) => setViewInternal(e.target.value);

  const [sizing, setSizing, onSizingChange, sizingInfo, onSizingInfoChange] =
    useTableSizing(id, dataTypeKey);

  const [visibility, onVisibilityChange] = useTableVisibility(id, dataTypeKey);

  const table = useReactTable({
    data,
    columns: useContentDef(dataTypeKey, viewInternal),
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnSizing: sizing,
      columnSizingInfo: sizingInfo,
      columnVisibility: visibility,
    },
    columnResizeMode: 'onChange',
    onColumnVisibilityChange: (visibilityUpdater) =>
      onVisibilityChange(visibilityUpdater, sizing, setSizing),
    onColumnSizingChange: onSizingChange,
    onColumnSizingInfoChange: onSizingInfoChange,
  });

  useEffect(() => {
    if (!containerRef?.current || !onBottomReached) return;

    const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
    const hasReachedBottom = scrollHeight - scrollTop - clientHeight < 300;

    console.log(scrollHeight, scrollTop, clientHeight);
    console.log(hasReachedBottom);

    if (hasReachedBottom) onBottomReached();
  }, [onBottomReached]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'row-reverse', height: '100%' }}
    >
      <div
        style={{
          minWidth: '180px',
          margin: '0 0 0 16px',
        }}
      >
        <fieldset style={{ marginBottom: '20px' }}>
          <legend>View</legend>

          <div>
            <input
              id={`${id}_table-row-view`}
              type='radio'
              value={'table-row'}
              checked={viewInternal === 'table-row'}
              onChange={onChangeViewInternal}
            />
            <label htmlFor={`${id}_table-row-view`}>Table/Row (Auto)</label>
          </div>

          <div>
            <input
              id={`${id}_table-view`}
              type='radio'
              value={'table'}
              checked={viewInternal === 'table'}
              onChange={onChangeViewInternal}
            />
            <label htmlFor={`${id}_table-view`}>Table</label>
          </div>

          <div>
            <input
              id={`${id}_row-view`}
              type='radio'
              value={'row'}
              checked={viewInternal === 'row'}
              onChange={onChangeViewInternal}
            />
            <label htmlFor={`${id}_row-view`}>Row</label>
          </div>

          <div>
            <input
              id={`${id}_tile-view`}
              type='radio'
              value={'tile'}
              checked={viewInternal === 'tile'}
              onChange={onChangeViewInternal}
            />
            <label htmlFor={`${id}_tile-view`}>Tile</label>
          </div>
        </fieldset>

        {viewInternal === 'table' && (
          <fieldset>
            <legend>Visibility</legend>

            {table.getAllLeafColumns().map(
              (column) =>
                column.getCanHide() && (
                  <div key={column.id}>
                    <label>
                      <input
                        type={'checkbox'}
                        checked={column.getIsVisible()}
                        onChange={column.getToggleVisibilityHandler()}
                      />
                      {column.id}
                    </label>
                  </div>
                )
            )}
          </fieldset>
        )}
      </div>

      <div
        ref={containerRef}
        className='table-container'
        onScroll={onBottomReached}
      >
        <div>
          <table
            id={id}
            style={{
              tableLayout: 'fixed',
              position: 'relative',
              width: '100%',
              backgroundColor: '#efefeffa',
              height: '100%',
              borderCollapse: 'collapse',
            }}
            cellPadding={0}
            cellSpacing={0}
          >
            {viewInternal === 'table' && (
              <TableView
                dataTypeKey={dataTypeKey}
                containerRef={containerRef}
                tableWidth={tableWidth}
                headers={table.getHeaderGroups()[0].headers}
                rows={table.getRowModel().rows}
                sizing={sizing}
                dataTotalLength={dataTotalLength}
              />
            )}

            {viewInternal === 'row' && (
              <RowView
                dataTypeKey={dataTypeKey}
                containerRef={containerRef}
                rows={table.getRowModel().rows}
                dataTotalLength={dataTotalLength}
              />
            )}

            {viewInternal === 'tile' && (
              <TileView
                dataTypeKey={dataTypeKey}
                containerRef={containerRef}
                tableWidth={tableWidth}
                rows={table.getRowModel().rows}
                dataTotalLength={dataTotalLength}
              />
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
