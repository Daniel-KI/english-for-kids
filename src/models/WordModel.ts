import { Schema, model } from 'mongoose';

interface WordInterface {
  _id?: string;
  categoryId: string;
  word: string;
  translation: string;
  image: string;
  sound: string;
}

const WordSchema = new Schema<WordInterface>(
  {
    categoryId: {
      type: String,
      required: true,
    },
    word: {
      type: String,
      required: true,
      unique: true,
    },
    translation: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    sound: {
      type: String,
      required: true,
    },
  },
  { autoCreate: true },
);

const WordModel = model('words', WordSchema);

export { WordInterface, WordSchema, WordModel };
