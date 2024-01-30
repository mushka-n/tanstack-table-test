import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { AnyDataTypeKey, DataTypeByKey } from './types';
import { ContentView, ContentSettings } from './types/contentSettings';
import { useTableVisibility } from './hooks/useTableVisibility';
import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { useTableSizing } from './hooks/useTableSizing';
import RowView from './views/RowView';
import { useContentWidth } from './hooks/useContentWidth';
import TableView from './views/TableView';
import TileView from './views/TileView';
import { useContentDef } from './hooks/useContentDef';
import { DefaultContentSettings } from './settings';

interface TableProps<DTK extends AnyDataTypeKey> {
  id: string;
  defaultView?: ContentView;
  dataTypeKey: DTK;
  data: DataTypeByKey<DTK>[];
  dataTotalLength?: number;
  onBottomReached?: () => void;
  settings?: ContentSettings<DTK>;
  settingsFn?: (defaultSettings: ContentSettings<DTK>) => ContentSettings<DTK>;
}

const Table = <DTK extends AnyDataTypeKey>({
  id,
  defaultView = 'table',
  dataTypeKey,
  data,
  dataTotalLength,
  onBottomReached,
  settings: propsSettings = DefaultContentSettings[dataTypeKey],
  settingsFn,
}: TableProps<DTK>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWidth = useContentWidth(containerRef);

  const settings = settingsFn
    ? settingsFn(DefaultContentSettings[dataTypeKey])
    : propsSettings;

  const [viewInternal, setViewInternal] = useState<ContentView>(defaultView);
  const onChangeViewInternal = (e: ChangeEvent<HTMLInputElement>) =>
    setViewInternal(e.target.value as ContentView);

  const [sizing, setSizing, onSizingChange, sizingInfo, onSizingInfoChange] =
    useTableSizing(id, settings as unknown as ContentSettings<AnyDataTypeKey>);

  const [visibility, onVisibilityChange] = useTableVisibility(
    id,
    settings as unknown as ContentSettings<AnyDataTypeKey>
  );

  const table = useReactTable({
    data,
    columns: useContentDef<DTK>(dataTypeKey, viewInternal, settings),
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnSizing: {},
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
                      {column.id.split('-').at(-1)}
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
              contentWidth={contentWidth}
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
              contentWidth={contentWidth}
              rows={table.getRowModel().rows}
              dataTotalLength={dataTotalLength}
            />
          )}
        </table>
      </div>
    </div>
  );
};

export default Table;
