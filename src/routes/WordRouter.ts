import path from 'path';
import express from 'express';
import multer from 'multer';
import { WordInterface, WordModel } from '../models/WordModel';
import { CategoryModel } from '../models/CategoryModel';
import deleteFileFromServer from '../utils/deleteFileFromServer';
import createDirIfNoExist from '../utils/createDirIfNoExist';

const WordRouter = express.Router();

const storage = multer.diskStorage({
  destination: (
    _req: express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ) => {
    if (file.fieldname === 'image') {
      callback(null, createDirIfNoExist('uploads/vocabulary/images/'));
    }
    if (file.fieldname === 'sound') {
      callback(null, createDirIfNoExist('uploads/vocabulary/sounds/'));
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
const uploadWordFiles = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'sound', maxCount: 1 },
]);

// GET SPECIFIC WORD
WordRouter.get('/id', async (req: express.Request, res: express.Response) => {
  try {
    const word = await WordModel.findOne({ _id: req.query._id });
    res.json(word);
  } catch (err) {
    res.json({ message: err });
  }
});

WordRouter.get('/categoryId', async (req: express.Request, res: express.Response) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const { categoryId } = req.query;
    let categoryWords: WordInterface[];
    if (page >= 0 && limit > 0) {
      categoryWords = await WordModel.find({ categoryId })
        .limit(limit)
        .skip(page * limit);
    } else {
      categoryWords = await WordModel.find({ categoryId });
    }
    res.json(categoryWords);
  } catch (err) {
    res.json({ message: err });
  }
});

// GET ALL WORDS
WordRouter.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const words = await WordModel.find().limit(8); // limit = 8
    res.json(words);
  } catch (err) {
    res.json({ message: err });
  }
});

// ADD NEW WORD
WordRouter.post('/', uploadWordFiles, async (req: express.Request, res: express.Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const image = files.image ? files.image[0] : undefined;
    const sound = files.sound ? files.sound[0] : undefined;
    if (!image || !sound) throw new Error('No required files');
    const word = new WordModel({
      categoryId: req.body.categoryId,
      word: req.body.word,
      translation: req.body.translation,
      image: image.path,
      sound: sound.path,
    });
    const checkedCategory = await CategoryModel.findById(req.body.categoryId);
    if (!checkedCategory) throw new Error('There is no such category');
    const savedWord = await word.save();
    res.json(savedWord);
  } catch (err) {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const image = files.image ? files.image[0] : undefined;
    const sound = files.sound ? files.sound[0] : undefined;
    deleteFileFromServer(image?.path);
    deleteFileFromServer(sound?.path);
    res.json({ message: err });
  }
});

// DELETE WORD
WordRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const removedWord = await WordModel.findOneAndDelete({ _id: req.params.id });
    deleteFileFromServer(removedWord.image);
    deleteFileFromServer(removedWord.sound);
    res.json(removedWord);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE WORD
WordRouter.patch('/:id', uploadWordFiles, async (req: express.Request, res: express.Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const image = files.image ? files.image[0] : undefined;
    const sound = files.sound ? files.sound[0] : undefined;
    const oldData = await WordModel.findOne({ _id: req.params.id });
    const checkedCategory = await CategoryModel.findById(req.body.categoryId);
    if (!checkedCategory) throw new Error('There is no such category');
    const updatedWord = await WordModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          categoryId: req.body.categoryId,
          word: req.body.word,
          translation: req.body.translation,
          image: image ? image.path : oldData.image,
          sound: sound ? sound.path : oldData.sound,
        },
      },
      { new: true },
    );
    if (image) deleteFileFromServer(oldData.image);
    if (sound) deleteFileFromServer(oldData.sound);
    res.json(updatedWord);
  } catch (err) {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const image = files.image ? files.image[0] : undefined;
    const sound = files.sound ? files.sound[0] : undefined;
    deleteFileFromServer(image?.path);
    deleteFileFromServer(sound?.path);
    res.json({ message: err });
  }
});

export default WordRouter;
