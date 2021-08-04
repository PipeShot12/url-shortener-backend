const urlRouter = require('express').Router()
const Url = require('../models/url')
const getNextValue = require('../models/autoincrement')
const dns = require('dns')
const GetHost = require('url').URL

urlRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const isSavedAlready = await Url.findOne({ url_short: id })
  if (isSavedAlready) {
    res.json(isSavedAlready.original_url)
  } else {
    res.status(404).json({ error: 'Does not exists' })
  }
})
urlRouter.post('/', async (req, res, next) => {
  try {
    const { url } = req.body
    const stringToUrl = new GetHost(url)

    const urlFormatted = `${stringToUrl.hostname}${stringToUrl.pathname}`

    dns.lookup(stringToUrl.hostname, async (err, address) => {
      if (err) {
        res.status(400).json({ error: 'Invalid url' })
      } else if (address) {
        const isSavedAlready = await Url.findOne({ original_url: urlFormatted })
        if (isSavedAlready) {
          res.json(isSavedAlready)
        } else {
          const newUrl = new Url({
            original_url: urlFormatted,
            url_short: await getNextValue('url_short_id')
          })
          const savedUrl = await newUrl.save()
          res.json(savedUrl)
        }
      }
    })
  } catch (err) {
    next(err)
  }
})

module.exports = urlRouter
