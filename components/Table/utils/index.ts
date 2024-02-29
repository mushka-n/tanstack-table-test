import { addF } from '@/utils/sumFloats';
import { TABLE_MIN_SIZE_PCT } from '../constants';

export const getTableWidthPx = (tableId: string) => {
  return document.getElementById(tableId)!.getBoundingClientRect().width;
};

export const clampColumnSize = (value: number, max: number) => {
  return Math.max(TABLE_MIN_SIZE_PCT, Math.min(max, value));
};

export const findMinEntry = (entries: [string, number][]) => {
  return entries.reduce(
    (minEntry, currEntry) =>
      currEntry[1] < minEntry[1] ? currEntry : minEntry,
    entries[0]
  );
};

export const findMaxEntry = (entries: [string, number][]) => {
  return entries.reduce(
    (maxEntry, currEntry) =>
      currEntry[1] > maxEntry[1] ? currEntry : maxEntry,
    entries[0]
  );
};

export const calculateMaxColumnSize = (entries: [string, number][]) => {
  const visibleEntries = filterOutHiddenColumns(entries);
  return 100 - (visibleEntries.length - 1) * TABLE_MIN_SIZE_PCT;
};

export const calculateColumnSizesSum = (entries: [string, number][]) => {
  return entries.reduce((a, [, size]) => addF(a, size), 0);
};

export const filterOutHiddenColumns = (entries: [string, number][]) => {
  return entries.filter(([, size]) => size > 0);
};

export const filterOutMinSizeColumns = (entries: [string, number][]) => {
  return entries.filter(([, size]) => size > TABLE_MIN_SIZE_PCT);
};
