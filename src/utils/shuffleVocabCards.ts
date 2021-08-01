import { WordModel } from '../models/WordModel';

const shuffleVocabCards = (array: WordModel[]): WordModel[] => {
  const shuffledArray = [...array];
  const lowestNumber = 0;
  let currentIndex: number = shuffledArray.length;
  let randomIndex: number;
  while (currentIndex !== lowestNumber) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }
  return shuffledArray;
};

export default shuffleVocabCards;
