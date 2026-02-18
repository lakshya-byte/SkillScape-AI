import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    const allowedTypes = ['.jpg', '.jpeg', '.png'];
    if (allowedTypes.includes(ext)) {
        cb(null, true);
    }else {
        return cb(new Error("Only JPG/PNG images"),false);
    }
}

export const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5mb limit of each file 
    fileFilter,
 });
