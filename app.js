const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const studentRouter = require('./routes/student');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(studentRouter);

const DB_URL ='mongodb+srv://phat:minhphat@cluster0-aqqvy.mongodb.net/phat?retryWrites=true&w=majority';

mongoose.connect(DB_URL)
.then (() => {
    app.listen(8888, () => {
        console.log('server is run');
    });
})
.catch (e => {
    console.log(e);
})

app.use(express.static(path.join(__dirname, 'public')));
