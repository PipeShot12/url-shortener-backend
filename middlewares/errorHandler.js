module.exports = (err, req, res, next) => {
  res.status(505).json({ error: err.message })
}
