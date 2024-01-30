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
    queryKey: ['files-data', []],
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
      dataTypeKey='file'
      data={flatData}
      defaultView='table'
      onBottomReached={onBottomReached}
      settings={{
        availableViews: ['table', 'row', 'tile'],
        defaultView: 'table',
        columns: [
          { id: 'file-column-title', isVisible: true, size: 50 },
          { id: 'file-column-room', isVisible: true, size: 50 },
          { id: 'file-column-author', isVisible: false, size: -15 },
        ],
        row: 'file-row-default',
        tile: 'file-tile-default',
      }}

      // settingsFn={(defaultSettings) => ({
      //   ...defaultSettings,
      //   columns: [
      //     ...defaultSettings.columns,
      //     { id: 'file-column-room', isVisible: true, size: 15 },
      //     { id: 'file-column-author', isVisible: false, size: -15 },
      //   ],
      //   tile: 'file-tile-default',
      // })}
    />
  );
};

export default FilesTable;
