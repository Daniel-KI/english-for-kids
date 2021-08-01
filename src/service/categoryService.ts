import { CategoryModel } from '../models/CategoryModel';
import { CATEGORY_PATH } from '../data/serverData';

const getCategories = async (page?: number, limit?: number): Promise<CategoryModel[]> => {
  let response: Response;
  if (page === undefined || limit === undefined) {
    response = await fetch(`${CATEGORY_PATH}`, {
      method: 'GET',
    });
  } else {
    response = await fetch(`${CATEGORY_PATH}/?page=${page}&limit=${limit}`, {
      method: 'GET',
    });
  }
  return response.json();
};

const getCategoryById = async (id: string): Promise<CategoryModel> => {
  const response: Response = await fetch(`${CATEGORY_PATH}/id/?_id=${id}`, {
    method: 'GET',
  });
  return response.json();
};

const deleteCategoryById = async (id: string): Promise<CategoryModel> => {
  const response: Response = await fetch(`${CATEGORY_PATH}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

const updateCategory = async (id: string, data: FormData): Promise<CategoryModel> => {
  const response: Response = await fetch(`${CATEGORY_PATH}/${id}`, {
    method: 'PATCH',
    body: data,
  });
  return response.json();
};

const createCategory = async (data: FormData): Promise<CategoryModel> => {
  const response: Response = await fetch(`${CATEGORY_PATH}/`, {
    method: 'POST',
    body: data,
  });
  return response.json();
};

export { getCategories, getCategoryById, deleteCategoryById, updateCategory, createCategory };
