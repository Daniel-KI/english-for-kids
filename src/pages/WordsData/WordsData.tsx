import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateVocabController from '../../components/CreateVocabController/CreateVocabController';
import VocabDataController from '../../components/VocabDataController/VocabDataController';
import { WordModel } from '../../models/WordModel';
import { getWordsByCategoryId } from '../../service/wordService';
import './WordsData.scss';

const WordsData = (): JSX.Element => {
  const limit = 4;
  const [wordsData, setWordsData] = useState<WordModel[]>();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [fetching, setFetching] = useState<boolean>(true);

  const scrollHandler = () => {
    const pagePosition =
      document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight);
    if (pagePosition < 30) {
      setFetching(true);
    }
  };

  const loadWordsData = () => {
    getWordsByCategoryId(categoryId, currentPage, limit)
      .then((data) => {
        if (wordsData) {
          setWordsData([...wordsData, ...data]);
        } else {
          setWordsData(data);
        }
        setCurrentPage((prevState) => prevState + 1);
      })
      .finally(() => {
        setFetching(false);
      });
  };

  useEffect(() => {
    if (fetching) {
      loadWordsData();
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  });

  const updateWordsList = () => {
    setCurrentPage(0);
    setWordsData([]);
    setFetching(true);
  };

  if (!wordsData) {
    return (
      <div className='words-data'>
        <div className='container words-data__container'>
          <img className='words-data__preloader' src='/loader.gif' alt='loader' />
        </div>
      </div>
    );
  }

  if (!wordsData.length) {
    return (
      <div className='words-data'>
        <div className='container words-data__container'>
          <h1 className='words-data__title words-data__title_empty'>No data received</h1>
          <CreateVocabController categoryId={categoryId} updateWordsList={updateWordsList} />
        </div>
      </div>
    );
  }

  return (
    <div className='words-data'>
      <div className='container words-data__container'>
        <h1 className='words-data__title'>Words data</h1>
        <div className='words-data__records'>
          {wordsData.map((data) => {
            return <VocabDataController data={data} updateWordsList={updateWordsList} key={data.word} />;
          })}
          <CreateVocabController categoryId={categoryId} updateWordsList={updateWordsList} />
        </div>
      </div>
    </div>
  );
};

export default WordsData;
