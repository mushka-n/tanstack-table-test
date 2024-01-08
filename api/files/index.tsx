import { faker } from '@faker-js/faker';
import { makeUser } from '../accounts/people';
import { DSFile } from '../../types/DSItems/DSFile';

const DB_SIZE = 550;
const RESPONSE_TIME = 1000;

export type DSFileApiResponse = {
  data: DSFile[];
  total: number;
};

export const makeFiles = (...lens: number[]) => {
  const makeFilesLevel = (depth = 0): DSFile[] =>
    [...Array(lens[depth]).keys()].map(
      (d): DSFile => ({
        id: d + 1,
        title: faker.system.fileName({ extensionCount: 0 }),
        createdBy: makeUser(d + 1 + ''),
        contentLength:
          faker.number.float({ min: 0, max: 500, precision: 0.1 }) +
          ' ' +
          faker.helpers.shuffle<string>(['KB', 'MB'])[0]!,
        created: faker.date.anytime(),
        updated: faker.date.anytime(),
        fileType: faker.number.int({ min: 5, max: 7 }),
      })
    );

  return makeFilesLevel();
};

const data = makeFiles(DB_SIZE);

export const getFiles = async (start: number, size: number) => {
  const dbData = [...data];
  // if (sorting.length) {
  //   const sort = sorting[0] as ColumnSort;
  //   const { id, desc } = sort as { id: keyof DSUser; desc: boolean };
  //   dbData.sort((a, b) => {
  //     if (desc) return a[id] < b[id] ? 1 : -1;
  //     return a[id] > b[id] ? 1 : -1;
  //   });
  // }

  await new Promise((resolve) => setTimeout(resolve, RESPONSE_TIME));
  return {
    data: dbData.slice(start, start + size),
    total: dbData.length,
  };
};
