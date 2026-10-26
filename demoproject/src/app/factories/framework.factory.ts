import { Framework } from '../entities/framework';

export const createFramework = (overrides?: Partial<Framework>): Framework => {
  return {
    id: 0,
    name: '',
    rating: 0,
    logoUrl: '',
    ...overrides,
  };
};
