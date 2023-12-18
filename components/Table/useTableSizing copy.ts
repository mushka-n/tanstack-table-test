import { throttle } from 'lodash';
import {
  ColumnSizingInfoState,
  ColumnSizingState,
  OnChangeFn,
  Updater,
} from '@tanstack/react-table';

import { AnyDataTypeKey } from './index.types';
import { useState } from 'react';
import { getAccessorKeys, getDefaultSizing } from './index.constants';
import { onGetColumnVisibility } from './useColumnVisibility';

function getMaxSizing(array: [string, number][]) {
  if (!array.length) return null;
  let minEntry = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i][1] > minEntry[1]) minEntry = array[i];
  }
  return minEntry;
}

export const useTableSizing = (
  tableId: string,
  dataTypeKey: AnyDataTypeKey
): [
  ColumnSizingState,
  OnChangeFn<ColumnSizingState>,
  ColumnSizingInfoState,
  OnChangeFn<ColumnSizingInfoState>,
] => {
  const [sizing, setSizing] = useState<ColumnSizingState>(
    useGetTableSizes(tableId, dataTypeKey)!
  );

  const [sizingInfo, setSizingInfo] = useState<ColumnSizingInfoState>({
    startOffset: null,
    startSize: null,
    deltaOffset: null,
    deltaPercentage: null,
    isResizingColumn: false,
    columnSizingStart: [],
  });

  const [startSizing, setStartSizing] = useState(sizing);

  const [oldSizingInfo, setOldSizingInfo] =
    useState<ColumnSizingInfoState>(sizingInfo);

  const setSizingCustom = () => {
    const visibility = onGetColumnVisibility(tableId, dataTypeKey);
    const sortedAccKeys = getAccessorKeys(dataTypeKey).filter(
      (accKeys) => visibility[accKeys]
    );

    const tableWidth = document
      .getElementById(tableId)!
      .getBoundingClientRect().width;

    const columnKey = sizingInfo.columnSizingStart[0][0];
    const columnSize = sizingInfo.columnSizingStart[0][1];
    const columnIndex = sortedAccKeys.indexOf(columnKey);

    const deltaOffset = sizingInfo.deltaOffset || 0;
    const deltaPercentage = (deltaOffset * 100) / tableWidth;

    if (deltaPercentage > 50 - columnSize) return;
    console.log(deltaPercentage);

    const isMovingRight = deltaOffset > 0;

    if (deltaOffset === 0) return;
    // if (deltaOffset > 0 && columnSize >= 50) return;

    const oldDeltaOffset = oldSizingInfo.deltaOffset || 0;
    const oldDeltaPercentage = (oldDeltaOffset * 100) / tableWidth;

    const sizingEntries = Object.entries(sizing)
      .sort((a, b) => sortedAccKeys.indexOf(a[0]) - sortedAccKeys.indexOf(b[0]))
      .filter((entry) => [entry[1] !== 0]);

    console.log(sizingEntries);

    const leftEntries = sizingEntries.slice(0, columnIndex);
    const rightEntries = sizingEntries.slice(columnIndex + 1);

    const sumAll = sizingEntries.reduce((acc, entry) => acc + entry[1], 0);
    const sumLeft = leftEntries.reduce((acc, entry) => acc + entry[1], 0);
    const sumRight = rightEntries.reduce((acc, entry) => acc + entry[1], 0);

    const newSizingState = {
      ...sizing,
      [columnKey]: columnSize + deltaPercentage,
    };

    if (isMovingRight) {
      const avialableEntries = rightEntries.filter((entry) => entry[1] > 10);
      console.log(avialableEntries);
      if (!avialableEntries.length) return;
      const compensatingEntry = avialableEntries[0];
      console.log('column', columnKey, 'toChange', compensatingEntry[0]);
      newSizingState[compensatingEntry[0]] =
        compensatingEntry[1] - (deltaPercentage - oldDeltaPercentage);
    } else {
      if (columnSize > 10) {
        const compensatingEntry = rightEntries[0];
        console.log('column', columnKey, 'toChange', compensatingEntry[0]);
        newSizingState[compensatingEntry[0]] =
          compensatingEntry[1] + (deltaPercentage - oldDeltaPercentage);
      } else {
        const avialableLeftEntries = leftEntries.filter(
          (entry) => entry[1] > 10
        );
        if (!avialableLeftEntries.length) return;

        const compensatingLeftEntry = avialableLeftEntries[0];
        const compensatingRightEntry = rightEntries[0];

        console.log(
          'column',
          columnKey,
          'toChangeLeft',
          compensatingLeftEntry[0],
          'toChangeRight',
          compensatingRightEntry[0]
        );
        newSizingState[compensatingLeftEntry[0]] =
          compensatingLeftEntry[1] + (deltaPercentage - oldDeltaPercentage);
        newSizingState[compensatingRightEntry[0]] =
          compensatingRightEntry[1] - (deltaPercentage - oldDeltaPercentage);
      }
    }

    // if (isMovingRight && sumAll >= 100 && sumRight <= rightEntries.length * 10)
    //   return;
    // if (!isMovingRight && sumLeft <= leftEntries.length * 10) return;

    // const toChangeEntry = getMaxSizing(
    //   isMovingRight ? rightEntries : leftEntries
    // );

    // let toChangeColumn = {};
    // if (toChangeEntry) {
    //   console.log('column', columnKey, 'toChange', toChangeEntry[0]);
    //   let newToChangeValue = toChangeEntry[1];
    //   newToChangeValue = isMovingRight
    //     ? newToChangeValue - 0.2
    //     : newToChangeValue - 0.2;
    //   if (newToChangeValue > 50) newToChangeValue = 50;
    //   if (newToChangeValue < 10) newToChangeValue = 10;
    //   toChangeColumn = { [toChangeEntry[0]]: newToChangeValue };
    // }

    // const [lastEntry] = sizingEntries.slice(-1);
    // const lastColumn = {
    //   [lastEntry[0]]: lastEntry[1] + (100 - sumAll > 0 ? 100 - sumAll : 0),
    // };
    // console.log(lastColumn);

    // console.log('startSizing', startSizing);
    // console.log('newSizing', newSizingState);
    setSizing(newSizingState);
    saveTableSizes(tableId, newSizingState);

    // console.log(sumAll);
    // console.log(sizing);
    // console.log(sizingInfo);
    console.log('----------------------------------------');
  };

  const setSizingInfoCustom = (
    sizingInfoUpdater: Updater<ColumnSizingInfoState>
  ) => {
    setStartSizing(sizing);
    setOldSizingInfo(sizingInfo);
    setSizingInfo(sizingInfoUpdater);
  };

  return [sizing, setSizing, sizingInfo, setSizingInfoCustom];
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
