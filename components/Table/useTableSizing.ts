import { sumFloats } from './../../utils/sumFloats';
import { throttle } from 'lodash';
import {
  ColumnSizingInfoState,
  ColumnSizingState,
  Updater,
} from '@tanstack/react-table';

import { AnyDataTypeKey } from './index.types';
import { useState } from 'react';
import { TABLE_MIN_SIZE as minSize, getDefaultSizing } from './index.constants';

export const useTableSizing = (
  tableId: string,
  dataTypeKey: AnyDataTypeKey
): [
  ColumnSizingState,
  typeof setSizing,
  typeof onSizingChange,
  ColumnSizingInfoState,
  typeof setSizingInfoCustom,
] => {
  const [sizing, setSizing] = useState<ColumnSizingState>(
    getTableSizing(tableId, dataTypeKey)
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

  const onSizingChange = () => {
    if (!sizingInfo.deltaOffset) return;

    const tableWidth = document
      .getElementById(tableId)!
      .getBoundingClientRect().width;

    const columnKey = sizingInfo.columnSizingStart[0][0];
    const columnIndex = Object.keys(sizing).indexOf(columnKey);

    const offsetGlobal = sizingInfo.deltaOffset || 0;
    const deltaGlobal = (offsetGlobal * 100) / tableWidth;

    const oldOffsetGlobal = oldSizingInfo.deltaOffset || 0;
    const oldDeltaGlobal = (oldOffsetGlobal * 100) / tableWidth;

    const delta = sumFloats(deltaGlobal, -oldDeltaGlobal);

    const entries = Object.entries(sizing);
    const leftEntries = entries.slice(0, columnIndex);
    const rightEntries = entries.slice(columnIndex + 1);

    const maxSize =
      100 +
      minSize -
      entries.reduce((acc, [, size]) => acc + (size > 0 ? minSize : 0), 0);

    const rawColumnSize = sumFloats(sizing[columnKey], delta);
    const columnSize = Math.max(minSize, Math.min(maxSize, rawColumnSize));
    const newSizing = { ...sizing };
    newSizing[columnKey] = columnSize;

    // Moving separator RIGHT:
    // [first column to the right] with (width > minSize) gets smaller by [delta]
    if (offsetGlobal > 0 && oldDeltaGlobal < deltaGlobal) {
      const avialEntries = rightEntries.filter(([, size]) => size > minSize);
      if (!avialEntries.length) return;

      const compensativeEntry = avialEntries[0];
      let compensation = sumFloats(compensativeEntry[1], -delta);
      if (compensation < minSize) compensation = minSize;
      newSizing[compensativeEntry[0]] = compensation;
    }

    // Moving separator LEFT by making current column smaller:
    // [first column to the right] gets bigger by [delta]
    else if (
      (offsetGlobal < 0 || oldDeltaGlobal > deltaGlobal) &&
      columnSize > minSize
    ) {
      const avialEntries = rightEntries.filter(([, size]) => size > 0);
      if (!avialEntries.length) return;

      const compensativeEntry = avialEntries[0];
      let compensation = sumFloats(compensativeEntry[1], -delta);
      if (compensation > maxSize) compensation = maxSize;
      newSizing[compensativeEntry[0]] = compensation;
    }

    // Moving separator LEFT by pushing other columns:
    // [last column to the left] with (size > minSize) gets smaller by [delta]
    // [first column to the right] gets bigger by [delta]
    else if (
      offsetGlobal < 0 &&
      oldDeltaGlobal > deltaGlobal &&
      columnSize === minSize
    ) {
      const avialLeftEntries = leftEntries.filter(([, size]) => size > minSize);
      if (!avialLeftEntries.length) return;

      const avialRightEntries = rightEntries.filter(([, size]) => size > 0);
      if (!avialRightEntries.length) return;

      const compensativeEntryLeft = avialLeftEntries.pop()!;
      let compensationLeft = sumFloats(compensativeEntryLeft[1], delta);
      if (compensationLeft < minSize) compensationLeft = minSize;
      newSizing[compensativeEntryLeft[0]] = compensationLeft;

      const compensativeEntryRight = avialRightEntries[0];
      let compensationRight = sumFloats(compensativeEntryRight[1], -delta);
      if (compensationRight < minSize) compensationRight = minSize;
      newSizing[compensativeEntryRight[0]] = compensationRight;
    }

    // Normalizes sizing if anything breaks (generally adds/removes 0.01-0.05)
    // (sometimes needed due to point addition and weird user cases, like moving cursor really fast)
    // May be removed later after overall sizing mechanism imporvements, but this works fine for now
    const newEntries = Object.entries(newSizing).filter(([, size]) => size > 0);
    const sumAll = newEntries.reduce(
      (acc, [, size]) => sumFloats(acc, size),
      0
    );

    if (sumAll !== 100) {
      let entryToNormalize: [string, number] = [columnKey, columnSize];
      if (sumAll < 100 && columnSize === maxSize)
        entryToNormalize = newEntries.reduce(
          (min, entry) => (entry[1] < min[1] ? entry : min),
          newEntries[0]
        );
      else if (sumAll > 100 && columnSize === minSize)
        entryToNormalize = newEntries.reduce(
          (max, entry) => (entry[1] > max[1] ? entry : max),
          newEntries[0]
        );
      newSizing[entryToNormalize[0]] = sumFloats(
        100,
        entryToNormalize[1],
        -sumAll
      );
    }

    setSizing(newSizing);
    saveTableSizing(tableId, newSizing);
  };

  const setSizingInfoCustom = (
    sizingInfoUpdater: Updater<ColumnSizingInfoState>
  ) => {
    setOldSizingInfo(sizingInfo);
    setSizingInfo(sizingInfoUpdater);
  };

  return [sizing, setSizing, onSizingChange, sizingInfo, setSizingInfoCustom];
};

export const getTableSizing = (
  tableId: string,
  dataTypeKey: AnyDataTypeKey
): ColumnSizingState => {
  const tablesDataLS = localStorage.getItem('tablesSizingData');
  const tablesData = tablesDataLS && JSON.parse(tablesDataLS);

  if (!tablesData?.[tableId]) return getDefaultSizing(dataTypeKey);
  return tablesData[tableId];
};

export const saveTableSizing = (tableId: string, sizing: ColumnSizingState) => {
  throttle(() => {
    const tablesDataLS = localStorage.getItem('tablesSizingData');
    const tablesData = tablesDataLS && JSON.parse(tablesDataLS);

    let newTablesData = tablesData;
    if (!tablesData) newTablesData = { [tableId]: sizing };
    else newTablesData[tableId] = sizing;

    localStorage.setItem('tablesSizingData', JSON.stringify(newTablesData));
  }, 1000)();
};
