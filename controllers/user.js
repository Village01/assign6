// const User=require('../models/user')
// const express=require('express');
// const router=express.Router();
// const bcrypt=require('bcryptjs');
// const passport = require('passport');
// const { ensureAuthenticated, forwardAuthenticated,authRole } = require('../config/auth');

// const ROLE={
// //   ADMIN:'admin',
//   BASIC:'basic'
// }

// exports.getLoginForm=(req,res,next)=>{
//      res.render('login');
// }
// exports.getUserForm=(req,res,next)=>{
//     res.render('signup');
// }
// exports.postSingup=(req,res,next)=>{
//     const {name,email,password,password2}=req.body;
//     let errors=[];

//     //Check required fields
//     if (!name||!email||!password||!password2){
//         errors.push({msg:'Please fill in any fields'});
//     }
    
//     //check pass length
//     if(password.length<6){
//         errors.push({msg:'Password should be at least 6 character'});
//     }

//     if (errors.length>0){
//         res.render('signup',{
//             errors,
//             name,
//             email,
//             password,
//             password2
//         });
//     } else {
//         User.findOne({ email: email }).then(user => {
//           if (user) {
//             errors.push({ msg: 'Email already exists' });
//             res.render('signup', {
//               errors,
//               name,
//               email,
//               password,
//               password2
//             });
//           } else {
//             const newUser = new User({
//               name,
//               email,
//               password
//             });
//            //hash password
//            bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(newUser.password, salt, (err, hash) => {
//               if (err) throw err;
//               newUser.password = hash;
//               newUser
//                 .save()
//                 .then(user => {
//                   req.flash(
//                     'success_msg',
//                     'You are now registered and can log in'
//                   );
//                   res.redirect('/views/login');
//                 })
//                 .catch(err => console.log(err));
//               });
//             });
//           }
//         });
//       }
// }

// exports.postLogin = passport.authenticate('local', {
//   failureRedirect: '/users/login',
//   failureFlash: true
// }), (req, res, next) => {
// //   if (req.user.role === 'admin') {
// //     res.redirect('/admin');
// //   }
//   if (req.user.role === 'basic') {
//     res.redirect('/');
//   }
// };
// exports.getLogout=(req,res)=>{
//     req.logout();
//   req.flash('success_msg', 'You are logged out');
//   res.redirect('/views/login');
// }