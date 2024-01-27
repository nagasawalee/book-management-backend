import express, { Request, Response } from 'express'
import { User } from '../model'

const router = express.Router()

//logout
router.get('/', async (req: Request, res: Response) => {
  (req.session as any).user = null
  return res.status(200).json({ success: true })
})


export default router