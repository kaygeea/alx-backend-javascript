/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable jest/expect-expect */
const expect = require('chai').expect;
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber function', () => {
  describe('where operation type is SUM(+)', () => {
    it('should return the sum of the rounded numbers', () => {
      expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
      expect(calculateNumber('SUM', 0.6, 8.5)).to.equal(10);
    });
  });
  describe('where operation type is SUBTRACT(-)', () => {
    it('should return the difference of the rounded numbers', () => {
      expect(calculateNumber('SUBTRACT', 1.4, 4.5)).to.equal(-4);
      expect(calculateNumber('SUBTRACT', 8.6, 0.5)).to.equal(8);
    });
  });
  describe('where operation type is DIVIDE(/)', () => {
    it('should return the quotient of the rounded numbers', () => {
      expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.equal(0.2);
      expect(calculateNumber('DIVIDE', 8.6, 2.5)).to.equal(3);
    });
    it('should return "Error" if the divisor rounds to 0', () => {
      expect(calculateNumber('DIVIDE', 1.4, 0.3)).to.equal('Error');
      expect(calculateNumber('DIVIDE', 1000, 0)).to.equal('Error');
    });
  });
});
