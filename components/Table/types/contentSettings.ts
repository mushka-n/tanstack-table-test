import { ContentDefIds } from './../constants/contentDefIds';
import { ColumnDef } from '@tanstack/react-table';
import { AnyDataTypeKey, DataTypeByKey, AnyDataType } from '.';
import { ContentViews } from '../settings';

// Default Settings

export type ContentView = 'table' | 'row' | 'tile';

export type DefaultContentSettingsMap = {
  [DTK in AnyDataTypeKey]: ContentSettings<DTK>;
};

export type ContentSettings<DTK extends AnyDataTypeKey> = {
  availableViews: ('table' | 'row' | 'tile')[];
  defaultView: 'table' | 'row' | 'tile';
  columns?: ColumnSettingsByKey<DTK>[];
  row?: RowIdsByKey<DTK>;
  tile?: TileIdsByKey<DTK>;
};
// | {
//     availableViews: ['table'];
//     defaultView: 'table';
//     columns: ColumnSettingsByKey<DTK>[];
//     row: RowIdsByKey<DTK>;
//   }
// | {
//     availableViews: ['row'];
//     defaultView: 'row';
//     row: RowIdsByKey<DTK>;
//   }
// | {
//     availableViews: ['tile'];
//     defaultView: 'tile';
//     tile: TileIdsByKey<DTK>;
//   }
// | {
//     availableViews: ['table', 'row'];
//     defaultView: 'table' | 'row';
//     columns: ColumnSettingsByKey<DTK>[];
//     row: RowIdsByKey<DTK>;
//   }
// | {
//     availableViews: ['row', 'tile'];
//     defaultView: 'row' | 'tile';
//     row: RowIdsByKey<DTK>;
//     tile: TileIdsByKey<DTK>;
//   }
// | {
//     availableViews: ['table', 'tile'];
//     defaultView: 'table' | 'tile';
//     columns: ColumnSettingsByKey<DTK>[];
//     tile: TileIdsByKey<DTK>;
//   }
// | {
//     availableViews: ['table', 'row', 'tile'];
//     defaultView: 'table' | 'row' | 'tile';
//     columns: ColumnSettingsByKey<DTK>[];
//     row: RowIdsByKey<DTK>;
//     tile: TileIdsByKey<DTK>;
//   };

export type ColumnSettingsByKey<DTK extends AnyDataTypeKey> = {
  id: ColumnIdsByKey<DTK>;
  isVisible?: boolean;
  size?: number;
};

export type ColumnIdsByKey<DTK extends AnyDataTypeKey> = ValuesOf<
  (typeof ContentDefIds)[DTK]['columns']
>;

export type RowIdsByKey<DTK extends AnyDataTypeKey> = ValuesOf<
  (typeof ContentDefIds)[DTK]['rows']
>;

export type TileIdsByKey<DTK extends AnyDataTypeKey> = ValuesOf<
  (typeof ContentDefIds)[DTK]['tiles']
>;

// Content Views

export type ContentViewsMap = {
  [DTK in AnyDataTypeKey]: ContentViews<DataTypeByKey<DTK>>;
};

export type ContentViews<DT extends AnyDataType> = {
  table: ColumnDef<DT, unknown>[];
  row: ColumnDef<DT, DT>[];
  tile: ColumnDef<DT, DT>[];
};

// Generics

type ValuesOf<T> = T[keyof T];
