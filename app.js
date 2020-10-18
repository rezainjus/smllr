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
    await ShortUrl.create({full: req.body.fullUrl})

    res.redirect('/')
})

app.get("/:shortUrl", async (req,res) => {
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.click++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

app.listen(3000)
