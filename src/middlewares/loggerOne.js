const loggerOne = (request, response, next) => {
  console.log(`📨 Запрос на: ${request.originalUrl}`);
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`);
  next();
};

module.exports = loggerOne;