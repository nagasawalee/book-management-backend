import express, { Request, Response } from 'express'
import { Category } from '../model'

const router = express.Router()

// get category data
router.get('/', async (req: Request, res: Response) => {

  //get search data
  const { name, level } = req.query
  // fuzzy search
  const data = await Category.find({
    ...(name && { 'name': { '$regex': name, '$options': 'i' } }),
    ...(level && { level })
  }).populate("parent")

  //返回分类总数
  const total = data.length
  return res.status(200).json({ data, total })
})

//add new category
router.post('/', async (req: Request, res: Response) => {
  const body = req.body
  //check category exist?
  const { name } = body
  const oldCategory = await Category.findOne({ name })
  if (oldCategory) {
    return res.status(500).json({ message: "This Category already exist!" })
  } else {
    const categoryModel = new Category({ ...body })
    categoryModel.save()
    return res.json({ sucess: true })
  }

})

//delete category
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  await Category.findByIdAndDelete(id)
  return res.status(200).json({ success: true })

})

//edit category
//get category_id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const category = await Category.findById(id)
  if (category) {
    res.status(200).json({ data: category, success: true })
  } else {
    res.status(500).json({ message: "改category不存在" })
  }
})

//update
router.put('/:id', async (req: Request, res: Response) => {
  const body = req.body
  const { id } = req.params

  await Category.findOneAndUpdate({ _id: id }, body)
  return res.status(200).json({ success: true })
})


export default router