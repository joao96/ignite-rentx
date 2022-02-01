import fs from 'fs';

export const deleteFile = async (filename: string) => {
  try {
    // verifica se o arquivo existe no dir passado

    await fs.promises.stat(filename);
  } catch {
    return;
  }

  // remove o arquivo no dir passado

  await fs.promises.unlink(filename);
};
