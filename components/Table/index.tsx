import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { AnyDataTypeKey, ContentView, DataTypeByKey } from './types';
import { useTableVisibility } from './hooks/useTableVisibility';
import { useContext, useEffect, useRef, useState, ChangeEvent } from 'react';
import { useTableSizing } from './hooks/useTableSizing';
import RowView from './views/RowView';
import { useContentWidth } from './hooks/useContentWidth';
import TableView from './views/TableView';
import TileView from './views/TileView';
import { useContentDef } from './hooks/useContentDef';
import ContentContext from './hooks/useContentContext';

interface TableProps<DTK extends AnyDataTypeKey> {
  id: string;

  defaultView?: ContentView;
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
  // const theme = useContext(ThemeContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWidth = useContentWidth(containerRef);

  const [viewInternal, setViewInternal] = useState<ContentView>(defaultView);
  const onChangeViewInternal = (e: ChangeEvent<HTMLInputElement>) =>
    setViewInternal(e.target.value as ContentView);

  const [sizing, setSizing, onSizingChange, sizingInfo, onSizingInfoChange] =
    useTableSizing(id, dataTypeKey);

  const [visibility, onVisibilityChange] = useTableVisibility(id, dataTypeKey);

  const table = useReactTable({
    data,
    columns: useContentDef(dataTypeKey as AnyDataTypeKey, viewInternal),
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

  const level = useContext(ContentContext);
  console.log(level);

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
        <div>
          <ContentContext.Provider
            value={{
              dataTypeKey,
              contentWidth,
              containerRef,
              table,
              tableState: { sizing, visibility },
            }}
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
          </ContentContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Table;
