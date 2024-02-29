import { AnyDataTypeKey } from '@/components/Table/types';
import { contentDefsMap } from '../settings';
import {
  ContentAvailableViews,
  ContentDefIds,
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
      const activeIds = settings.columns.map(({ id }) => id);
      return contentDefs.table.filter(
        ({ id, meta }) =>
          activeIds.includes(id as ContentDefIds<DTK, 'table'>) ||
          meta?.isInherent
      );
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
