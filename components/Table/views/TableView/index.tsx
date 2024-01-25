import { Header, Row } from '@tanstack/react-table';
import TableHeader from './Header';
import TableBody from './Body';
import { AnyDataTypeKey, DataTypeByKey } from '../../types';

interface TableViewProps<DTK extends AnyDataTypeKey> {
  dataTypeKey: DTK;
  containerRef: React.RefObject<HTMLDivElement>;
  contentWidth: number;

  headers: Header<DataTypeByKey<DTK>, unknown>[];
  rows: Row<DataTypeByKey<DTK>>[];

  sizing: Record<string, number>;
  dataTotalLength?: number;
}

const TableView = <DTK extends AnyDataTypeKey>({
  dataTypeKey,
  contentWidth,

  headers,
  rows,

  sizing,
  containerRef,
  dataTotalLength,
}: TableViewProps<DTK>) => {
  return (
    <>
      <TableHeader
        contentWidth={contentWidth}
        headers={headers as Header<unknown, unknown>[]}
        sizing={sizing}
      />
      <TableBody
        dataTypeKey={dataTypeKey}
        containerRef={containerRef}
        rows={rows}
        dataTotalLength={dataTotalLength}
      />
    </>
  );
};

export default TableView;
