const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

mongoose.connect('mongodb://localhost:27017/smllr', {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req,res) => {
    const urls = await ShortUrl.find()
    res.render("index" , {urls: urls})
})

app.post('/shortUrls', async (req,res) => {
    await shortUrl.create({full: req.body.fUrl})

    res.redirect('/')
})

app.get("/:shortUrl", async (req,res) => {
    const shortUrl = await ShortUrl.findOne({short: req.params.sUrl})
    if (shortUrl == null) return res.statusCode(404)

    shortUrl.click++
    shortUrl.save()

    res.redirect(shortUrl.fUrl)
})

app.listen(3000)
