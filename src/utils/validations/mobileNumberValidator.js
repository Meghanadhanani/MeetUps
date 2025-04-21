/**
 * Validate mobile number format.
 * @param {string} mobileNumber - The mobile number to validate.
 * @returns {boolean} - Returns true if the mobile number format is valid, otherwise false.
 */
export const mobileNumberValidator = (phone) => {
    if (!phone || phone.trim().length === 0) return "* Phone number cannot be empty"; 
    if (phone.length < 8 || phone.length > 12) return "* Please enter a valid phone number "; 
    if (!/^\d+$/.test(phone)) return "* Phone number can only contain digits"; 
    return ""; // Valid phone number
  };
  export const mobileNumberValidatorNotRequired = (phone) => {
    if (!phone || phone.trim().length === 0) return true; // Valid if empty
    if (phone.length < 8 || phone.length > 12) return false; // Invalid if not within range
    if (!/^\d+$/.test(phone)) return false; // Invalid if contains non-digit characters
    return true; // Valid phone number
  };
  