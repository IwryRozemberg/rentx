import crypto from "crypto";
import multer, { StorageEngine } from "multer";
import { resolve, extname } from "path";

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

type UploadOptions = {
  tmpFolder: string;
  storage: StorageEngine;
};

const uploadConfig = (filename?: string): UploadOptions => {
  return {
    tmpFolder,
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString("hex");
        const finalFileName =
          fileHash +
          (filename
            ? `-${filename.toUpperCase()}${extname(file.originalname)}`
            : `-${file.originalname.toUpperCase()}`);

        return callback(null, finalFileName);
      },
    }),
  };
};

export default uploadConfig;
