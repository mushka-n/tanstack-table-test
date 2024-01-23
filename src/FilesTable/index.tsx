import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { DSFileApiResponse, getFiles } from '@/api/files';
import Table from '@/components/Table';

const fetchSize = 100;

const FilesTable = () => {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage: isFetching,
  } = useInfiniteQuery<DSFileApiResponse>({
    queryKey: ['files-table-data', []],
    queryFn: async ({ pageParam }) =>
      getFiles((pageParam as number) * fetchSize, fetchSize),
    getNextPageParam: (_, allPages) => allPages.length,
    initialPageParam: 0,
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
      id={'table_my_documents'}
      view='row'
      dataTypeKey='file'
      data={flatData}
      dataTotalLength={totalDBRowCount}
      onBottomReached={onBottomReached}
    />
  );
};

export default FilesTable;
