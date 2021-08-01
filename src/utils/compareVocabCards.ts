import { CardModel } from '../models/cardModel';

const compareVocabCards = (firstCard: CardModel, secondCard: CardModel): boolean => firstCard.word === secondCard.word;

export default compareVocabCards;
