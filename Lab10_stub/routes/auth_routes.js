//import express, express router as shown in lecture code
import { Router } from "express";
const router = Router()
import * as user from '../data/users.js'
import * as helper from '../helpers.js'


router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    if (req.session.user) {
      if (req.session.user.role == 'user') {return res.redirect('/protected')}
      else {return res.redirect('/admin')}
    } else {
      return res.status(401).render('register', {title:'Register'})
    }
    
  })
  .post(async (req, res) => {
    //code here for POST
    let firstName = req.body.firstNameInput
    let lastName = req.body.lastNameInput
    let emailAddress = req.body.emailAddressInput
    let password = req.body.passwordInput
    let confirmpassword = req.body.confirmPasswordInput
    let role = req.body.roleInput
    if (!firstName || !lastName || !emailAddress || !password || !confirmpassword || !role) {
      return res.status(400).render('register', {title:'Register', error:'400 missing value'})
    }
    try {
      if (password !== confirmpassword) {throw 'password not equal'}
      firstName = helper.nameCheck(firstName)
      lastName = helper.nameCheck(lastName)
      emailAddress = helper.emailCheck(emailAddress)
      password = helper.passwordCheck(password)
      role = helper.roleCheck(role)
    } catch (e) {
      return res.status(400).render('register', {title: 'Register', error:'400 '+e})
    }

    try {
      const newUser = await user.registerUser(firstName, lastName, emailAddress, password, role)
      if (newUser.insertedUser === true) {
        return res.redirect('/login')
      } else {
        return res.status(500).json({message:"Internal Server Error"})
      }
    } catch (e) {
      return res.status(400).render('register', {title: 'Register', error:'400 '+e})
    }

  });

router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
    if (req.session.user) {
      if (req.session.user.role == 'user') {return res.redirect('/protected')}
      else {return res.redirect('/admin')}
    } else {
      return res.status(401).render('login', {title:'Login'})
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let email = req.body.emailAddressInput
    let password = req.body.passwordInput
    if (!email || !password) {
      return res.status(400).render('login',{ title:'Login', error:'missing value'});
    }
    try {
      email = helper.emailCheck(email)
      password = helper.passwordCheck(password)
    } catch (e) {
      return res.status(400).render('login',{title:'Login', error:'400 '+e});
    }

    try {
      const userLogin = await user.loginUser(email, password)
      if (userLogin) {
        req.session.user = {firstName: userLogin.firstName, 
                            lastName: userLogin.lastName,
                            emailAddress: userLogin.emailAddress,
                            role: userLogin.role}
      if (req.session.user.role == 'admin') { return res.redirect('/admin')}
      else{ return res.redirect('/protected')}
      }
    } catch (e) {
      return res.status(400).render('login', {title: 'Login', error: '400 '+e})
    }
  });

router.route('/protected').get(async (req, res) => {
  //code here for GET
  if (req.session.user){
  let admin = false;
  if(req.session.user.role === "admin"){
    admin = true;
  }
  return res.render('protected', {title:'User', firstName: req.session.user.firstName,
                                  lastName: req.session.user.lastName, currentTime: new Date().toUTCString(),
                                  role: req.session.user.role,
                                admin:admin})
  } else {
  req.session.message = {title:'error', error:'401 user not login'}
  return res.status(401).redirect('/error')
  }
});

router.route('/admin').get(async (req, res) => {
  //code here for GET
  if (req.session.user.role == 'admin'){
    return res.render('admin', {title:'Admin', firstName: req.session.user.firstName,
                                    lastName: req.session.user.lastName, currentTime: new Date().toUTCString(),
                                    role: req.session.user.role})
    } else {
    req.session.message = {title:'error', error:'403 user not login'}
    return res.status(403).redirect('/error')
    }
});

router.route('/error').get(async (req, res) => {
  //code here for GET
  const input = req.session.message
  return res.render('error', {title:input.title, error:input.error })

});

router.route('/logout').get(async (req, res) => {
  //code here for GET
  req.session.destroy()
  return res.render('logout', {title:'Logout'})
});

export default router