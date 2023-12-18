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
    onGetColumnVisibility(tableId, dataTypeKey)
  );

  const setColumnVisibilityCustom = (
    columnVisibilityUpdater: TableUpdater<VisibilityState>
  ) => {
    setColumnVisibility(columnVisibilityUpdater);

    localStorage.setItem(
      'tablesVisibilityData',
      // @ts-expect-error: Type error from library
      JSON.stringify({ ...columnVisibility, ...columnVisibilityUpdater() })
    );
    // onSaveColumnVisibility(tableId, dataTypeKey, columnVisibilityUpdater);
  };

  return [columnVisibility, setColumnVisibilityCustom];
};

// Local Storage Manipulation

const onGetTablesVisibilityData = (): Record<
  string,
  VisibilityState
> | null => {
  const tablesDataLS = localStorage.getItem('tablesVisibilityData');
  if (!tablesDataLS) return null;
  return JSON.parse(tablesDataLS);
};

export const onGetColumnVisibility = (
  tableId: string,
  dataTypeKey: AnyDataTypeKey
): VisibilityState => {
  const tablesData = onGetTablesVisibilityData();
  if (!tablesData?.[tableId]) return getDefaultVisibility(dataTypeKey);
  return tablesData[tableId];
};

export const onSaveColumnVisibility = (
  tableId: string,
  dataTypeKey: AnyDataTypeKey,
  columnVisibilityUpdater: TableUpdater<VisibilityState>
) => {
  if (typeof columnVisibilityUpdater !== 'function') return;
  const columnVisibility = columnVisibilityUpdater({});
  const [columnId] = Object.keys(columnVisibility);
  const [columnValue] = Object.values(columnVisibility);

  let tablesData = onGetTablesVisibilityData();

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
