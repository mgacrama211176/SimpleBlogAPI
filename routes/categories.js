import express from 'express';
import Category from '../models/CategoryModel.js';
const router = express.Router();

//adding new category
router.post('/', async (request, response) => {
  const newCategory = new Category(request.body);
  try {
    const savedCategory = await newCategory.save();
    response.status(200).json({ message: `saved new category` });
  } catch (err) {
    response.status(500).json(err);
  }
});

//fetch all categories
router.get('/', async (request, response) => {
  try {
    const categories = await Category.find();
    response.status(200).json(categories);
  } catch (err) {
    response.status(500).json(err);
  }
});

export default router;
