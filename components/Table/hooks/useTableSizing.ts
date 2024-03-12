import { addF } from '@/utils/sumFloats';
import {
  ColumnSizingInfoState,
  ColumnSizingState,
  Updater,
} from '@tanstack/react-table';

import { useState } from 'react';
import { TABLE_MIN_SIZE_PCT as minSize } from '@/components/Table/constants';
import { getSavedTableSizing, saveTableState } from './useContentSavedState';
import {
  calculateColumnSizesSum,
  calculateMaxColumnSize,
  clampColumnSize,
  filterOutHiddenColumns,
  filterOutMinSizeColumns,
  findMaxEntry,
  findMinEntry,
  getTableWidthPx,
} from '../utils';
import { ContentSettings } from '../types/contentSettings';

export const useTableSizing = (
  tableId: string,
  settings: ContentSettings
): [
  ColumnSizingState,
  typeof setSizing,
  typeof onSizingChange,
  ColumnSizingInfoState,
  typeof onSizingInfoChange,
] => {
  const [sizing, setSizing] = useState<ColumnSizingState>(
    getSavedTableSizing(tableId, settings)
  );

  const [sizingInfo, setSizingInfo] = useState<ColumnSizingInfoState>({
    columnSizingStart: [],
    startOffset: null,
    startSize: null,
    deltaOffset: null,
    deltaPercentage: null,
    isResizingColumn: false,
  });

  const [oldSizingInfo, setOldSizingInfo] =
    useState<ColumnSizingInfoState>(sizingInfo);

  if (!settings.columns)
    return [sizing, setSizing, () => {}, sizingInfo, () => {}];

  //

  const onSizingInfoChange = (
    sizingInfoUpdater: Updater<ColumnSizingInfoState>
  ) => {
    setOldSizingInfo(sizingInfo);
    setSizingInfo(sizingInfoUpdater);
  };

  //

  const onSizingChange = () => {
    if (!sizingInfo.deltaOffset) return;

    const contentWidth = getTableWidthPx(tableId);

    const columnKey = sizingInfo.columnSizingStart[0][0];
    const columnIndex = Object.keys(sizing).indexOf(columnKey);

    const offsetGlobal = sizingInfo.deltaOffset || 0;
    const deltaGlobal = (offsetGlobal * 100) / contentWidth;

    const oldOffsetGlobal = oldSizingInfo.deltaOffset || 0;
    const oldDeltaGlobal = (oldOffsetGlobal * 100) / contentWidth;

    const delta = addF(deltaGlobal, -oldDeltaGlobal);

    const entries = Object.entries(sizing);
    const leftEntries = entries.slice(0, columnIndex);
    const rightEntries = entries.slice(columnIndex + 1);

    const maxSize = calculateMaxColumnSize(entries);

    const rawColumnSize = addF(sizing[columnKey], delta);
    const columnSize = clampColumnSize(rawColumnSize, maxSize);
    const newSizing = { ...sizing };
    newSizing[columnKey] = columnSize;

    const isMovingRight = oldDeltaGlobal < deltaGlobal;
    const isMovingLeft = oldDeltaGlobal > deltaGlobal;

    const isRightAligned = offsetGlobal > 0;
    const isLeftAligned = offsetGlobal < 0;

    // Moving separator RIGHT:
    // [first column to the right] with (width > minSize) gets smaller by [delta]
    if (isMovingRight && isRightAligned) {
      const validEntries = filterOutMinSizeColumns(rightEntries);
      console.log(validEntries);
      if (!validEntries.length) return;

      const adjustedEntry = validEntries[0];
      let adjustedEntrySize = addF(adjustedEntry[1], -delta);
      adjustedEntrySize = clampColumnSize(adjustedEntrySize, maxSize);
      newSizing[adjustedEntry[0]] = adjustedEntrySize;
    }

    // Moving separator LEFT by making current column smaller:
    // [first column to the right] gets bigger by [delta]
    else if ((isMovingLeft || isLeftAligned) && columnSize > minSize) {
      const validEntries = filterOutHiddenColumns(rightEntries);
      if (!validEntries.length) return;

      const adjustedEntry = validEntries[0];
      let adjustedEntrySize = addF(adjustedEntry[1], -delta);
      adjustedEntrySize = clampColumnSize(adjustedEntrySize, maxSize);
      newSizing[adjustedEntry[0]] = adjustedEntrySize;
    }

    // Moving separator LEFT by pushing other columns:
    // [last column to the left] with (size > minSize) gets smaller by [delta]
    // [first column to the right] gets bigger by [delta]
    else if (isMovingLeft && isLeftAligned && columnSize === minSize) {
      const validLeftEntries = filterOutMinSizeColumns(leftEntries);
      if (!validLeftEntries.length) return;

      const validRightEntries = filterOutHiddenColumns(rightEntries);
      if (!validRightEntries.length) return;

      const adjustedEntryLeft = validLeftEntries.at(-1)!;
      let newEntrySizeLeft = addF(adjustedEntryLeft[1], delta);
      newEntrySizeLeft = clampColumnSize(newEntrySizeLeft, maxSize);
      newSizing[adjustedEntryLeft[0]] = newEntrySizeLeft;

      const adjustedEntryRight = validRightEntries[0];
      let newEntrySizeRight = addF(adjustedEntryRight[1], -delta);
      newEntrySizeRight = clampColumnSize(newEntrySizeRight, maxSize);
      newSizing[adjustedEntryRight[0]] = newEntrySizeRight;
    }

    // Normalizes sizing if anything breaks (generally adds/removes 0.01-0.05)
    // (sometimes needed due to point addition and weird user cases, like moving cursor really fast)
    // May be removed later after overall sizing mechanism improvements, but works fine for now
    const newEntries = filterOutHiddenColumns(Object.entries(newSizing));
    const sizesSum = calculateColumnSizesSum(newEntries);
    if (sizesSum !== 100) {
      let entryToAdjust: [string, number] = [columnKey, columnSize];

      if (sizesSum < 100 && columnSize === maxSize)
        entryToAdjust = findMinEntry(newEntries);
      if (sizesSum > 100 && columnSize === minSize)
        entryToAdjust = findMaxEntry(newEntries);

      newSizing[entryToAdjust[0]] = addF(100, -sizesSum, entryToAdjust[1]);
    }

    setSizing(newSizing);
    saveTableState({ tableId, sizing: newSizing, settings });
  };

  //

  return [sizing, setSizing, onSizingChange, sizingInfo, onSizingInfoChange];
};
