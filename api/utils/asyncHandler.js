const asyncHandler = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

const asyncHandleAll = fns => {
  const results = Object.create(null);
  for (const key in fns) {
    if (fns.hasOwnProperty(key)) {
      results[key] = asyncHandler(fns[key]);
    }
  }
  return results;
};

module.exports = { asyncHandler, asyncHandleAll };
