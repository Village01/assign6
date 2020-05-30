const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const studentRouter = require('./routes/student');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const passport = require('passport');
const flash    = require('connect-flash');

const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const app = express();

// Bodyparser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(studentRouter);

app.use(session({ secret: 'xxxxxxxxxxxxx' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

require('./config/passport')(passport);
require('./routes/user.js')(app, passport);

const DB_URL ='mongodb+srv://phat:minhphat@cluster0-aqqvy.mongodb.net/phat?retryWrites=true&w=majority';

mongoose.connect(DB_URL)
.then (() => {
    app.listen(process.env.PORT || 8888, () => {
        console.log('server is run');
    });
})
.catch (e => {
    console.log(e);
})

const swaggerOptions={
    swaggerDefinition: {
        info: {
            title: 'My name',
            description: "Hoàng Minh Phát",
            version: "1.0.0",
            contact: {
                name: "Hoàng Minh Phát",
                email: "17520876@gm.edu.vn",
            },
            servers: ["localhost:8888"]
        }
    },
    apis: ["app.js"]
};
const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use('/apidocs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));

// Bătddaufw viết api doc nay

/**
 * @swagger
 * /:
 *  get:
 *      summary: ...
 *      description: ...
 *      produces:
 *          - application/json
 *      responses:
 *          '200': 
 *              description: ....
 */

app.use(express.static(path.join(__dirname, 'public')));
