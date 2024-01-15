// TODO: Export and implement the following functions in ES6 format
import * as collection from '../config/mongoCollections.js'
import { ObjectId } from 'mongodb';

function stringCheck (...str) {
  for (let i of str){
  if (typeof i !== 'string' || !i) { throw new Error('not a string')}
  if (i.trim().length == 0) { throw new Error('empty')}
  }
};
function eventCheck(obj) {
  if (typeof obj !== 'object'){ throw new Error('not a object')}
  if (Array.isArray(obj)){ throw new Error('not a object')}
  const states = ['AL', 'AK', 'AZ', 'AR', 'AS', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'GU', 'HI', 
  'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
  'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 
  'TT', 'UT', 'VT', 'VA', 'VI', 'WA', 'WV', 'WI', 'WY']
  const {streetAddress, city, state, zip} = obj
  stringCheck(streetAddress, city, state, zip)
  if (streetAddress.trim().length <3 || city.trim().length <3) {throw new Error('wrong format in loaction')}
  if (state.trim().length !== 2 || !states.includes(state.trim().toUpperCase())) {throw new Error('state fromat wrong')}
  if (!zip.match(/^\d{5}$/)) {throw new Error('zip wrong')}
  let newobj = Object();
  newobj['streetAddress'] = streetAddress.trim()
  newobj['city'] = city.trim()
  newobj['state'] = state.trim().toUpperCase()
  newobj['zip'] = zip.trim()

  return newobj
}

function numberCheck(num) {
  if (typeof Number(num) !== 'number') {throw new Error('not a number')}
  if (!isFinite(num)) {throw new Error('not correct number')}
  return Number(num);
}

function emailvalidation(email) {
  let check = email.split('@');
  if (check.length != 2){throw new Error('email not correct')}
  if (!check[0][0].match(/[0-9A-Za-z]/) || !check[0][check[0].length-1].match(/[0-9A-Za-z]/)){ throw new Error('wrong format')};
  for (let i = 0; i < check[0].length; i++) {
    if (!check[0][i].match(/[0-9A-Za-z_.-]/)){throw new Error('wrong format')}
    if (check[0][i].match(/[.-_]/) && !check[0][i-1].match(/[0-9A-Za-z]/)) {throw new Error('wrong format')};
  }
  if (!check[1][0].match(/[0-9A-Za-z]/)) {throw new Error('wrong format')};
  for (let j = 0; j < check[1].length; j++){
    if (!check[1][j].match(/[0-9A-Za-z-.]/)){throw new Error('wrong format')}
    if (check[1][j].includes('.') && !check[1][j-1].match(/[0-9A-Za-z]/)) {throw new Error('wrong format')};
  }
  let domain = check[1].split('.')
  if (domain.length < 2 || domain[domain.length-1].length < 2) {throw new Error('wrong format')}
}

function datevalidation(date){
  if (date.split('/').length !== 3) {throw new Error('wrong format')}
  let [month, day, year] = date.split('/');
  month = numberCheck(month)
  day = numberCheck(day)
  year = numberCheck(year)
  if (!numberInRange(month, 1, 12)) {throw new Error('wrong month')}
  if ([1,3,5,7,8,10,12].includes(month) && !numberInRange(day, 1, 31)) {throw new Error('wrong date')}
    else if ([4,6,9,11].includes(month) && !numberInRange(day, 1, 30)) {throw new Error('wrong date')}
    else if (month == 2 && !numberInRange(day, 1, 28)) {throw new Error('wrong date')}
 
  var currentdate = new Date(); 
  if (year < currentdate.getFullYear()) {throw new Error('wrong year')}
  if (year === currentdate.getFullYear() && month < (currentdate.getMonth()+1)) {throw new Error('wrong month')}
  if (year === currentdate.getFullYear() && month === (currentdate.getMonth()+1) && day <= currentdate.getDate()) {
    throw new Error('wrong date')}
   
}

function numberInRange (x, min, max) {
  return (x-min) * (x-max) <= 0
}
function timevalidation(startTime, endTime){
  let starthour = undefined;
  let endhour = undefined;
  if (startTime[1] === ':') {
    starthour = numberCheck(startTime[0])} 
    else if (startTime[2] === ':'){starthour = numberCheck(startTime.substring(0,2))}
    else { throw new Error('wrong format')}
  if (endTime[1] === ':') {
    endhour = numberCheck(endTime[0])} 
    else if (endTime[2] === ':') {endhour = numberCheck(endTime.substring(0,2))}
    else { throw new Error('wrong format')}
  let [startmin, endmin] = [numberCheck(startTime.substring(startTime.length-4,startTime.length-2)), numberCheck(endTime.substring(endTime.length-4,endTime.length-2))]
  let [startmidday, endmidday] = [startTime.substring(startTime.length-2,startTime.length), endTime.substring(endTime.length-2,endTime.length)]
  if (!['AM', 'PM'].includes(startmidday && endmidday)) {throw new Error('wrong symble')}
  if (!numberInRange(starthour, 1,12) || !numberInRange(endhour, 1,12)) {throw new Error('wrong hour')}
  if (!numberInRange(startmin, 0, 59) || !numberInRange(endmin, 0, 59)) {throw new Error('wrong time')}
  
  let start = 0
  let end = 0
  if (startmidday == 'PM') {start += 12*60}
  if (endmidday == 'PM') {end += 12*60}
  if (starthour === 12) {starthour = 0}
  if (endhour === 12) {endhour = 0}
  start += starthour*60 + startmin
  end += endhour*60 + endmin
  if (( end - start ) < 30) {throw new Error('starttime not enough')}
  

}

export const create = async (eventName, eventDescription, eventLocation, contactEmail, maxCapacity, 
  priceOfAdmission, eventDate, startTime, endTime, publicEvent) => {
    stringCheck(eventName, eventDescription, contactEmail, eventDate, startTime, endTime);
    if (eventName.length < 5) {throw new Error('eventName less than 5')}
    if (eventDescription.length < 25) {throw new Error('eventDescription less than 25')}
    emailvalidation(contactEmail.trim());
    datevalidation(eventDate.trim());
    timevalidation(startTime.trim(), endTime.trim());
    if (numberCheck(maxCapacity) <= 0 || !Number.isInteger(maxCapacity)) {throw new Error('capacity less than 1 or float')};
    numberCheck(priceOfAdmission)
    if (priceOfAdmission < 0) {throw new Error('price less than 0')}
    if (!Number.isInteger(priceOfAdmission)){
    if (String(priceOfAdmission)[String(priceOfAdmission).length-2] != '.' && String(priceOfAdmission)[String(priceOfAdmission).length-3] != '.') 
      { throw new Error('format not match') }}
    eventLocation = eventCheck(eventLocation);
    if (typeof publicEvent !== 'boolean') {throw new Error('publicevent not boolean')}

    let data = Object();
    data['eventName'] = eventName.trim()
    data['description'] = eventDescription.trim()
    data['eventLocation'] = eventLocation
    data['contactEmail'] = contactEmail.trim()
    data['maxCapacity'] = maxCapacity
    data['priceOfAdmission'] = priceOfAdmission
    data['eventDate'] = eventDate.trim()
    data['startTime'] = startTime.trim()
    data['endTime'] = endTime.trim()
    data['publicEvent'] = publicEvent

    const eventCollection = await collection.events();
    const insertInfo = await eventCollection.insertOne(data);
    if (!insertInfo.acknowledged || !insertInfo.insertedId){
      throw new Error('can not insert')
    }

    const id = insertInfo.insertedId.toString()
    const event = await get(id)
    return event
};

export const getAll = async () => {

  const allEvents = await collection.events();
  let res = await allEvents.find({}).toArray();
  for (let i = 0; i < res.length; i++) {
    res[i]._id = res[i]._id.toString()
  }
  if (!res) {return []}
  return res
};

export const get = async (id) => {
  stringCheck(id)
  id = id.trim()
  if (!ObjectId.isValid(id)) {throw new Error('invalid ID')}
  const eventCollection = await collection.events();
  const event = await eventCollection.findOne({_id: new ObjectId(id)});
  if (event === null) {throw new Error('no match id')}
  event._id = event._id.toString();
  return event
};

export const remove = async (id) => {
  stringCheck(id)
  id = id.trim()
  if (!ObjectId.isValid(id)) {throw new Error('invalid ID')}
  const eventCollection = await collection.events();
  const event = await eventCollection.findOneAndDelete({
    _id: new ObjectId(id)
  })
  if (event === null){ throw new Error(`Could not delete event with id of ${id}`)}
  return {eventName: `${event.eventName}`, deleted: true}
};

export const rename = async (id, newEventName) => {
  stringCheck(id, newEventName)
  id = id.trim()
  if (!ObjectId.isValid(id)) {throw new Error('invalid ID')}
  newEventName = newEventName.trim()
  if (newEventName.length < 5) {throw new Error('eventName less than 5')}
  const eventCollection = await collection.events();
  const check = await eventCollection.findOne(
    {_id: new ObjectId(id)}
  )
  if (check.eventName === newEventName) { throw 'Same event name'}
  const event = await eventCollection.findOneAndUpdate(
    {_id: new ObjectId(id)},
    {$set: {eventName: newEventName}},
    {returnDocument:'after'});
  if (event === null) {throw new Error(`no match id of ${id}`)}
  event._id = event._id.toString();
  return event
};
