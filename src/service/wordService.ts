import { WordModel } from '../models/WordModel';
import { WORDS_PATH } from '../data/serverData';

const getWordsByCategoryId = async (id: string, page?: number, limit?: number): Promise<WordModel[]> => {
  let response: Response;
  if (page === undefined || limit === undefined) {
    response = await fetch(`${WORDS_PATH}/categoryId/?categoryId=${id}`, {
      method: 'GET',
    });
  } else {
    response = await fetch(`${WORDS_PATH}/categoryId/?categoryId=${id}&page=${page}&limit=${limit}`, {
      method: 'GET',
    });
  }
  return response.json();
};

const deleteWordById = async (id: string): Promise<WordModel> => {
  const response: Response = await fetch(`${WORDS_PATH}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

const updateWord = async (id: string, data: FormData): Promise<WordModel> => {
  const response: Response = await fetch(`${WORDS_PATH}/${id}`, {
    method: 'PATCH',
    body: data,
  });
  return response.json();
};

const createWord = async (data: FormData): Promise<WordModel> => {
  const response: Response = await fetch(`${WORDS_PATH}/`, {
    method: 'POST',
    body: data,
  });
  return response.json();
};

export { getWordsByCategoryId, createWord, updateWord, deleteWordById };
