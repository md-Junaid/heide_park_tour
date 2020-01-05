// @desc Get everything on homepage
// @route GET
// @access Public

exports.getHomepage = (req, res, next) => {
  res.send('Hello');
}