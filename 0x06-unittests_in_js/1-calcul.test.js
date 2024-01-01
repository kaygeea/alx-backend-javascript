/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable jest/expect-expect */
const assert = require('assert');
const calculateNumber = require('./1-calcul');

describe('calculateNumber function', () => {
  describe('where operation type is SUM(+)', () => {
    it('should return the sum of the rounded numbers', () => {
      assert.strictEqual(calculateNumber('SUM', 1.4, 4.5), 6);
      assert.strictEqual(calculateNumber('SUM', 0.6, 8.5), 10);
    });
  });
  describe('where operation type is SUBTRACT(-)', () => {
    it('should return the difference of the rounded numbers', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 1.4, 4.5), -4);
      assert.strictEqual(calculateNumber('SUBTRACT', 8.6, 0.5), 8);
    });
  });
  describe('where operation type is DIVIDE(/)', () => {
    it('should return the quotient of the rounded numbers', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 4.5), 0.2);
      assert.strictEqual(calculateNumber('DIVIDE', 8.6, 2.5), 3);
    });
    it('should return "Error" if the divisor rounds to 0', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 0.3), 'Error');
      assert.strictEqual(calculateNumber('DIVIDE', 1000, 0), 'Error');
    });
  });
});
