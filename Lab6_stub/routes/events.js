// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { Router} from "express";
const router = Router();
import {ObjectId} from 'mongodb';
import * as events from '../data/events.js'
import * as helpers from '../helpers.js'

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try {
      const allEvents = await events.getAll();
      let data = []
      for (let i of allEvents){
        let newObject = {
          _id: i._id.toString(),
          eventName: i.eventName};
        data.push(newObject);
      }
      if (data.length === 0) {throw 'data not found'}
      return res.json(data)
    } catch (e) {
      return res.status(404).json({error: e})
    }

  })
  .post(async (req, res) => {
    //code here for POST
    let data = req.body;
    
    if ( Object.keys(data).length !== 10){
      return res.status(400).json({error: 'Wrong fields in the request body'});
    }
    try {
      data.eventName = helpers.stringCheck(data.eventName)
      if (data.eventName.length < 5) {throw 'eventName less than 5'};
      data.description = helpers.stringCheck(data.description);
      if (data.description.length < 25) {throw 'description less than 25'};
      data.contactEmail = helpers.stringCheck(data.contactEmail);
      helpers.emailvalidation(data.contactEmail);
      data.eventDate = helpers.stringCheck(data.eventDate);
      helpers.datevalidation(data.eventDate);
      data.startTime = helpers.stringCheck(data.startTime);
      data.endTime = helpers.stringCheck(data.endTime);
      helpers.timevalidation(data.startTime, data.endTime);
      if (helpers.numberCheck(data.maxCapacity) <= 0 || !Number.isInteger(data.maxCapacity)) {throw 'capacity less than 1 or float'};
      helpers.numberCheck(data.priceOfAdmission)
      if (data.priceOfAdmission < 0) {throw 'price less than 0'}
      if (!Number.isInteger(data.priceOfAdmission)){
        if (String(data.priceOfAdmission)[String(data.priceOfAdmission).length-2] != '.' && String(data.priceOfAdmission)[String(data.priceOfAdmission).length-3] != '.') { throw 'format not match'}}
      data.eventLocation = helpers.eventCheck(data.eventLocation);
      if (typeof data.publicEvent !== 'boolean') {throw 'publicevent not boolean'}
    } catch (e) {
      return res.status(400).json({error: e})
    }
    try {
      const {eventName,  description,  eventLocation,  contactEmail,  maxCapacity,  priceOfAdmission,
        eventDate,  startTime,  endTime,  publicEvent} = data
      const newPost = await events.create(eventName,  description,  eventLocation,  contactEmail,  
        maxCapacity,  priceOfAdmission, eventDate,  startTime,  endTime,  publicEvent);
      return res.status(200).json(newPost);
    } catch (e) {
      return res.status(400).json({error: e})
    }
  });

router
  .route('/:eventId')
  .get(async (req, res) => {
    //code here for GET
    try {
      const id = helpers.stringCheck(req.params.eventId)
      if (!ObjectId.isValid(id)) {throw 'invalid ID'}
    } catch (e) {
      return res.status(400).json({error: e})
    }
    try {
      const id = helpers.stringCheck(req.params.eventId)
      const event = await events.get(id)
      return res.status(200).json(event)
    } catch (e) {
      return res.status(404).json({error: e})
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      const id = helpers.stringCheck(req.params.eventId)
      if (!ObjectId.isValid(id)) {throw 'invalid ID'}
    } catch (e) {
      return res.status(400).json({error: e})
    }
    try {
      const id = helpers.stringCheck(req.params.eventId)
      const event = await events.remove(id)
      return res.status(200).json(event)
    } catch (e) {
      return res.status(404).json({error: e})
    }

  })
  .put(async (req, res) => {
    //code here for PUT
    let data = req.body;
    if (!data || Object.keys(data).length === 0){
      return res.status(400).json({error: 'There are no fields in the request body'});
    }
    try {
      const id = helpers.stringCheck(req.params.eventId)
      if (!ObjectId.isValid(id)) {throw 'invalid ID'}
      data.eventName = helpers.stringCheck(data.eventName)
      if (data.eventName.length < 5) {throw 'eventName less than 5'};
      data.description = helpers.stringCheck(data.description);
      if (data.description.length < 25) {throw 'description less than 25'};
      data.contactEmail = helpers.stringCheck(data.contactEmail);
      helpers.emailvalidation(data.contactEmail);
      data.eventDate = helpers.stringCheck(data.eventDate);
      helpers.datevalidation(data.eventDate);
      data.startTime = helpers.stringCheck(data.startTime);
      data.endTime = helpers.stringCheck(data.endTime);
      helpers.timevalidation(data.startTime, data.endTime);
      if (helpers.numberCheck(data.maxCapacity) <= 0 || !Number.isInteger(data.maxCapacity)) {throw new Error('capacity less than 1 or float')};
      helpers.numberCheck(data.priceOfAdmission)
      if (data.priceOfAdmission < 0) {throw 'price less than 0'}
      if (!Number.isInteger(data.priceOfAdmission)){
        if (String(data.priceOfAdmission)[String(data.priceOfAdmission).length-2] != '.' && String(data.priceOfAdmission)[String(data.priceOfAdmission).length-3] != '.') { throw 'format not match' }}
      data.eventLocation = helpers.eventCheck(data.eventLocation);
      if (typeof data.publicEvent !== 'boolean') {throw 'publicevent not boolean'}
    } catch (e) {
      return res.status(400).json({error: e})
    }
    try {
      const id = helpers.stringCheck(req.params.eventId)
      const {eventName,  description,  eventLocation,  contactEmail,  maxCapacity,  priceOfAdmission,
        eventDate,  startTime,  endTime,  publicEvent} = data
      const newPost = await events.update(id, eventName,  description,  eventLocation,  contactEmail,  
        maxCapacity,  priceOfAdmission, eventDate,  startTime,  endTime,  publicEvent);
      return res.status(200).json(newPost);
    } catch (e) {
      return res.status(404).json({error: e})
    }
  });

  export default router