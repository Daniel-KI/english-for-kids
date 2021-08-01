import { Schema, model } from 'mongoose';

interface CategoryInterface {
  _id?: string;
  name: string;
  image: string;
}

const CategorySchema = new Schema<CategoryInterface>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { autoCreate: true },
);

const CategoryModel = model('categories', CategorySchema);

export { CategoryInterface, CategorySchema, CategoryModel };
