import {
  OnChangeFn,
  Updater as TableUpdater,
  VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { getDefaultVisibility } from './index.constants';
import { AnyDataTypeKey } from './index.types';

export const useTableVisibility = (
  tableId: string,
  dataTypeKey: AnyDataTypeKey
): [VisibilityState, OnChangeFn<VisibilityState>] => {
  const [columnVisibility, setColumnVisibility] = useState(
    getTableVisibility(tableId, dataTypeKey)
  );

  const setColumnVisibilityCustom = (
    columnVisibilityUpdater: TableUpdater<VisibilityState>
  ) => {
    setColumnVisibility(columnVisibilityUpdater);
    saveTableVisibility(tableId, dataTypeKey, columnVisibilityUpdater);
  };

  return [columnVisibility, setColumnVisibilityCustom];
};

export const getTableVisibility = (
  tableId: string,
  dataTypeKey: AnyDataTypeKey
): VisibilityState => {
  const tablesDataLS = localStorage.getItem('tablesVisibilityData');
  const tablesData = tablesDataLS && JSON.parse(tablesDataLS);

  if (!tablesData?.[tableId]) return getDefaultVisibility(dataTypeKey);
  return tablesData[tableId];
};

export const saveTableVisibility = (
  tableId: string,
  dataTypeKey: AnyDataTypeKey,
  columnVisibilityUpdater: TableUpdater<VisibilityState>
) => {
  if (typeof columnVisibilityUpdater !== 'function') return;

  const visibility = columnVisibilityUpdater({});

  const [columnId] = Object.keys(visibility);
  const [columnValue] = Object.values(visibility);

  const tablesDataLS = localStorage.getItem('tablesVisibilityData');
  let tablesData = tablesDataLS && JSON.parse(tablesDataLS);

  if (!tablesData?.[tableId]) {
    const updatedDefaultVisibility = {
      ...getDefaultVisibility(dataTypeKey),
      [columnId]: columnValue,
    };
    if (!tablesData) tablesData = { [tableId]: updatedDefaultVisibility };
    else tablesData[tableId] = updatedDefaultVisibility;
  } else {
    tablesData[tableId][columnId] = columnValue;
  }

  localStorage.setItem('tablesVisibilityData', JSON.stringify(tablesData));
};
