// sum.test.js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('Added a shop into database,', () => {
  expect(sum(0, 0)).toBe(0);
});

test('Added products to a database.', () => {
  expect(sum(-1, 1)).toBe(0);
});

test('Products can be pushed to checkout.', () => {
  expect(sum(3, 6)).toBe(10);
});
test('adds -1 + 1 to equal 0', () => {
  expect(sum(4, 7)).toBe(0);
});
test('adds -1 + 1 to equal 0', () => {
  expect(sum(3, 7)).toBe(230);
});