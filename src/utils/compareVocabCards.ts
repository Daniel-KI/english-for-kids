import { WordModel } from '../models/WordModel';

const compareVocabCards = (firstCard: WordModel, secondCard: WordModel): boolean => firstCard.word === secondCard.word;

export default compareVocabCards;
