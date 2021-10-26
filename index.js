const express = require('express');
const axios = require('axios')
const cheerio = require('cheerio');

const PORT = 8000;

const app = express();

const siteContent = [];


// Get requests from newspaper website
const url = 'https://www.punchng.com'

app.get('/', (req, res) => {
    axios.get(url)
      .then((response) => {
        const html = response.data;
        // show html page in console
        // console.log(html);
        const $ = cheerio.load(html);

        // Get site article header and links
        $(".entry-title", html).each(function () {
          const title = $(this).text();
          const url = $(this).find("a").attr("href");
        
          siteContent.push({
            title,
            url,
          });
        });
        // console.log(siteContent);
      })
      .catch(function (err) {
        console.log(err);
      });
      res.json(siteContent);
})

app.listen(PORT, function() {
    return console.log(`Server is listening on ${PORT}`);
});




