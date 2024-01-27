import express, { Request, Response } from 'express'
import { User } from '../model'

const router = express.Router()

//get user data
router.get('/', async (req: Request, res: Response) => {

  //get search data
  const { name, nickName, status } = req.query
  // fuzzy search
  const data = await User.find({
    ...(name && { 'name': { '$regex': name, '$options': 'i' } }),
    ...(nickName && { 'nickName': { '$regex': nickName, '$options': 'i' } }),
    ...(status && { status }),
  })

  const total = data.length

  return res.status(200).json({ data, total })
})

//add new user
router.post('/', (req: Request, res: Response) => {
  const body = req.body
  console.log(body);

  const userModel = new User({ ...body })
  userModel.save()
  return res.json({ sucess: true })
})

//delete user
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  await User.findByIdAndDelete(id)
  return res.status(200).json({ success: true })

})

//edit user
//get user_id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await User.findById(id)
  if (user) {
    res.status(200).json({ data: user, success: true })
  } else {
    res.status(500).json({ message: "user dose not exist!" })
  }
})

//update
router.put('/:id', async (req: Request, res: Response) => {
  const body = req.body
  const { id } = req.params

  await User.findOneAndUpdate({ _id: id }, body)
  return res.status(200).json({ success: true })
})

//login
router.post('/', async (req: Request, res: Response) => {
  const { name, password } = req.body
  console.log(name);

  console.log(password);

  const user = await User.findOne({ name, password })
  if (user) {
    res.status(200).json({ data: user, success: true })
  } else {
    res.status(500).json({ message: "Please enter correct account and password!" })
  }
})


export default router