import { AnyDataTypeKey } from '../types';
import { ContentSettings } from '../types/contentSettings';

export const getDefaultVisibility = (
  settings: ContentSettings<AnyDataTypeKey>
) => {
  if (!settings.columns) {
    console.error(
      'Default visibility could not be computed.',
      'Content Settings doesn`t have "columns" property.'
    );
    return {};
  }

  const result: { [key: string]: boolean } = {};
  settings.columns.forEach(
    ({ id, isVisible }) => (result[`${id}`] = isVisible ?? true)
  );
  return result;
};

export const getDefaultSizing = (settings: ContentSettings<AnyDataTypeKey>) => {
  if (!settings.columns) {
    console.error(
      'Default sizing could not be computed.',
      'ContentSettings doesn`t have "columns" property.'
    );
    return {};
  }

  const result: { [key: string]: number } = {};
  settings.columns.forEach(({ id, size }) => (result[`${id}`] = size || 10));
  return result;
};
