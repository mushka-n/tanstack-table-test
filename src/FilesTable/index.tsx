import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { DSFileApiResponse, getFiles } from '../../api/files';
import Table from '../../components/Table';

interface FilesTableProps {}

const fetchSize = 100;

const FilesTable = ({}: FilesTableProps) => {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage: isFetching,
  } = useInfiniteQuery<DSFileApiResponse>({
    queryKey: ['files-table-data', []],
    queryFn: async ({ pageParam = 0 }: { pageParam: number }) =>
      getFiles(pageParam * fetchSize, fetchSize),
    getNextPageParam: (_, allPages) => allPages.length,
    refetchOnWindowFocus: false,
  });

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data!) ?? [],
    [data]
  );

  const totalDBRowCount = data?.pages?.[0]?.total ?? 0;
  const totalFetched = flatData.length;

  const onBottomReached = useCallback(() => {
    if (totalFetched < totalDBRowCount && !isFetching) fetchNextPage();
  }, [fetchNextPage, isFetching, totalFetched, totalDBRowCount]);

  return (
    <Table
      id={'table_mydocuments'}
      dataTypeKey='file'
      data={flatData}
      onBottomReached={onBottomReached}
    />
  );
};

export default FilesTable;
