import { ColumnSizingState, VisibilityState } from '@tanstack/react-table';
import {
  getDefaultSizing,
  getDefaultVisibility,
} from '../constants/columnData';
import { AnyDataTypeKey } from '../types';
import { throttle } from 'lodash';

export const getSavedTableSizing = (
  tableId: string,
  dataTypeKey: AnyDataTypeKey
): ColumnSizingState => {
  const tablesDataLS = localStorage.getItem('tables_state');
  const tablesData = tablesDataLS && JSON.parse(tablesDataLS);

  if (!tablesData?.[tableId]) return getDefaultSizing(dataTypeKey);
  return tablesData[tableId].sizing;
};

export const getSavedTableVisibility = (
  tableId: string,
  dataTypeKey: AnyDataTypeKey
): VisibilityState => {
  const tablesDataLS = localStorage.getItem('tables_state');
  const tablesData = tablesDataLS && JSON.parse(tablesDataLS);

  if (!tablesData?.[tableId]) return getDefaultVisibility(dataTypeKey);
  return tablesData[tableId].visibility;
};

export const saveTablesState = ({
  tableId,
  dataTypeKey,
  sizing,
  visibility,
}: {
  tableId: string;
  dataTypeKey: AnyDataTypeKey;
  sizing?: ColumnSizingState;
  visibility?: VisibilityState;
}) => {
  throttle(() => {
    const tablesStateLS = localStorage.getItem('tables_state');
    let tablesState = tablesStateLS && JSON.parse(tablesStateLS);

    if (!tablesState?.[tableId]) {
      const defaultTableState = {
        sizing: getDefaultSizing(dataTypeKey),
        visibility: getDefaultVisibility(dataTypeKey),
      };
      if (!tablesStateLS) tablesState = { [tableId]: defaultTableState };
      else tablesState[tableId] = defaultTableState;
    }

    if (sizing) tablesState[tableId].sizing = sizing;
    if (visibility) tablesState[tableId].visibility = visibility;

    localStorage.setItem('tables_state', JSON.stringify(tablesState));
  }, 1000)();
};
