import { ColumnSizingState, VisibilityState } from '@tanstack/react-table';
import { throttle } from 'lodash';
import {
  getDefaultSizing,
  getDefaultVisibility,
} from './useContentDefaultState';
import { ContentSettings } from '../types/contentSettings';

export const getSavedTableSizing = (
  tableId: string,
  settings: ContentSettings
): ColumnSizingState => {
  const tablesDataLS = localStorage.getItem('content-state');
  const tablesData = tablesDataLS && JSON.parse(tablesDataLS);

  if (!tablesData?.[tableId]) {
    const defaultSizing = getDefaultSizing(settings);
    saveTableState({ tableId, sizing: defaultSizing, settings });
    return defaultSizing;
  }

  return tablesData[tableId].sizing;
};

export const getSavedTableVisibility = (
  tableId: string,
  settings: ContentSettings
): VisibilityState => {
  const tablesDataLS = localStorage.getItem('content-state');
  const tablesData = tablesDataLS && JSON.parse(tablesDataLS);

  if (!tablesData?.[tableId]) {
    const defaultVisibility = getDefaultVisibility(settings);
    saveTableState({ tableId, visibility: defaultVisibility, settings });
    return defaultVisibility;
  }

  return tablesData[tableId].visibility;
};

export const saveTableState = ({
  tableId,
  sizing,
  visibility,
  settings,
}: {
  tableId: string;
  sizing?: ColumnSizingState;
  visibility?: VisibilityState;
  settings: ContentSettings;
}) => {
  throttle(() => {
    const tablesStateLS = localStorage.getItem('content-state');
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

    localStorage.setItem('content-state', JSON.stringify(tablesState));
  }, 1000)();
};
