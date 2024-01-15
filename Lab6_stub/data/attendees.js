// This data file should export all functions using the ES6 standard as shown in the lecture code
import * as helpers from '../helpers.js';
import {events} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import * as eventsMethods from './events.js';

export const createAttendee = async (eventId, firstName, lastName, emailAddress) => {
  //Implement Code here
  eventId = helpers.stringCheck(eventId)
  if (!ObjectId.isValid(eventId)) {throw 'invalid ID'}
  firstName = helpers.stringCheck(firstName);
  lastName = helpers.stringCheck(lastName);
  emailAddress = helpers.stringCheck(emailAddress);
  helpers.emailvalidation(emailAddress);

  let data = {
    _id: new ObjectId(),
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,}
  
  const eventCollection = await events();
  let check = await eventCollection.findOne({_id: new ObjectId(eventId)});
  if (check === null) {throw `no match id of ${eventId}`}
  
  if (check.maxCapacity == check.totalNumberOfAttendees) {throw 'exceed maximum'}
  let event = await eventCollection.updateOne(
    {_id: new ObjectId(eventId)},
    {$push: {attendees: data},$inc: {totalNumberOfAttendees: 1}},
    {returnDocument:'after'}); 
  let res = await eventsMethods.get(eventId)
  return res
  
};

export const getAllAttendees = async (eventId) => {
  //Implement Code here
  eventId = helpers.stringCheck(eventId)
  if (!ObjectId.isValid(eventId)) {throw 'invalid ID'}
  const eventCollection = await events();
  let event = await eventCollection.findOne({_id: new ObjectId(eventId)});
  if (event === null) {throw `no match id of ${eventId}`}
  let res = []
  for (let i of event.attendees){
    res.push(i)
  }
  return res
};

export const getAttendee = async (attendeeId) => {
  //Implement Code here
  attendeeId = helpers.stringCheck(attendeeId)
  if (!ObjectId.isValid(attendeeId)) {throw 'invalid ID'}
  const eventCollection = await events();
  let event = await eventCollection.find({}).toArray()
  if (event === null) {throw 'no event'}
  for (let i = 0; i < event.length; i++) {
    for (let j = 0; j < event[i].attendees.length; j++) {
      if (event[i].attendees[j]._id.toString() === attendeeId) {
        return event[i].attendees[j]
      }
    }
  }
 
  throw 'attendee not found'

};

export const removeAttendee = async (attendeeId) => {
  //Implement Code here
  attendeeId = helpers.stringCheck(attendeeId)
  if (!ObjectId.isValid(attendeeId)) {throw `invalid ID`}
  const eventCollection = await events();
  let event = await eventCollection.find({}).toArray()
  if (event === null) {throw 'no event'}
  // let check = false;
  for (let i = 0; i < event.length; i++) {
    for (let j = 0; j < event[i].attendees.length; j++) {
      if (event[i].attendees[j]._id.toString() === attendeeId) {
        await eventCollection.updateOne(
          { _id: event[i]._id },
          {
            $pull: { attendees: { _id: new ObjectId(attendeeId) } },
            $inc: { totalNumberOfAttendees: -1 }
          },
          { returnDocument: 'after' }
        );
        return await eventsMethods.get(event[i]._id.toString())
      }
    }
  }
  throw 'attendee not found'
  
};

// export default exportedMethods;