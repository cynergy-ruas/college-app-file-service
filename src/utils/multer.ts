import multer from 'multer';

const storage = multer.memoryStorage();

const uploadbuff = multer({ storage: storage }).array('file');

export { uploadbuff };
