import { ColumnDef } from '@tanstack/react-table';
import { AnyDataTypeKey, DataTypeByKey } from '.';
import { contentDefsMap } from '../settings';

export type ContentView = 'table' | 'row' | 'tile';
export type ContentAvailableViews = [ContentView, ...ContentView[]];

//

type ExtractContentDefIds<CV> = CV extends { id: infer I }[] ? I : never;
export type ContentDefIds<
  DTK extends AnyDataTypeKey = AnyDataTypeKey,
  V extends ContentView = ContentView,
> = V extends keyof (typeof contentDefsMap)[DTK]
  ? ExtractContentDefIds<(typeof contentDefsMap)[DTK][V]>
  : never;

//

export type ContentSettings<
  DTK extends AnyDataTypeKey = AnyDataTypeKey,
  AV extends ContentAvailableViews = ContentAvailableViews,
> = {
  availableViews: AV;
  defaultView: AV[number];
} & ('table' extends AV[number]
  ? {
      columns: {
        id: ContentDefIds<DTK, 'table'>;
        isVisible?: boolean;
        size: number;
      }[];
    }
  : object) &
  ('row' extends AV[number] ? { row: ContentDefIds<DTK, 'row'> } : object) &
  ('tile' extends AV[number] ? { tile: ContentDefIds<DTK, 'tile'> } : object);

//

export type ContentDef<DT, C> = {
  id: string;
} & ColumnDef<DT, C>;

export type ContentDefs<
  DTK extends AnyDataTypeKey = AnyDataTypeKey,
  AV extends ContentAvailableViews = ContentAvailableViews,
> = ('table' extends AV[number]
  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { table: ContentDef<DataTypeByKey<DTK>, any>[] }
  : object) &
  ('row' extends AV[number]
    ? { row: ContentDef<DataTypeByKey<DTK>, DataTypeByKey<DTK>>[] }
    : object) &
  ('tile' extends AV[number]
    ? { tile: ContentDef<DataTypeByKey<DTK>, DataTypeByKey<DTK>>[] }
    : object);
