import { ContentSettings } from '../settings';
import { AnyDataTypeKey } from '../types';

export const getDefaultVisibility = (dataTypeKey: AnyDataTypeKey) => {
  const contentSettings = ContentSettings[dataTypeKey];
  const columnData = contentSettings.views.table.columns as {
    id: string;
    isDefaultVisible: boolean;
  }[];

  const result: { [key: string]: boolean } = {};
  columnData.forEach(
    ({ id, isDefaultVisible }) => (result[id!] = isDefaultVisible)
  );
  return result;
};

export const getDefaultSizing = (dataTypeKey: AnyDataTypeKey) => {
  const contentSettings = ContentSettings[dataTypeKey];
  const columnData = contentSettings.views.table.columns as {
    id: string;
    defaultSize: number;
  }[];

  const result: { [key: string]: number } = {};
  columnData.forEach(({ id, defaultSize }) => (result[id!] = defaultSize));
  return result;
};
