/**
 * Status code yang umum digunakan dalam API
 * @constant
 */

/**
 * Mengirim response sukses ke client
 * @param {Object} res - Express response object
 * @param {string} message - Pesan sukses
 * @param {number} [statusCode=200] - HTTP status code
 * @param {*} [data=null] - Data yang akan dikirim ke client
 * @returns {Object} Express response object
 */
const sendSuccess = (res, message, statusCode = 200, responseData = null) => {
  if (!res || !res.status || !res.json) {
    throw new Error("Parameter res tidak valid");
  }

  if (!message || typeof message !== "string") {
    throw new Error("Parameter message harus berupa string");
  }

  // Hapus data jika null/undefined, tapi pertahankan array kosong atau objek kosong
  const data =
    responseData === null || responseData === undefined
      ? undefined
      : responseData;

  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined && { data }),
  });
};

/**
 * Mengirim response error ke client
 * @param {Object} res - Express response object
 * @param {string} message - Pesan error
 * @param {number} [statusCode=500] - HTTP status code
 * @param {Error|null} [error=null] - Error object
 * @returns {Object} Express response object
 */
const sendError = (res, message, statusCode = 500, error = null) => {
  if (!res || !res.status || !res.json) {
    throw new Error("Parameter res tidak valid");
  }

  if (!message || typeof message !== "string") {
    throw new Error("Parameter message harus berupa string");
  }

  const errorResponse = {
    success: false,
    message,
  };

  // Tambahkan detail error hanya dalam mode development
  if (process.env.NODE_ENV === "development" && error) {
    errorResponse.error = {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return res.status(statusCode).json(errorResponse);
};

module.exports = {
  sendSuccess,
  sendError,
};
