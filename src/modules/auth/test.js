const utils = require('./utils');

describe('modules/auth', () => {
  describe('utils', () => {
    describe('emailValid', () => {
      it('should return true for a valid email', () => {
        expect(utils.emailValid('email@amail.com')).toBe(true);
      });

      it('should return false for an invalid email', () => {
        expect(utils.emailValid('emailm')).toBe(false);
      });

      it('should have a custamisable regex', () => {
        expect(utils.emailValid('all', /all/)).toBe(true);
      });
    });

    describe('passwordValid', () => {
      it('should return true for a valid password', () => {
        expect(utils.passwordValid('Apassword993')).toBe(true);
      });

      it('should return false for an invalid password', () => {
        expect(utils.passwordValid('password')).toBe(false);
      });

      it('should have a custamisable regex', () => {
        expect(utils.passwordValid('password', /[a-z]/)).toBe(true);
      });
    });
  });
});
