import { useCallback, useMemo } from 'react';
import Content from '@/components/Table';
import { DSUserApiResponse, getUsers } from '@/api/accounts/people';
import { useInfiniteQuery } from '@tanstack/react-query';
const fetchSize = 100;

const UsersContent = () => {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage: isFetching,
  } = useInfiniteQuery<DSUserApiResponse>({
    queryKey: ['users-data', []],
    queryFn: async ({ pageParam }) =>
      getUsers((pageParam as number) * fetchSize, fetchSize),
    getNextPageParam: (_, allPages) => allPages.length,
    initialPageParam: 0,
    refetchOnWindowFocus: false,
  });

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  );

  const totalDBRowCount = data?.pages?.[0]?.total ?? 0;
  const totalFetched = flatData.length;

  const onBottomReached = useCallback(() => {
    if (totalFetched < totalDBRowCount && !isFetching) fetchNextPage();
  }, [fetchNextPage, isFetching, totalFetched, totalDBRowCount]);

  return (
    <Content
      id={'table_accounts_people'}
      dataTypeKey={'user'}
      data={flatData}
      onBottomReached={onBottomReached}
      //
      settings={{
        availableViews: ['table', 'row'],
        defaultView: 'table',
        columns: [
          { id: 'user-name', size: 25 },
          { id: 'user-column-email', size: 25 },
          { id: 'user-groups', size: 25 },
          { id: 'user-type', size: 25 },
        ],
        row: 'user-row-default',
      }}
    />
  );
};

export default UsersContent;
