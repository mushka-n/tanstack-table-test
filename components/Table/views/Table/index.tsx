import { Header, Row } from '@tanstack/react-table';
import TableHeader from './Header';
import TableBody from './Body';
import { AnyDataTypeKey, DataTypeByKey } from '../../types';

interface TableViewProps<DTK extends AnyDataTypeKey> {
  dataTypeKey: DTK;
  containerRef: React.RefObject<HTMLDivElement>;
  tableWidth: number;

  headers: Header<DataTypeByKey<DTK>, unknown>[];
  rows: Row<DataTypeByKey<DTK>>[];

  sizing: Record<string, number>;
  dataTotalLength?: number;
}

const TableView = <DTK extends AnyDataTypeKey>({
  dataTypeKey,
  tableWidth,

  headers,
  rows,

  sizing,
  containerRef,
  dataTotalLength,
}: TableViewProps<DTK>) => {
  return (
    <>
      <TableHeader tableWidth={tableWidth} headers={headers} sizing={sizing} />
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
