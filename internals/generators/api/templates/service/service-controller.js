/**
 * Stripe Controller
 *
 *
 */

const StripeService = require('../../services/stripe');
const {
  checkForFields,
  checkForValidStrings,
  // checkForSizedFields,
  // checkForValidType,
} = require('../../utils/validators');

const isDev = process.env.NODE_ENV !== 'production';

/**
 * TODO:
 */
exports.myServiceControllerMethod = (data) =>
  new Promise((resolve, reject) => {
    // 1. check for required fields
    const fields = ['']; // TODO:
    const fieldError = checkForFields(data, fields);
    if (fieldError) return reject(fieldError); // return to stop code execution
    // 1. check for string fields
    const stringFieldError = checkForValidStrings(data, fields);
    if (stringFieldError) return reject(stringFieldError); // return to stop code execution

    // const {} = data;

    StripeService.serviceMethod()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        if (isDev) console.error(err);

        reject({ code: 500, err }); // 500 Internal Server Error
      });
  });
