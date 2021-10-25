import { unlinkSync, writeFile } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const convertAvatarToPath = (avatar: string) => {
  const base64Data = avatar.replace(
    /^data:image\/(jpe?g|png|gif|bmp);base64,/,
    '',
  );
  const regexFileExtension = /((jpe?g|png|gif|bmp))/gm;
  const fileExtension = avatar.match(regexFileExtension)[0];
  const filePath = `/uploads/${uuidv4()}.${fileExtension}`;

  writeFile(`.${filePath}`, base64Data, 'base64', function (err) {
    console.log(err);
  });
  return filePath;
};

export const removeImageInServer = (path) => {
  try {
    unlinkSync(`.${path}`);
  } catch (err) {
    console.error(err);
  }
};
