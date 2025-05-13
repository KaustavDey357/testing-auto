const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { exec } = require('exec');

const secret = ' ';

const app = express();
app.use(bodyParser.json());

app.post(3000 , (req,res) => {
  const key = `sha1=${crypto.createHMAC(secret).update(Json.stringfy(req.body)).digest('hex')}`;
  const signature = req.headers['x-hub-signature'];

  if(signature === key)
  {
    exec('cd . && git pull origin main && npm install', (error, stdout, stderr) => {
      if (error) {
        reject(`exec error: ${error}`);
        return;
      }
      console.log(stdout);
      console.error(stderr);
  }
 else
  {
    return res.status(505).send('Wrong Signature!');
  }
}
