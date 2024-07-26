require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
let bodyParser = require('body-parser')
const dns = require('dns');
const e = require('express');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

//for url
app.use(bodyParser.urlencoded({extended:false}))

//for json    
app.use(bodyParser.json())

const short_url = Math.floor(Math.random()*100)
let original_url = ""

//URL Shortener
app.post('/api/shorturl',(req,res)=>{
  original_url = new URL(req.body.url)
  dns.lookup(original_url.hostname,(err,address,family)=>{
      if(err){
        res.json({"error":"invalid url"})
      }
      else{
        res.json({"original_url": original_url,"short_url": short_url})
      }
  })
})

//if one goes to api/shorturl/{shorturl} - one should be taken to original url
app.get('/api/shorturl/:shorturl',(req,res)=>{
  res.redirect(original_url.href)
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
