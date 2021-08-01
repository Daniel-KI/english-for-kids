import fs from 'fs';

const createDirIfNoExist = (dir: string): string => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
};

export default createDirIfNoExist;
