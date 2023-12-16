import {
  OnChangeFn,
  Updater as TableUpdater,
  VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';

export const useTableVisibility = (
  tableId: string
): [VisibilityState, OnChangeFn<VisibilityState>] => {
  const [columnVisibility, setColumnVisibility] = useState(
    onGetColumnVisibility(tableId)
  );

  const setColumnVisibilityCustom = (
    columnVisibilityUpdater: TableUpdater<VisibilityState>
  ) => {
    setColumnVisibility(columnVisibilityUpdater);
    onSaveColumnVisibility(tableId, columnVisibilityUpdater);
  };

  return [columnVisibility, setColumnVisibilityCustom];
};

// Local Storage Manipulation

const onGetTablesVisibilityData = () => {
  const tablesDataLS = localStorage.getItem('tablesVisibilityData');
  if (!tablesDataLS) return null;

  return JSON.parse(tablesDataLS);
};

export const onGetColumnVisibility = (tableId: string) => {
  const tablesData = onGetTablesVisibilityData();

  if (!tablesData?.[tableId]) return null;
  return tablesData[tableId];
};

export const onSaveColumnVisibility = (
  tableId: string,
  columnVisibilityUpdater: TableUpdater<VisibilityState>
) => {
  if (typeof columnVisibilityUpdater !== 'function') return;

  const columnVisibility = columnVisibilityUpdater({});
  const [columnId] = Object.keys(columnVisibility);
  const [columnValue] = Object.values(columnVisibility);

  let tablesData = onGetTablesVisibilityData();

  if (!tablesData) tablesData = { [tableId]: { columnId: columnValue } };
  else if (!tablesData[tableId])
    tablesData[tableId] = { [columnId]: columnValue };
  else tablesData[tableId][columnId] = columnValue;

  localStorage.setItem('tablesVisibilityData', JSON.stringify(tablesData));
};
