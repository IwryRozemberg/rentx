import crypto from "crypto";
import multer, { StorageEngine } from "multer";
import { resolve, extname } from "path";

let tmpFolder = resolve(__dirname, "..", "..", "tmp");

type UploadOptions = {
  tmpFolder: string;
  storage: StorageEngine;
};

const uploadConfig = (folder?: string, filename?: string): UploadOptions => {
  if (folder) {
    tmpFolder = resolve(tmpFolder, folder);
  }

  return {
    tmpFolder,
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString("hex");
        let finalFileName = fileHash;
        if (filename) {
          finalFileName += `-${filename}${extname(file.originalname)}`;
        } else {
          finalFileName += `-${file.originalname}`;
        }

        return callback(null, finalFileName);
      },
    }),
  };
};

export default uploadConfig;
