import { ColumnSizingState, VisibilityState } from '@tanstack/react-table';
import { AnyDataTypeKey } from '../types';
import { throttle } from 'lodash';
import {
  getDefaultSizing,
  getDefaultVisibility,
} from './useContentDefaultState';
import { ContentSettings } from '../types/contentSettings';

export const getSavedTableSizing = (
  tableId: string,
  settings: ContentSettings<AnyDataTypeKey>
): ColumnSizingState => {
  const tablesDataLS = localStorage.getItem('tables_state');
  const tablesData = tablesDataLS && JSON.parse(tablesDataLS);

  if (!tablesData?.[tableId]) return getDefaultSizing(settings);
  return tablesData[tableId].sizing;
};

export const getSavedTableVisibility = (
  tableId: string,
  settings: ContentSettings<AnyDataTypeKey>
): VisibilityState => {
  const tablesDataLS = localStorage.getItem('tables_state');
  const tablesData = tablesDataLS && JSON.parse(tablesDataLS);

  if (!tablesData?.[tableId]) return getDefaultVisibility(settings);
  return tablesData[tableId].visibility;
};

export const saveTablesState = ({
  tableId,
  sizing,
  visibility,
  settings,
}: {
  tableId: string;
  sizing?: ColumnSizingState;
  visibility?: VisibilityState;
  settings: ContentSettings<AnyDataTypeKey>;
}) => {
  throttle(() => {
    const tablesStateLS = localStorage.getItem('tables_state');
    let tablesState = tablesStateLS && JSON.parse(tablesStateLS);

    if (!tablesState?.[tableId]) {
      const defaultTableState = {
        sizing: getDefaultSizing(settings),
        visibility: getDefaultVisibility(settings),
      };
      if (!tablesStateLS) tablesState = { [tableId]: defaultTableState };
      else tablesState[tableId] = defaultTableState;
    }

    if (sizing) tablesState[tableId].sizing = sizing;
    if (visibility) tablesState[tableId].visibility = visibility;

    localStorage.setItem('tables_state', JSON.stringify(tablesState));
  }, 1000)();
};
