import { CardModel } from './cardModel';

export interface CategoryModel {
  label: string;
  image: string;
  words: CardModel[];
}
