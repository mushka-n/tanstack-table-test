import { ContentSettings } from '../types/contentSettings';

export const getDefaultVisibility = (settings: ContentSettings) => {
  if (!settings.columns) return {};

  const result: { [key: string]: boolean } = {};
  settings.columns.forEach(
    ({ id, isVisible }) => (result[`${id}`] = isVisible ?? true)
  );
  return result;
};

export const getDefaultSizing = (settings: ContentSettings) => {
  if (!settings.columns) return {};

  const result: { [key: string]: number } = {};
  settings.columns.forEach(
    ({ id, isVisible, size }) =>
      (result[`${id}`] = size * (isVisible !== false ? 1 : -1))
  );
  return result;
};
