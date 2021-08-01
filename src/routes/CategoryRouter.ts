import path from 'path';
import express from 'express';
import multer from 'multer';
import { CategoryInterface, CategoryModel } from '../models/CategoryModel';
import { WordInterface, WordModel } from '../models/WordModel';
import deleteFileFromServer from '../utils/deleteFileFromServer';
import createDirIfNoExist from '../utils/createDirIfNoExist';

const CategoryRouter = express.Router();

const storage = multer.diskStorage({
  destination: (
    _req: express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ) => {
    if (file.fieldname === 'image') {
      callback(null, createDirIfNoExist('uploads/categories/images/'));
    }
  },
  filename: (
    _req: express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) => {
    callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });
const uploadCategoryImage = upload.single('image');

// GET SPECIFIC CATEGORY
CategoryRouter.get('/id', async (req: express.Request, res: express.Response) => {
  try {
    const category = await CategoryModel.findOne({ _id: req.query._id });
    res.json(category);
  } catch (err) {
    res.json({ message: err });
  }
});

CategoryRouter.get('/name', async (req: express.Request, res: express.Response) => {
  try {
    const category = await CategoryModel.findOne({ name: req.query.name });
    res.json(category);
  } catch (err) {
    res.json({ message: err });
  }
});

// GET ALL CATEGORIES
CategoryRouter.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    let categories: CategoryInterface[];
    if (page >= 0 && limit > 0) {
      categories = await CategoryModel.find()
        .limit(limit)
        .skip(page * limit);
    } else {
      categories = await CategoryModel.find();
    }
    res.json(categories);
  } catch (err) {
    res.json({ message: err });
  }
});

// // GET WORDS BY CATEGORY
// CategoryRouter.get('/words/:categoryId', async (req: express.Request, res: express.Response) => {
//   try {
//     console.log("here");
//     const page = Number(req.query.page);
//     const limit = Number(req.query.limit);
//     const categoryId = req.params.categoryId;
//     console.log(page);
//     console.log(limit);
//     console.log(categoryId);
//     let categoryWords: WordInterface;
//     if (page >= 0 && limit > 0) {
//       categoryWords = await WordModel.find({ categoryId: categoryId }).limit(limit).skip(page * limit);
//     } else {
//       categoryWords = await WordModel.find({ categoryId: categoryId });
//     }
//     console.log(categoryWords);
//     res.json(categoryWords);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// ADD NEW CATEGORY
CategoryRouter.post('/', uploadCategoryImage, async (req: express.Request, res: express.Response) => {
  try {
    const image = req.file;
    if (image === undefined) throw new Error('No required files');
    const category = new CategoryModel({
      name: req.body.name,
      image: image.path,
    });
    const savedCategory = await category.save();
    res.json(savedCategory);
  } catch (err) {
    deleteFileFromServer(req.file?.path);
    res.json({ message: err });
  }
});

// DELETE CATEGORY
CategoryRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const categoryWords: WordInterface[] = (await WordModel.find({ categoryId: req.params.id })) as WordInterface[];
    await WordModel.deleteMany({ categoryId: req.params.id });
    const removedCategory = await CategoryModel.findOneAndDelete({ _id: req.params.id });
    categoryWords.forEach((word) => {
      deleteFileFromServer(word.image);
      deleteFileFromServer(word.sound);
    });
    deleteFileFromServer(removedCategory.image);
    res.json(removedCategory);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE CATEGORY
CategoryRouter.patch('/:id', uploadCategoryImage, async (req: express.Request, res: express.Response) => {
  try {
    const image = req.file;
    let updatedCategory: CategoryInterface;
    const oldData = await CategoryModel.findOne({ _id: req.params.id });
    if (!image) {
      updatedCategory = await CategoryModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            name: req.body.name,
          },
        },
        { new: true },
      );
    } else {
      updatedCategory = await CategoryModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            name: req.body.name,
            image: image.path,
          },
        },
        { new: true },
      );
      deleteFileFromServer(oldData.image);
    }
    res.json(updatedCategory);
  } catch (err) {
    deleteFileFromServer(req.file?.path);
    res.json({ message: err });
  }
});

export default CategoryRouter;
