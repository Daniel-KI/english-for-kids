import fs from 'fs';

const checkIfExist = (filePath: string): boolean => {
  try {
    fs.accessSync(filePath);
  } catch (error) {
    return false;
  }
  return true;
};

const deleteFileFromServer = (filePath: string | undefined): void => {
  if (filePath && checkIfExist(filePath)) {
    fs.unlinkSync(filePath);
  }
};

export default deleteFileFromServer;
