// This data file should export all functions using the ES6 standard as shown in the lecture code
import {events} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import * as helpers from '../helpers.js';

export const create = async ( eventName,  eventDescription,  eventLocation,  contactEmail,  maxCapacity,  priceOfAdmission,
  eventDate,  startTime,  endTime,  publicEvent) => {
  //Implement Code here
  //Do NOT forget to initalize attendees to be an empty array and totalNumberOfAttendees to 0 on event creation
  eventName = helpers.stringCheck(eventName);
  if (eventName.length < 5) {throw 'eventName less than 5'};

  eventDescription = helpers.stringCheck(eventDescription);
  if (eventDescription.length < 25) {throw 'eventDescription less than 25'};

  contactEmail = helpers.stringCheck(contactEmail);
  helpers.emailvalidation(contactEmail);

  eventDate = helpers.stringCheck(eventDate);
  helpers.datevalidation(eventDate);

  startTime = helpers.stringCheck(startTime);
  endTime = helpers.stringCheck(endTime);
  helpers.timevalidation(startTime, endTime);
  
  if (helpers.numberCheck(maxCapacity) <= 0 || !Number.isInteger(maxCapacity)) {throw 'capacity less than 1 or float'};
  helpers.numberCheck(priceOfAdmission)
  if (priceOfAdmission < 0) {throw new Error('price less than 0')}
  if (!Number.isInteger(priceOfAdmission)){
    if (String(priceOfAdmission)[String(priceOfAdmission).length-2] != '.' && String(priceOfAdmission)[String(priceOfAdmission).length-3] != '.') { throw 'format not match' }}
  eventLocation = helpers.eventCheck(eventLocation);
  if (typeof publicEvent !== 'boolean') {throw 'publicevent not boolean'}

  let data = Object();
    data['eventName'] = eventName
    data['description'] = eventDescription
    data['eventLocation'] = eventLocation
    data['contactEmail'] = contactEmail
    data['maxCapacity'] = maxCapacity
    data['priceOfAdmission'] = priceOfAdmission
    data['eventDate'] = eventDate
    data['startTime'] = startTime
    data['endTime'] = endTime
    data['publicEvent'] = publicEvent
    data['attendees'] = []
    data['totalNumberOfAttendees'] = 0

    const eventCollection = await events();
    const insertInfo = await eventCollection.insertOne(data);
    if (!insertInfo.acknowledged || !insertInfo.insertedId){
      throw 'can not insert'}

    const id = insertInfo.insertedId.toString()
    const event = await get(id)
    return event

};

export const getAll = async () => {
  //Implement Code here
  const allEvents = await events();
  let res = await allEvents.find({}).toArray();
  for (let i = 0; i < res.length; i++) {
    res[i]._id = res[i]._id.toString()
  }
  if (!res) {return []}
  return res
};

export const get = async (id) => {
  //Implement Code here
  id = helpers.stringCheck(id)
  if (!ObjectId.isValid(id)) {throw 'invalid ID'}
  const eventCollection = await events();
  const event = await eventCollection.findOne({_id: new ObjectId(id)});
  if (event === null) {throw 'no match id'}
  event._id = event._id.toString();
  return event
};

export const remove = async (id) => {
  //Implement Code here
  id = helpers.stringCheck(id)
  if (!ObjectId.isValid(id)) {throw 'invalid ID'}
  const eventCollection = await events();
  const event = await eventCollection.findOneAndDelete({
    _id: new ObjectId(id)
  })
  if (event === null){ throw `Could not delete event with id of ${id}`}
  return {eventName: `${event.eventName}`, deleted: true}
};

export const update = async ( eventId,  eventName,  eventDescription,  eventLocation,  contactEmail,  maxCapacity,
  priceOfAdmission,  eventDate,  startTime,  endTime,  publicEvent) => {
  //Implement Code here
  eventId = helpers.stringCheck(eventId)
  if (!ObjectId.isValid(eventId)) {throw 'invalid ID'}

  eventName = helpers.stringCheck(eventName);
  if (eventName.length < 5) {throw 'eventName less than 5'};

  eventDescription = helpers.stringCheck(eventDescription);
  if (eventDescription.length < 25) {throw 'eventDescription less than 25'};

  contactEmail = helpers.stringCheck(contactEmail);
  helpers.emailvalidation(contactEmail);

  eventDate = helpers.stringCheck(eventDate);
  helpers.datevalidation(eventDate);

  startTime = helpers.stringCheck(startTime);
  endTime = helpers.stringCheck(endTime);
  helpers.timevalidation(startTime, endTime);
  
  if (helpers.numberCheck(maxCapacity) <= 0 || !Number.isInteger(maxCapacity)) {throw 'capacity less than 1 or float'};
    helpers.numberCheck(priceOfAdmission)
  if (priceOfAdmission < 0) {throw 'price less than 0'}
  if (!Number.isInteger(priceOfAdmission)){
    if (String(priceOfAdmission)[String(priceOfAdmission).length-2] != '.' && String(priceOfAdmission)[String(priceOfAdmission).length-3] != '.') { throw 'format not match' }}
  eventLocation = helpers.eventCheck(eventLocation);
  if (typeof publicEvent !== 'boolean') {throw 'publicevent not boolean'}


  const eventCollection = await events();
  const event = await eventCollection.findOneAndUpdate(
    {_id: new ObjectId(eventId)},
    {$set: {eventName: eventName, description: eventDescription, eventLocation: eventLocation, contactEmail: contactEmail, maxCapacity: maxCapacity,
      priceOfAdmission: priceOfAdmission, eventDate: eventDate, startTime: startTime, endTime: endTime, publicEvent: publicEvent}},
    {returnDocument:'after'});
  if (event === null) {throw `no match id of ${eventId}`}
  event._id = event._id.toString();
  return event

};

// export default exportedMethods;

