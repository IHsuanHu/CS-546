//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getAuthors() function in the /data/data.js file that you used for lab 3 to return the list of authors and call it in the /authors route.  You can also import your getAuthorById(id) function and call it in the :/id route.
import {Router} from 'express';
const router = Router();
import * as data from '../data/data.js'


function checkstring(str) {
    if (typeof str !== 'string'){ throw new Error('not a string')}
    if (str.trim().length === 0){ throw new Error('empty input')}
    return str.trim();}

router.route('/')
// Implement GET Request Method and send a JSON response See lecture code!
.get(async (req, res) => {
    try {
        const allAuthor = await data.getAllAuthor();
        res.json(allAuthor);
    } catch (e) {
        res.status(500).send("Error")
    }
})

router.route('/:id')
//Implement GET Request Method and send a JSON response See lecture code!
.get(async (req, res) => {
    try {
        const id = checkstring(req.params.id)
        const author = await data.getAuthorById(id);
        res.json(author);
    } catch (e) {
        res.status(404).json({error:'Author Not Found!'})
        // .send('Author Not Found!')
        
    }
})

export default router;
