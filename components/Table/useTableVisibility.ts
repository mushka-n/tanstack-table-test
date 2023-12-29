import {
  ColumnSizingState,
  Updater,
  VisibilityState,
} from '@tanstack/react-table';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  TABLE_MIN_SIZE as minSize,
  getDefaultVisibility,
} from './index.constants';
import { AnyDataTypeKey } from './index.types';
import { sumFloats } from '../../utils/sumFloats';

export const useTableVisibility = (
  tableId: string,
  dataTypeKey: AnyDataTypeKey
): [VisibilityState, typeof onVisibilityChange] => {
  const [visibility, setVisibility] = useState(
    getTableVisibility(tableId, dataTypeKey)
  );

  const onVisibilityChange = (
    visibilityUpdater: Updater<VisibilityState>,
    sizing: ColumnSizingState,
    setSizing: Dispatch<SetStateAction<ColumnSizingState>>
  ) => {
    if (typeof visibilityUpdater !== 'function') return;

    const newVisibility = visibilityUpdater({});
    const [columnKey] = Object.keys(newVisibility);
    const columnIndex = Object.keys(sizing).indexOf(columnKey);
    const [columnVisibility] = Object.values(newVisibility);

    const entries = Object.entries(sizing);
    const leftEntries = entries
      .slice(0, columnIndex)
      .filter(([, size]) => size > 0);
    const rightEntries = entries
      .slice(columnIndex + 1)
      .filter(([, size]) => size > 0);

    const newSizing = { ...sizing };
    const columnSize = -sizing[columnKey];
    newSizing[columnKey] = columnSize;

    // Toggling column visibility ON:
    // we iterate through [first column to the left] and [all columns to the right]
    // and remove as much from their size as we can until [sizeToRedestribute] becomes 0
    if (columnVisibility) {
      let sizeToRedestribute = columnSize;
      const entriesToCompensate = [leftEntries.pop()!, ...rightEntries];
      entriesToCompensate.every(([entryKey, entrySize]) => {
        let newEntrySize = sumFloats(entrySize, -sizeToRedestribute);
        if (newEntrySize < minSize) {
          sizeToRedestribute = sumFloats(minSize, -newEntrySize);
          newEntrySize = minSize;
        } else sizeToRedestribute = 0;
        newSizing[entryKey] = newEntrySize;
      });
    }

    // Toggling column visibility OFF:
    // [first column to the left] gets all its size
    else {
      const [entryKey, entrySize] = leftEntries.pop()!;
      newSizing[entryKey] = sumFloats(entrySize, sizing[columnKey]);
    }

    setVisibility(visibilityUpdater);
    setSizing(newSizing);
    saveTableVisibility(tableId, dataTypeKey, visibilityUpdater);
  };

  return [visibility, onVisibilityChange];
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
  visibilityUpdater: Updater<VisibilityState>
) => {
  if (typeof visibilityUpdater !== 'function') return;

  const visibility = visibilityUpdater({});

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
