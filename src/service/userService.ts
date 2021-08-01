import { UserModel } from '../models/UserModel';
import { USERS_PATH } from '../data/serverData';

const signInUser = async (user: UserModel): Promise<UserModel> => {
  const response: Response = await fetch(`${USERS_PATH}/login/?login=${user.login}&password=${user.password}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

export default signInUser;
