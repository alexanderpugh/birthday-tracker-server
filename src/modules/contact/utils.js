const _ = require('lodash');
const moment = require('moment');

/**
 * Order contacts by birthdays
 *
 * @param {[object]} contacts
 * @param {string|Date} orderDate
 * @return {[object]}
 */
const orderByClosestDate = (contacts, orderDate) => {
  if(!moment(orderDate).isValid()) {
    throw new Error('ERROR: orderDate is not valid');
  }

  const compareDate = _.isDate(orderDate) ? orderDate : new Date(orderDate);

  const contactsWithDateMod = contacts.map((contact) => ({
    ...contact,
    _dateMod: moment(new Date(contact.DOB)).set({ 'year': moment(compareDate).year() }).toDate()
  }));

  const sorted = _.sortBy(contactsWithDateMod, (contact) => contact._dateMod);

  let gone = [];
  let coming = [];

  for (const contact of sorted) {
    if (moment(contact._dateMod).month() < moment(compareDate).month()) {
      gone.push(contact);
    } else {
      coming.push(contact);
    }
  }

  return [ ...coming, ...gone ].map((contact) => {
    const { _dateMod, _doc, ...rest } = contact;

    return { ..._doc };
  });
};

module.exports = {
  orderByClosestDate
};
