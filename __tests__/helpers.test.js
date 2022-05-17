import { dateString } from '../lib/misc';

test('date format', () => {
  const date = new Date('2018-06-07');

  expect(dateString(date)).toBe('7 June 2018');
});
