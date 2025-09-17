const loggerMiddleware = (req, res, next) => {
  const { method, url, ip } = req;
  const start = Date.now();

  console.log(
    `[${new Date().toLocaleString()}] ${method} request to ${url} IP: ${ip}`
  );

  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toLocaleString();
    console.log(
      `[${timestamp}] ${method} request to ${url} Response: ${res.statusCode} - completed in ${duration}ms`
    );
  });

  next();
};

module.exports = loggerMiddleware;
