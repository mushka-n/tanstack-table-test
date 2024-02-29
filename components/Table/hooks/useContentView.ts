import { ChangeEvent, useEffect, useState } from 'react';
import { ContentAvailableViews } from '../types/contentSettings';
import { TABLE_ROW_THRESHOLD } from '../constants';

export const useContentView = <AV extends ContentAvailableViews>(
  defaultView: AV[number],
  contentWidth: number
): [AV[number], (e: ChangeEvent<HTMLInputElement>) => void] => {
  const [view, setView] = useState<AV[number]>(defaultView);
  const [isAutoRow, setIsAutoRow] = useState<boolean>(false);

  const onChangeView = (e: ChangeEvent<HTMLInputElement>) =>
    setView(e.target.value as AV[number]);

  useEffect(() => {
    if (view === 'table' && contentWidth < TABLE_ROW_THRESHOLD) {
      setView('row');
      setIsAutoRow(true);
      return;
    }
    if (view === 'row' && isAutoRow && contentWidth >= TABLE_ROW_THRESHOLD) {
      setView('table');
      setIsAutoRow(false);
    }
  }, [view, isAutoRow, contentWidth]);

  return [view, onChangeView];
};
