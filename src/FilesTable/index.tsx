import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { DSFileApiResponse, getFiles } from '@/api/files';
import Content from '@/components/Table';

const fetchSize = 100;

const FilesContent = () => {
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
        id='content_my-documents'
        dataTypeKey='file'
        data={flatData}
        onBottomReached={onBottomReached}
        settings={{
          availableViews: ['table', 'tile', 'row'],
          defaultView: 'table',
          columns: [
            { id: 'file-column-title', size: 80 },
            { id: 'file-column-room', isVisible: false, size: 35 },
            { id: 'file-column-author', isVisible: false, size: 15 },
            { id: 'file-column-dateUpdated', size: 20 },
          ],
          row: 'file-row-default',
          tile: 'file-tile-default',
        }}
      />
    </>
  );
};

export default FilesContent;
