
/**
 * Validate password.
 * @param {string} email - The password to validate.
 * @returns {boolean} - Returns true if the password format is valid, otherwise false.
 */
export const passwordValidater = (password) => {
    if (password.length >= 2) {
      return true;
    } else {
      return false;
    }
  };