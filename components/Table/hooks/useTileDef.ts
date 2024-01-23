import { ColumnDef } from '@tanstack/react-table';
import { AnyDataTypeKey, DataTypeByKey } from '@/components/Table/types';
import Tiles from '@/components/Table/views/Tile/Tiles';

type useTileDefResult<DTK extends AnyDataTypeKey> = ColumnDef<
  DataTypeByKey<DTK>,
  never
>[];

export const useTileDef = <DTK extends AnyDataTypeKey>(
  dataTypeKey: DTK
): useTileDefResult<DTK> | null => {
  switch (dataTypeKey) {
    case 'file':
      return [Tiles.FileTile()] as unknown as useTileDefResult<DTK>;
    case 'user':
      return [Tiles.UserTile()] as unknown as useTileDefResult<DTK>;
    default:
      return null;
  }
};
