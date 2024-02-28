// export const passwordStrengthRegex=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/
// export const urlRegex=/https?:\/\/(www\.)?[-a-zA-Z0–9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0–9@:%_\+.~#()?&//=]*)/

// export default {
//   emailRegex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
// };


// export const passwordStrengthRegex=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/
// export const urlRegex=/https?:\/\/(www\.)?[-a-zA-Z0–9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0–9@:%_\+.~#()?&//=]*)/

// export default {
//   emailRegex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
// };
const upperCaseRegex = /[A-Z]/;
const numberRegex = /[0-9]/;
const lowerCaseRegex = /[a-z]/;
const symbolRegex = /["!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/;
const phoneNumberRegex = /^\d+$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
const positiveNumberRegex = /^\d*\.?\d+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export {
  emailRegex,
  lowerCaseRegex,
  numberRegex,
  passwordRegex,
  phoneNumberRegex,
  positiveNumberRegex,
  symbolRegex,
  upperCaseRegex
};
