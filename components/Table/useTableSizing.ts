import { throttle } from 'lodash';
import {
  ColumnSizingInfoState,
  ColumnSizingState,
  OnChangeFn,
  Updater,
} from '@tanstack/react-table';

import { AnyDataTypeKey } from './index.types';
import { useState } from 'react';
import { getDefaultSizing } from './index.constants';

const sumFloats = (a: number, b: number) => +(a + b).toFixed(12);

const minSize = 10;

export const useTableSizing = (
  tableId: string
): [
  ColumnSizingState,
  OnChangeFn<ColumnSizingState>,
  OnChangeFn<ColumnSizingInfoState>,
] => {
  const [sizing, setSizing] = useState<ColumnSizingState>({
    title: 20,
    createdBy: 0,
    created: 20,
    updated: 20,
    contentLength: 20,
    fileType: 20,
    contextBtn: 0,
  });

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
    const columnSize = sizingInfo.columnSizingStart[0][1];
    const columnIndex = Object.keys(sizing).indexOf(columnKey);

    const deltaOffset = sizingInfo.deltaOffset || 0;
    const delta = (deltaOffset * 100) / tableWidth;

    const oldDeltaOffset = oldSizingInfo.deltaOffset || 0;
    const oldDelta = (oldDeltaOffset * 100) / tableWidth;
    const deltaComp = sumFloats(delta, -oldDelta);

    const entries = Object.entries(sizing);
    const leftEntries = entries.slice(0, columnIndex);
    const rightEntries = entries.slice(columnIndex + 1);

    let newColumnSize = sumFloats(columnSize, delta);
    if (newColumnSize < minSize) newColumnSize = minSize;

    const maxColumnSize =
      100 -
      entries.reduce((acc, ent) => acc + (ent[1] && minSize), 0) +
      minSize;
    if (newColumnSize > maxColumnSize) return;
    if (delta > maxColumnSize - columnSize) return;

    const newSizing = { ...sizing };
    newSizing[columnKey] = newColumnSize;

    // Moving separator right:
    // leftmost column with width > minSize gets smaller by delta
    if (delta > 0 && oldDelta < delta) {
      const avialEntries = rightEntries.filter((ent) => ent[1] > minSize);
      if (!avialEntries.length) return;

      const compEntry = avialEntries[0];
      let compEntrySize = sumFloats(compEntry[1], -deltaComp);
      if (compEntrySize < minSize) compEntrySize = minSize;
      newSizing[compEntry[0]] = compEntrySize;
    }

    // Moving separator left, columnSize > minSize:
    // leftmost column to the right gets bigger by delta
    else if ((delta < 0 || oldDelta > delta) && newColumnSize > minSize) {
      const avialEntries = rightEntries.filter((ent) => ent[1] > 0);
      if (!avialEntries.length) return;

      const compEntry = avialEntries[0];
      let compEntrySize = sumFloats(compEntry[1], -deltaComp);
      if (compEntrySize < minSize) compEntrySize = minSize;
      newSizing[compEntry[0]] = compEntrySize;
    }

    // Moving separator left, columnSize <= minSize:
    // rightmost column to the left (with size > minSize) gets smaller by delta
    // leftmost column to the right gets bigger by delta
    else if (delta < 0 && oldDelta > delta && newColumnSize <= minSize) {
      const avialLeftEntries = leftEntries.filter((ent) => ent[1] > minSize);
      if (!avialLeftEntries.length) return;

      const compLeftEntry = avialLeftEntries.pop()!;
      let compLeftEntrySize = sumFloats(compLeftEntry[1], deltaComp);
      if (compLeftEntrySize < minSize) compLeftEntrySize = minSize;
      newSizing[compLeftEntry[0]] = compLeftEntrySize;

      const avialRightEntries = rightEntries.filter((ent) => ent[1] > 0);
      if (!avialRightEntries.length) return;

      const compRightEntry = avialRightEntries[0];
      let compRightEntrySize = sumFloats(compRightEntry[1], -deltaComp);
      if (compRightEntrySize < minSize) compRightEntrySize = minSize;
      newSizing[compRightEntry[0]] = compRightEntrySize;
    }

    const sumAll = entries.reduce((acc, entry) => acc + entry[1], 0);
    if (sumAll < 100) {
      const lastEntry = entries[entries.length - 2];
      newSizing[lastEntry[0]] = 100 + sumFloats(lastEntry[1], -sumAll);
    }

    setSizing(newSizing);
    console.log('sizing: ', sizing, '\n', 'sizingInfo: ', sizingInfo);
  };

  const setSizingInfoCustom = (
    sizingInfoUpdater: Updater<ColumnSizingInfoState>
  ) => {
    setOldSizingInfo(sizingInfo);
    setSizingInfo(sizingInfoUpdater);
  };

  return [sizing, onResize, setSizingInfoCustom];
};

const getTablesData = (): Record<string, Record<string, number>> | null => {
  const tablesDataLS = localStorage.getItem('tablesSizingData');
  if (!tablesDataLS) return null;
  return JSON.parse(tablesDataLS);
};

export const useGetTableSizes = (
  tableId: string,
  dataTypeKey: AnyDataTypeKey
): Record<string, number> | null => {
  const tablesData = getTablesData();

  if (!tablesData?.[tableId]) {
    return getDefaultSizing(dataTypeKey);
  }
  return tablesData[tableId];
};

export const saveTableSizes = throttle(
  (tableId: string, sizingState: ColumnSizingState) => {
    let tablesSizingData = getTablesData();

    if (!tablesSizingData) tablesSizingData = { [tableId]: sizingState };
    else tablesSizingData[tableId] = sizingState;

    localStorage.setItem('tablesSizingData', JSON.stringify(tablesSizingData));
  },
  500
);
