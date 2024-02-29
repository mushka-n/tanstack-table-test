import { useMemo } from 'react';
import { ContentSettings } from '../types/contentSettings';

const throwDefaultSizingErrorMessage = (tableId: string, message: string) => {
  throw new Error(
    `Invalid default column sizing in table '${tableId}'.\n` + message
  );
};

const useContentSettingsErrorCheck = (
  tableId: string,
  settings: ContentSettings
) => {
  useMemo(() => {
    if (!settings.availableViews.includes('table') || !('columns' in settings))
      return;

    // Check if column visibility and sizing are aligned
    settings.columns.forEach(({ id, size }) => {
      if (!size)
        throwDefaultSizingErrorMessage(tableId, `Column '${id}' has no size.`);
    });

    // Check if total size of visible columns is 100
    const totalSize = settings.columns.reduce(
      (acc, { isVisible, size }) =>
        acc + (isVisible === true || isVisible === undefined ? size : 0),
      0
    );
    if (totalSize !== 100) {
      throwDefaultSizingErrorMessage(
        tableId,
        `Total size of visible columns is ${totalSize}. It should always be equal to 100.`
      );
    }
  }, [tableId, settings]);
};

export default useContentSettingsErrorCheck;
