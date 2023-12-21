import { throttle } from 'lodash';
import {
  ColumnSizingInfoState,
  ColumnSizingState,
  OnChangeFn,
  Updater,
} from '@tanstack/react-table';

import { AnyDataTypeKey } from './index.types';
import { useState } from 'react';
import { TABLE_MIN_SIZE, getDefaultSizing } from './index.constants';

const sumFloats = (a: number, b: number) => +(a + b).toFixed(12);

const minSize = TABLE_MIN_SIZE;

export const useTableSizing = (
  tableId: string,
  dataTypeKey: AnyDataTypeKey
): [
  ColumnSizingState,
  OnChangeFn<ColumnSizingState>,
  OnChangeFn<ColumnSizingInfoState>,
] => {
  const [sizing, setSizing] = useState<ColumnSizingState>(
    getTableSizing(tableId, dataTypeKey)
    // {
    //   title: 20,
    //   created: 20,
    //   updated: 20,
    //   contentLength: 20,
    //   fileType: 20,
    //   contextBtn: 0,
    // }
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

  const onResize = () => {
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
      entries.reduce((acc, ent) => acc + (ent[1] && minSize), 0);

    let newColumnSize = sumFloats(sizing[columnKey], delta);
    if (newColumnSize < minSize) newColumnSize = minSize;
    if (newColumnSize > maxSize) newColumnSize = maxSize;

    const newSizing = { ...sizing };
    newSizing[columnKey] = newColumnSize;

    // Moving separator right:
    // leftmost column with width > minSize gets smaller by delta
    if (offsetGlobal > 0 && oldDeltaGlobal < deltaGlobal) {
      const avialEntries = rightEntries.filter((ent) => ent[1] > minSize);
      if (!avialEntries.length) return;

      const compEntry = avialEntries[0];
      let compEntrySize = sumFloats(compEntry[1], -delta);
      if (compEntrySize < minSize) compEntrySize = minSize;
      newSizing[compEntry[0]] = compEntrySize;
    }

    // Moving separator left:
    // leftmost column to the right gets bigger by delta
    else if (
      (offsetGlobal < 0 || oldDeltaGlobal > deltaGlobal) &&
      newColumnSize > minSize
    ) {
      const avialEntries = rightEntries.filter((ent) => ent[1] > 0);
      if (!avialEntries.length) return;

      const compEntry = avialEntries[0];
      let compEntrySize = sumFloats(compEntry[1], -delta);
      if (compEntrySize > maxSize) compEntrySize = maxSize;
      newSizing[compEntry[0]] = compEntrySize;
    }

    // Moving separator left and pushing other columns with it:
    // rightmost column to the left (with size > minSize) gets smaller by delta
    // leftmost column to the right gets bigger by delta
    else if (
      offsetGlobal < 0 &&
      oldDeltaGlobal > deltaGlobal &&
      newColumnSize <= minSize
    ) {
      const avialLeftEntries = leftEntries.filter((ent) => ent[1] > minSize);
      if (!avialLeftEntries.length) return;

      const avialRightEntries = rightEntries.filter((ent) => ent[1] > 0);
      if (!avialRightEntries.length) return;

      const compLeftEntry = avialLeftEntries.pop()!;
      let compLeftEntrySize = sumFloats(compLeftEntry[1], delta);
      if (compLeftEntrySize < minSize) compLeftEntrySize = minSize;
      newSizing[compLeftEntry[0]] = compLeftEntrySize;

      const compRightEntry = avialRightEntries[0];
      let compRightEntrySize = sumFloats(compRightEntry[1], -delta);
      if (compRightEntrySize < minSize) compRightEntrySize = minSize;
      newSizing[compRightEntry[0]] = compRightEntrySize;
    }

    // If anything breaks and sum of all sizes differs from 100 normalizes it
    const newEntries = Object.entries(newSizing);
    const sumAll = newEntries.reduce((acc, entry) => acc + entry[1], 0);
    if (sumAll < 100) {
      const lastEntry = newEntries[newEntries.length - 2];
      newSizing[lastEntry[0]] = 100 + sumFloats(lastEntry[1], -sumAll);
    } else if (sumAll > 100) {
      const maxEntry = newEntries.reduce(
        (max, entry) => (entry[1] > max[1] ? entry : max),
        newEntries[0]
      );
      newSizing[maxEntry[0]] = 100 + sumFloats(maxEntry[1], -sumAll);
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

  return [sizing, onResize, setSizingInfoCustom];
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

export const saveTableSizing = (
  tableId: string,
  sizingState: ColumnSizingState
) => {
  throttle(() => {
    const tablesDataLS = localStorage.getItem('tablesSizingData');
    let tablesData = tablesDataLS && JSON.parse(tablesDataLS);
    if (!tablesData) tablesData = { [tableId]: sizingState };
    else tablesData[tableId] = sizingState;
    localStorage.setItem('tablesSizingData', JSON.stringify(tablesData));
  }, 1000)();
};
