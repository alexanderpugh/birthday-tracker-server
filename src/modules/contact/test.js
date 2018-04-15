const { orderByClosestDate } = require('./utils');

const unsortedContacts = [
  { DOB: 'Thu Jan 31 1991 00:00:00 GMT+0000 (GMT Standard Time)', _doc: { DOB: 'Thu Jan 31 1991 00:00:00 GMT+0000 (GMT Standard Time)' } },
  { DOB: 'Sun Apr 02 1995 01:00:00 GMT+0100 (GMT Summer Time)', _doc: { DOB: 'Sun Apr 02 1995 01:00:00 GMT+0100 (GMT Summer Time)' }  },
  { DOB: 'Mon Apr 07 1930 01:00:00 GMT+0100 (GMT Summer Time)', _doc: { DOB: 'Mon Apr 07 1930 01:00:00 GMT+0100 (GMT Summer Time)' }  },
  { DOB: 'Sat May 08 2010 01:00:00 GMT+0100 (GMT Summer Time)', _doc: { DOB: 'Sat May 08 2010 01:00:00 GMT+0100 (GMT Summer Time)' }  }
];

const sortedContacts = [
  { DOB: 'Sun Apr 02 1995 01:00:00 GMT+0100 (GMT Summer Time)' },
  { DOB: 'Mon Apr 07 1930 01:00:00 GMT+0100 (GMT Summer Time)' },
  { DOB: 'Sat May 08 2010 01:00:00 GMT+0100 (GMT Summer Time)' },
  { DOB: 'Thu Jan 31 1991 00:00:00 GMT+0000 (GMT Standard Time)' }
];

describe('orderByClosestDate', () => {
  it('Should return an array of dates closest to a provided date', () => {
    const aDate = new Date('Sat Apr 07 2018 17:19:40 GMT+0100 (GMT Summer Time)');

    const sorted = orderByClosestDate(unsortedContacts, aDate);

    expect(sorted).toEqual(sortedContacts);
  });

  it('Should return an array of dates closest to a provided date when the provided date is a string', () => {
    const aDate = 'Sat Apr 07 2018 17:19:40 GMT+0100 (GMT Summer Time)';

    const sorted = orderByClosestDate(unsortedContacts, aDate);

    expect(sorted).toEqual(sortedContacts);
  });

  it('Should throw if an invalid date is supplied', () => {
    const invalidDateString = 'Sat Apr 07 2018 17fasafsfT+0aummer Time)';

    expect(() => {
      orderByClosestDate(unsortedContacts, invalidDateString);
    }).toThrow();
  });

});
