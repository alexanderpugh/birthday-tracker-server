const isRequired = require('./isRequired');

describe('isRequired', () => {
  it('Should throw and error with the provided argument', () => {
    expect(() => {
      isRequired('ARGUMENT');
    }).toThrowError('ERROR: ARGUMENT required');
  });

  it('Should throw and error with the a default argument of "argument"', () => {
    expect(() => {
      isRequired();
    }).toThrowError('ERROR: argument required');
  });

});
