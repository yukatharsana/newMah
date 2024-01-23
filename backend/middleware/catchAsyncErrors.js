module.exports = (theFunc) => async (req, res, next) => {
  try {
    await Promise.resolve(theFunc(req, res, next));
  } catch (error) {
    next(error);
  }
};
