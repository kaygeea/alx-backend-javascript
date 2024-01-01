module.exports = function calculateNumber(type, a, b) {
  if (type === 'SUM') {
    return (Math.round(a)) + (Math.round(b));
  }
  if (type === 'SUBTRACT') {
    return (Math.round(a)) - (Math.round(b));
  }
  if (type === 'DIVIDE') {
    const dividend = Math.round(a);
    const divisor = Math.round(b);
    if (divisor === 0) {
      return ('Error');
    }
    return (dividend / divisor);
  }
  return 'Error: Unsupported operation type. Kindly choose a +, - or / op.';
};
