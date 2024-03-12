import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { DSFileApiResponse, getFiles } from '@/api/files';
import Content from '@/components/Table';

const fetchSize = 100;

const TrashFilesContent = () => {
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
    <>
      <Content
        id='content_trash'
        dataTypeKey='file'
        data={flatData}
        onBottomReached={onBottomReached}
        settings={{
          availableViews: ['table', 'tile', 'row'],
          defaultView: 'table',
          columns: [
            { id: 'file-title', size: 40 },
            { id: 'file-room', size: 20 },
            { id: 'file-author', size: 20 },
            { id: 'file-dateCreated', size: 15, isVisible: false },
            { id: 'file-dateErasure', size: 20 },
            { id: 'file-size', size: 15, isVisible: false },
            { id: 'file-type', size: 15, isVisible: false },
          ],
          row: 'file-row-default',
          tile: 'file-tile-default',
        }}
      />
    </>
  );
};

export default TrashFilesContent;
