import { Context, createContext } from 'react';
import { AnyDataTypeKey, DataTypeByKey } from '../types';
import {
  Table,
  ColumnSizingState,
  VisibilityState,
} from '@tanstack/react-table';

type ContentContextValue<DTK extends AnyDataTypeKey> = null | {
  dataTypeKey: DTK;
  contentWidth: number;
  table: Table<DataTypeByKey<DTK>>;
  containerRef: React.RefObject<HTMLDivElement>;
  tableState: { sizing: ColumnSizingState; visibility: VisibilityState };
};

const ContentContext: Context<ContentContextValue<AnyDataTypeKey>> =
  createContext<ContentContextValue<AnyDataTypeKey>>(null);

export default ContentContext;
