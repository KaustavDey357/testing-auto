const express = require('express');
const bodyparser = require('body-parser');
const { exec }= require('exec');
const crypto = require('crypto');
const PORT = 3000;
const pass = ' '

const app = express();
app.use(bodyparser.json());

app.post('/vibe' , (req,res) => {

    const sig = req.headers('x-hub-signature');
    const key = `sha1=${crypto.createHmac('sha1', pass).update(JSON.stringify(req.body)).digest('hex')}`;

    if(sig === key )
    {
        exec('cd node-express-hello-world && git pull origin main && pm2 restart app ' , (err,stdout,stderr) =>{
            if(err)
            {console.log(`Error:${stderr}`); return res.status(404).send('Unsuccessfull Deployment!');}
            console.log(stdout);
        })
    }
    else{
        return res.status(501).send("Wierd error! signature Mismatch");
    }
}

);

app.listen(PORT, console.log('Listetning!'));
