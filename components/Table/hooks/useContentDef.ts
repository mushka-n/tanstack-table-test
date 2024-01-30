import { ColumnDef } from '@tanstack/react-table';
import { AnyDataTypeKey, DataTypeByKey } from '@/components/Table/types';
import { ContentViews } from '../settings';
import { ColumnIdsByKey, ContentSettings } from '../types/contentSettings';

type ContentDef<DTK extends AnyDataTypeKey> = ColumnDef<
  DataTypeByKey<DTK>,
  unknown
>[];

export const useContentDef = <DTK extends AnyDataTypeKey>(
  dataTypeKey: DTK,
  view: 'table' | 'row' | 'tile',
  settings: ContentSettings<DTK>
): ContentDef<DTK> => {
  const contentViews = ContentViews[dataTypeKey as keyof typeof ContentViews];

  if (view === 'table' && !!settings.columns) {
    const tableDef = contentViews.table as ContentDef<DTK>;
    const activeIds = settings.columns.map(({ id }) => id);
    return tableDef.filter(({ id }) =>
      activeIds.includes(id as ColumnIdsByKey<DTK>)
    );
  }

  if (view === 'row' && !!settings.row) {
    const rowDef = contentViews.row as ContentDef<DTK>;
    const activeRowId = settings.row;
    const activeRow = rowDef.filter(({ id }) => id === activeRowId);
    return activeRow;
  }

  if (view === 'tile' && !!settings.tile) {
    const tileDef = contentViews.tile as ContentDef<DTK>;
    const activeTileId = settings.tile;
    const activeTile = tileDef.filter(({ id }) => id === activeTileId);
    return activeTile;
  }

  console.error(
    `ContentDef was not found.\n${dataTypeKey}ContentSettings doesn't have ${view} view.`
  );

  return [];
};
