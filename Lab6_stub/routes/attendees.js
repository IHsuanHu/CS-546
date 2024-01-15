// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { Router } from "express";;
const router = Router();
import {ObjectId} from 'mongodb';
import * as attendees from '../data/attendees.js';
import * as helpers from '../helpers.js';

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
      let attendee = await attendees.getAllAttendees(id)
      return res.status(200).json(attendee)
    } catch(e) {
      return res.status(404).json({error: e})
    }

  })
  .post(async (req, res) => {
    //code here for POST
    let data = req.body
    try {
      const id = helpers.stringCheck(req.params.eventId)
      if (!ObjectId.isValid(id)) {throw 'invalid ID'}
      data.firstName = helpers.stringCheck(data.firstName)
      data.lastName = helpers.stringCheck(data.lastName)
      data.emailAddress = helpers.stringCheck(data.emailAddress)
      helpers.emailvalidation(data.emailAddress)
    } catch (e) {
      return res.status(400).json({error: e})
    }
    try {
      const id = helpers.stringCheck(req.params.eventId)
      const {firstName, lastName, emailAddress} = data
      const newAttendees = await attendees.createAttendee(id, firstName, lastName, emailAddress)
      return res.status(200).json(newAttendees)
    } catch (e) {
      return res.status(404).json({error: e})
    }

  });

router
  .route('/attendee/:attendeeId')
  .get(async (req, res) => {
    //code here for GET
    try {
      const id = helpers.stringCheck(req.params.attendeeId)
      if (!ObjectId.isValid(id)) {throw 'invalid ID'}
    } catch (e) {
      return res.status(400).json({error: e})
    }
    try {
      const id = helpers.stringCheck(req.params.attendeeId)
      let attendee = await attendees.getAttendee(id)
      res.status(200).json(attendee)
    } catch (e) {
      return res.status(404).json({error: e})
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      const id = helpers.stringCheck(req.params.attendeeId)
      if (!ObjectId.isValid(id)) {throw 'invalid ID'}
    } catch (e) {
      return res.status(400).json({error: e})
    }
    try {
      const id = helpers.stringCheck(req.params.attendeeId)
      const attendee = await attendees.removeAttendee(id)
      return res.status(200).json(attendee)
    } catch (e) {
      return res.status(404).json({error: e})
    }
  });
  
  export default router