// Description: This file contains the logic for the authentication routes
// and middleware. It also contains the logic for generating and verifying
// JWT tokens.
//
// Note: This file is not complete. You need to implement the logic for
// generating and verifying JWT tokens.

const jwt = require('jsonwebtoken');


// This is the secret used to sign the JWT token. It should be stored in
// an environment variable. If it is not set, we will use a default value.
const jwtSecret = process.env.JWT_SECRET || 'secret';

/**
 * Generates a JWT token for the user
 * @param {*} user
 * @returns {string} token
 *
 * @example
 * const token = generateUserToken(user);
 * // do something with token
 */
const generateUserToken = function (user) {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, jwtSecret, options);
}

/**
 * Verifies a JWT token
 * @param {*} token
 * @returns {Promise}
 *
 * @example
 * verifyUserToken(token)
 *  .then((decodedToken) => {
 *   // do something with decodedToken
 * })
 * .catch((err) => {
 * // handle error
 * });
 *
 * @example
 * const decodedToken = await verifyUserToken(token);
 * // do something with decodedToken
 *
 * @example
 * try {
 *  const decodedToken = await verifyUserToken(token);
 * // do something with decodedToken
 * } catch (err) {
 * // handle error
 * }
 */
const verifyUserToken = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        reject(err);
      } else {
        resolve(decodedToken);
      }
    });
  });
}

// Export the functions so they can be used in other files
module.exports = {
  generateUserToken,
  verifyUserToken
};
