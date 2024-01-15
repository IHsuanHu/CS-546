//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below
import { Router } from "express";
const router = Router()
import * as helper from '../helpers.js'
import * as data from '../data/characters.js'

router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  try{
    const title = "Marvel Character Finder"
    return res.render('home', {title})
  }catch(e){
    const title = 'Error'
    return res.render('error', {title: title, error:e})
  }
 
});

router.route('/searchmarvelcharacters').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchCharacterByName and then 
  // call your data function passing in the searchCharacterByName and then rendering the search results of up to 15 characters.
  let input = req.body
  
  try { 
    input = helper.nameCheck(input.searchCharacterByName)
  } 
  catch (e) { 
    const title = 'Bad Input'
    return res.status(400).render('characterSearchResults', {title:title, error:e, badInput:true})
  }
  let ans = undefined
  try { ans = await data.searchCharacterByName(input)}
  catch (e) { 
    if (e == 404){
      const title = 'Marvel Characters Not Found'
      return res.status(200).render('characterSearchResults', {title:title, noData:true, searchCharacterByName:input, errorcode:'resultless not found'})
      }
    }
  
  try {
    const title = 'Marvel Characters Found'
    return res.status(200).render('characterSearchResults', {title:title, post:ans, input:input})
  } catch (e) {
    const title = 'Error'
    return res.render('error', {title: title, error:'render problem'})
  }


});

router.route('/marvelcharacter/:id').get(async (req, res) => {
  //code here for GET a single character
  let input = req.params.id
  try { 
    input = helper.idCheck(input)
  } catch (e) { 
    const title = 'Error'
    return res.render('error', {title: title,error:e})
  }
  let ans = undefined
  try { ans = await data.searchCharacterById(input)
  } catch (e) { 
    const title = 'Error'
    return res.render('error', {title: title, error:e})
   }
   console.log(ans)
  try {
    const name = ans[0].name
    const img = ans[0].thumbnail.path
    const desc = ans[0].description
    let item = ans[0].comics.items
    return res.render('characterById', {title:name, nameT:name, post:item, image:img, description:desc, found: true})
  } catch (e) {
    const title = 'Error'
    return res.status(404).render('characterById', {title: title, error:'not found', noID: true})
  }
  
});

export default router
