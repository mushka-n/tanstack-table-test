import {
  ColumnSizingState,
  Updater,
  VisibilityState,
} from '@tanstack/react-table';
import { Dispatch, SetStateAction, useState } from 'react';
import { TABLE_MIN_SIZE as minSize } from '@/components/Table/constants/columnData';
import { AnyDataTypeKey } from '@/components/Table/types';
import { addF } from '@/utils/sumFloats';
import { getSavedTableVisibility, saveTablesState } from './useTableSavedState';

export const useTableVisibility = (
  tableId: string,
  dataTypeKey: AnyDataTypeKey
): [VisibilityState, typeof onVisibilityChange] => {
  const [visibility, setVisibility] = useState(
    getSavedTableVisibility(tableId, dataTypeKey)
  );

  const onVisibilityChange = (
    visibilityUpdater: Updater<VisibilityState>,
    sizing: ColumnSizingState,
    setSizing: Dispatch<SetStateAction<ColumnSizingState>>
  ) => {
    if (typeof visibilityUpdater !== 'function') return;

    const [columnKey] = Object.keys(visibilityUpdater({}));
    const [columnVisibility] = Object.values(visibilityUpdater({}));
    const newVisibility = { ...visibility, [columnKey]: columnVisibility };

    // We only use visible columns (with size > 0) in calculations
    console.log(sizing);
    let entries = Object.entries(sizing);
    entries = entries.filter(([key, size]) => key === columnKey || size > 0);
    const columnIndex = entries.findIndex(([key]) => key === columnKey);
    const leftEntries = entries.slice(0, columnIndex);
    const rightEntries = entries.slice(columnIndex + 1);

    // To save the size of the column
    // we turn its value to a negative number instead of making it 0
    const newSizing = { ...sizing };
    const columnSize = -sizing[columnKey];
    newSizing[columnKey] = columnSize;

    // Toggling column visibility ON:
    // we iterate through [first column to the left], [all columns to the right], [other columns to the left in reverse order]
    // and in that specific order remove as much from their size as we can until [sizeToCompensate] becomes 0
    if (columnVisibility) {
      let sizeToCompensate = columnSize;
      const entriesToAdjust = [
        leftEntries.at(-1)!,
        ...rightEntries,
        ...leftEntries.slice(0, -1).reverse(),
      ];

      entriesToAdjust.every(([entryKey, entrySize]) => {
        let newEntrySize = addF(entrySize, -sizeToCompensate);

        if (newEntrySize < minSize) {
          newEntrySize = minSize;
          sizeToCompensate = addF(sizeToCompensate, -(entrySize - minSize));
        } else {
          sizeToCompensate = 0;
        }

        newSizing[entryKey] = newEntrySize;
        return !!sizeToCompensate;
      });
    }

    // Toggling column visibility OFF:
    // [first column to the left] gets all its size
    else {
      console.log(entries);
      const [entryKey, entrySize] = leftEntries.at(-1)!;
      newSizing[entryKey] = addF(entrySize, sizing[columnKey]);
    }

    setVisibility(newVisibility);
    setSizing(newSizing);

    saveTablesState({
      tableId,
      dataTypeKey,
      sizing: newSizing,
      visibility: newVisibility,
    });
  };

  return [visibility, onVisibilityChange];
};
