//import mongo collections, bcrypt and implement the following data functions
import { users } from '../config/mongoCollections.js';
import * as connect from '../config/mongoConnection.js'

//import { ObjectId } from 'mongodb';
import * as helper from '../helpers.js'
import bcrypt from 'bcrypt'
const saltRounds = 16

export const registerUser = async ( firstName, lastName, emailAddress, password, role) => {
  firstName = helper.nameCheck(firstName)
  lastName = helper.nameCheck(lastName)
  emailAddress = helper.emailCheck(emailAddress)
  const allUsers = await users()
  const email = await allUsers.findOne({emailAddress:emailAddress})
  if (email) {throw 'email has been used'}

  password = helper.passwordCheck(password)
  const hashPassword = await bcrypt.hash(password, saltRounds)

  role = helper.roleCheck(role)

  let newUser = {
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    password: hashPassword,
    role: role
  }
  
  const insertInfo = await allUsers.insertOne(newUser)
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {throw 'can not insert'}
  return {insertedUser: true}

};

export const loginUser = async (emailAddress, password) => {
  emailAddress = helper.emailCheck(emailAddress)
  password = helper.passwordCheck(password)

  const findUser = await users()
  const user = await findUser.findOne({emailAddress:emailAddress})
  if (user === null) {throw 'email is invalid'}

  const comparePassword = await bcrypt.compare(password, user.password)

  if (comparePassword) {return {
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
    role: user.role
  }}
  else {throw 'Either the email address or password is invalid'}
};

// const db = await connect.dbConnection();

// try {
//   registerUser('Michael', "Hu", "ihu@stevens.edu", "Text123@", 'admin')
// } catch (e) {
//   console.log(e)
// }