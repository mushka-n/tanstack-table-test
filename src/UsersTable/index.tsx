import { useCallback, useMemo } from 'react';
import Table from '@/components/Table';
import { DSUserApiResponse, getUsers } from '@/api/accounts/people';
import { useInfiniteQuery } from '@tanstack/react-query';
const fetchSize = 100;

const UsersTable = () => {
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
    <Table
      id={'table_accounts_people'}
      defaultView={'row'}
      dataTypeKey={'user'}
      data={flatData}
      onBottomReached={onBottomReached}
    />
  );
};

export default UsersTable;
