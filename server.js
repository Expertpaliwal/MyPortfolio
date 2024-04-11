const express= require('express');
const cors = require('cors');
const dotenv= require('dotenv');
const path = require('path');

const sendMail= require('./controllers/sendMail');
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname,'./client/build')));

app.post('/api/portfolio/sendemail', sendMail);

app.get('*',function(req, res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
});

const PORT= process.env.PORT || 8080;
const Start = (req, res) => {
    try{
        app.listen(PORT, ()=> {
            console.log(`Server is running on port ${PORT}`)
        })
    }catch(e){
        console.log(e);
    }
}

Start();