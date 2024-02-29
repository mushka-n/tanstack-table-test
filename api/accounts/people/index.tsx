import { faker } from '@faker-js/faker';
import { DSUser } from '@/types/DSUsers/DSUser';
import { DSUserRole } from '@/types/DSUsers/DSUserRole';

export type DSUserApiResponse = {
  data: DSUser[];
  total: number;
};

export const makeUser = (id: string): DSUser => ({
  id,
  displayName: faker.person.firstName() + ' ' + faker.person.lastName(),
  email: faker.internet.email(),
  role: faker.helpers.shuffle<DSUserRole>([
    'owner',
    'admin',
    'manager',
    'collaborator',
    'user',
  ])[0]!,
  groups: [],
  avatarSmall: faker.internet.avatar(),
  hasAvatar: true,
  profileUrl: '',
});

export const makeUserData = (...lens: number[]) => {
  const makeUserDataLevel = (depth = 0): DSUser[] =>
    [...Array(lens[depth]).keys()].map((d): DSUser => makeUser(d + 1 + ''));
  return makeUserDataLevel();
};

const usersData = makeUserData(1000);

export const getUsers = (
  start: number,
  size: number
  // sorting: SortingState
) => {
  const dbData = [...usersData];
  // if (sorting.length) {
  //   const sort = sorting[0] as ColumnSort;
  //   const { id, desc } = sort as { id: keyof DSUser; desc: boolean };
  //   dbData.sort((a, b) => {
  //     if (desc) return a[id] < b[id] ? 1 : -1;
  //     return a[id] > b[id] ? 1 : -1;
  //   });
  // }

  return {
    data: dbData.slice(start, start + size),
    total: dbData.length,
  };
};
