import { throttle } from 'lodash';
import { HeaderGroup } from '@tanstack/react-table';

import { AnyItemType } from './types';

const getTablesData = () => {
  const tablesDataLS = localStorage.getItem('tablesData');

  if (!tablesDataLS) return null;
  return JSON.parse(tablesDataLS);
};

export const useGetTableSizes = (tableId: string) => {
  const tablesData = getTablesData();

  if (!tablesData || !tablesData[tableId]) return null;
  return tablesData[tableId];
};

export const useSaveTableSizes = throttle(
  (tableId: string, headerGroup: HeaderGroup<AnyItemType>) => {
    let tablesData = getTablesData();
    if (!tablesData) tablesData = { [tableId]: {} };

    headerGroup.headers.forEach(
      (header) => (tablesData[tableId][header.id] = header.getSize() || 120)
    );

    localStorage.setItem('tablesData', JSON.stringify(tablesData));
  },
  500
);
