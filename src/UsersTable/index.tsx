import { useEffect, useCallback, useMemo } from 'react';
import Table from '../../components/Table';
import { DSUserApiResponse, getUsers } from '../../api/accounts/people';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UsersTableProps {}

const fetchSize = 100;

const UsersTable = ({}: UsersTableProps) => {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage: isFetching,
  } = useInfiniteQuery<DSUserApiResponse>({
    queryKey: ['users-table-data', []],
    queryFn: async ({ pageParam = 0 }: { pageParam: number }) =>
      getUsers(pageParam * fetchSize, fetchSize),
    getNextPageParam: (_, allPages) => allPages.length,
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
      dataTypeKey='user'
      data={flatData}
      onBottomReached={onBottomReached}
    />
  );
};

export default UsersTable;
