// Set-Up Routes
import { Router } from "express";
import path from "path";
const router = Router()

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET to show static HTML flie
    return res.sendFile(path.resolve('static/webpage.html'))
  })
 export default router