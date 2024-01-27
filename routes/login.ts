import express, { Request, Response } from 'express'
import { User } from '../model'

const router = express.Router()

//login
router.post('/', async (req: Request, res: Response) => {

  const { name, password } = req.body
  try {
    const user = await User.findOne({ name, password });

    if (user) {
      const data = user.toJSON();
      delete data.password;

      (req.session as any).user = user;

      return res.status(200).json({ data, success: true })
    } else {
      return res.status(500).json({ message: "Please enter correct account and password!" })
    }

  } catch (error) {
    return res.status(500).json({ message: "Login Failed" })
  }
})

export default router