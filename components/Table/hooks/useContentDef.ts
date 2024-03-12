import { AnyDataTypeKey } from '@/components/Table/types';
import { contentDefsMap } from '../settings';
import {
  ContentAvailableViews,
  ContentDefs,
  ContentSettings,
} from '../types/contentSettings';
import { useMemo } from 'react';

export const useContentDef = <
  DTK extends AnyDataTypeKey,
  AV extends ContentAvailableViews,
>(
  dataTypeKey: DTK,
  view: AV[number],
  settings: ContentSettings<DTK, AV>
) => {
  return useMemo(() => {
    const contentDefs = contentDefsMap[dataTypeKey] as ContentDefs<DTK, AV>;

    if (view === 'table' && 'table' in contentDefs && 'columns' in settings) {
      const activeIds: string[] = settings.columns.map(({ id }) => id);

      return contentDefs.table
        .filter(({ id, meta }) => activeIds.includes(id) || meta?.isInherent)
        .sort((a, b) => {
          const aIndexInActiveIds = activeIds.indexOf(a.id);
          const bIndexInActiveIds = activeIds.indexOf(b.id);

          // If both items are in activeIds, sort them based on their order in activeIds
          if (aIndexInActiveIds !== -1 && bIndexInActiveIds !== -1)
            return aIndexInActiveIds - bIndexInActiveIds;

          // If only one item is in activeIds, put it before the other item
          if (aIndexInActiveIds !== -1) return -1;
          if (bIndexInActiveIds !== -1) return 1;

          // If neither item is in activeIds, sort them based on their order in contentDefs
          return (
            contentDefs.table.findIndex(({ id }) => id === a.id) -
            contentDefs.table.findIndex(({ id }) => id === b.id)
          );
        });
    }

    if (view === 'row' && 'row' in contentDefs && 'row' in settings) {
      return contentDefs.row.filter(({ id }) => id === settings.row);
    }

    if (view === 'tile' && 'tile' in contentDefs && 'tile' in settings) {
      return contentDefs.tile.filter(({ id }) => id === settings.tile);
    }

    console.error(
      `ContentDef was not found.\n${dataTypeKey}ContentSettings doesn't have ${view} view.`
    );
    return [];
  }, [dataTypeKey, settings, view]);
};
