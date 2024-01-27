import express, { Request, Response } from 'express'
import { Book } from '../model'

const router = express.Router()

// get book data
router.get('/', async (req: Request, res: Response) => {

  //get search data
  const { name, author, category } = req.query

  const data = await Book.find({
    ...(name && { 'name': { '$regex': name, '$options': 'i' } }),
    ...(author && { 'author': { '$regex': author, '$options': 'i' } }),
    ...(category && { category })
  }).populate('category')

  const total = data.length

  return res.status(200).json({ data, total })
})

//add new book
router.post('/', (req: Request, res: Response) => {
  const body = req.body
  console.log(body);

  const bookModel = new Book({ ...body })
  bookModel.save()
  return res.json({ sucess: true })
})

//delete book
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  await Book.findByIdAndDelete(id)
  return res.status(200).json({ success: true })

})

//edit book
//get book_id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const book = await Book.findById(id).populate("category")
  if (book) {
    res.status(200).json({ data: book, success: true })
  } else {
    res.status(500).json({ message: "改书记不存在" })
  }
})

//update
router.put('/:id', async (req: Request, res: Response) => {
  const body = req.body
  const { id } = req.params

  await Book.findOneAndUpdate({ _id: id }, body)
  return res.status(200).json({ success: true })
})


export default router