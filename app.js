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
 *    description: Use to request all student
 *    responses:
 *      '200':
 *        description: A successful request
 * /create-student:
 *   post:
 *    description: Create new student and post to database
 *    parameters:
 *    - name: name
 *      description: Name of Student
 *      in: formData
 *      required: true
 *      type: string
 *    - name: age
 *      description: Student Age
 *      in: formData
 *      type: Number
 *    - name: description
 *      description: Student description
 *      in: formData
 *      type: textarea
 *    responses:
 *      '200':
 *        description: Create student success
 * /users/register:
 *   post:
 *    description: Create new user and post to database
 *    parameters:
 *    - name: email
 *      description: User's email
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: Password account
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      '200':
 *        description: Create new basic user success
 * /update-student:
 *   post:
 *    description: Update student information
 *    parameters:
 *    - name: name
 *      description: name of student
 *      in: formData
 *      required: true
 *      type: string
 *    - name: age
 *      description: Age of student
 *      in: formData
 *      required: true
 *      type: number
 *    - name: description
 *      description: New Description
 *      in: formData
 *      type: textarea
 *    responses:
 *      '200':
 *        description: success
 * /delete-student:
 *   post:
 *    description: Delete product
 *    parameters:
 *    - name: name
 *      description: name of student
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      '200':
 *        description: Delete success
 * /users/login:
 *   post:
 *    description: Login
 *    parameters:
 *    - name: email
 *      description: User Email
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: User Password
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      '200':
 *        description: login success
 * 
 */ 
app.use(express.static(path.join(__dirname, 'public')));
