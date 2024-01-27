import express, { Request, Response } from 'express'
import { Book, Borrow } from '../model'

const router = express.Router()

//get borrow data
//user vs admin？？
router.get('/', async (req: Request, res: Response) => {

  const { borrowBook, borrowUser, status } = req.query

  //user can only access to thier own data
  const session = req.session as any
  console.log(session);
  let currentUser = borrowUser
  if (session.user && session.user.role === 'user') {
    currentUser = session.user._id
  }

  const data = await Borrow.find({
    ...(borrowBook && { borrowBook }),
    ...(currentUser && { borrowUser: currentUser }),
    ...(status && { status })
  }).populate(['borrowBook', 'borrowUser'])

  const total = data.length

  return res.status(200).json({ data, total })
})

//add borrow record
//update book stock
router.post('/', async (req: Request, res: Response) => {
  const { borrowBook } = req.body

  //find borrow book
  const book = await Book.findOne({ _id: borrowBook })
  if (book) {
    //while stock
    if (book.stock > 0) {
      const borrowModel = new Borrow({ ...req.body })
      borrowModel.save()
      //update book stock
      await Book.findByIdAndUpdate(book._id, { stock: book.stock - 1 })
      return res.status(200).json({ sucess: true })
    } else {
      return res.status(500).json({ message: "Book out of stock" })
    }
  } else {
    return res.status(500).json({ message: "Book dose not exist" })
  }
})

//delete borrow record
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  await Borrow.findByIdAndDelete(id)
  return res.status(200).json({ success: true })

})

//edit borrow
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const borrow = await Borrow.findById(id).populate("category")
  if (borrow) {
    res.status(200).json({ data: borrow, success: true })
  } else {
    res.status(500).json({ message: "borrow dose not exist" })
  }
})

//update borrow
router.put('/:id', async (req: Request, res: Response) => {
  const body = req.body
  const { id } = req.params

  await Borrow.findOneAndUpdate({ _id: id }, body)
  return res.status(200).json({ success: true })
})

//return book
//update book stock
router.put('/back/:id', async (req: Request, res: Response) => {
  const borrow = await Borrow.findOne({ _id: req.params.id })

  if (borrow) {
    console.log(borrow);
    borrow.status = 'off'
    borrow.backAt = Date.now()
    await borrow.save()

    ////update book stock
    const book = await Book.findOne({ _id: borrow.borrowBook })

    if (book) {
      book.stock += 1
      await book.save()
    } else {
      res.status(500).json({ message: "book dose not exist" })
    }

    res.status(200).json({ success: true })
  } else {
    res.status(500).json({ message: "borrow dose not exist" })
  }
})


export default router