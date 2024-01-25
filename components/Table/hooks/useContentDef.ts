import { ColumnDef } from '@tanstack/react-table';
import { AnyDataTypeKey, DataTypeByKey } from '@/components/Table/types';
import { ContentSettings } from '../settings';

type ContentDef<DTK extends AnyDataTypeKey> = ColumnDef<
  DataTypeByKey<DTK>,
  unknown
>[];

export const useContentDef = <DTK extends AnyDataTypeKey>(
  dataTypeKey: DTK,
  view: 'row' | 'table' | 'tile'
): ContentDef<DTK> => {
  const contentSettings =
    ContentSettings[dataTypeKey as keyof typeof ContentSettings];

  switch (view) {
    case 'table':
      return contentSettings.views.table.columns as ContentDef<DTK>;
    case 'row':
      return contentSettings.views.row as ContentDef<DTK>;
    case 'tile':
      return contentSettings.views.tile as ContentDef<DTK>;
  }
};
