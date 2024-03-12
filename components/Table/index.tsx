import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { AnyDataTypeKey, DataTypeByKey } from './types';
import {
  ContentSettings,
  ContentAvailableViews,
} from './types/contentSettings';
import { useTableVisibility } from './hooks/useTableVisibility';
import { useEffect, useRef } from 'react';
import { useTableSizing } from './hooks/useTableSizing';
import RowView from './views/RowView';
import { useContentWidth } from './hooks/useContentWidth';
import TableView from './views/TableView';
import TileView from './views/TileView';
import { useContentDef } from './hooks/useContentDef';
import { defaultContentSettingsMap } from './settings';
import { useContentView } from './hooks/useContentView';
import useContentSettingsErrorCheck from './hooks/useContentSettingsErrorCheck';

interface ContentProps<
  DTK extends AnyDataTypeKey,
  AV extends ContentAvailableViews,
> {
  id: string;
  dataTypeKey: DTK;
  data: DataTypeByKey<DTK>[];
  dataTotalLength?: number;
  onBottomReached?: () => void;
  settings?: ContentSettings<DTK, AV>;
}

const Content = <DTK extends AnyDataTypeKey, AV extends ContentAvailableViews>({
  id,
  dataTypeKey,
  data,
  dataTotalLength,
  onBottomReached,
  settings = defaultContentSettingsMap[
    dataTypeKey
  ] as unknown as ContentSettings<DTK, AV>,
}: ContentProps<DTK, AV>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [contentWidth] = useContentWidth(containerRef);

  const withTable =
    settings.availableViews.includes('table') && 'columns' in settings;

  useContentSettingsErrorCheck(id, settings as unknown as ContentSettings);

  const [view, onChangeView] = useContentView<AV>(
    settings.defaultView,
    contentWidth
  );

  const contentDef = useContentDef<DTK, AV>(dataTypeKey, view, settings);

  const [sizing, setSizing, onSizingChange, sizingInfo, onSizingInfoChange] =
    useTableSizing(id, settings as unknown as ContentSettings);

  const [visibility, onVisibilityChange] = useTableVisibility(
    id,
    settings as unknown as ContentSettings,
    sizing,
    setSizing
  );

  const table = useReactTable({
    data,
    columns: contentDef,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnSizing: {},
      columnSizingInfo: sizingInfo,
      columnVisibility: visibility,
    },
    columnResizeMode: 'onChange',
    onColumnVisibilityChange: withTable ? onVisibilityChange : undefined,
    onColumnSizingChange: withTable ? onSizingChange : undefined,
    onColumnSizingInfoChange: withTable ? onSizingInfoChange : undefined,
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
          {settings.availableViews.includes('table') && (
            <div>
              <input
                id={`${id}_table-view`}
                type='radio'
                value={'table'}
                checked={view === 'table'}
                onChange={onChangeView}
              />
              <label htmlFor={`${id}_table-view`}>Table</label>
            </div>
          )}

          {settings.availableViews.includes('row') && (
            <div>
              <input
                id={`${id}_row-view`}
                type='radio'
                value={'row'}
                checked={view === 'row'}
                onChange={onChangeView}
              />
              <label htmlFor={`${id}_row-view`}>Row</label>
            </div>
          )}

          {settings.availableViews.includes('tile') && (
            <div>
              <input
                id={`${id}_tile-view`}
                type='radio'
                value={'tile'}
                checked={view === 'tile'}
                onChange={onChangeView}
              />
              <label htmlFor={`${id}_tile-view`}>Tile</label>
            </div>
          )}
        </fieldset>

        {view === 'table' && (
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
                      {column.columnDef.header?.toString()}
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
          {view === 'table' && (
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

          {view === 'row' && (
            <RowView
              dataTypeKey={dataTypeKey}
              containerRef={containerRef}
              rows={table.getRowModel().rows}
              dataTotalLength={dataTotalLength}
            />
          )}

          {view === 'tile' && (
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

export default Content;
