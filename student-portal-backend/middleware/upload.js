import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads");
    },
    filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        const base = path.basename(file.originalname, ext);
        const random = Date.now() + "-" + Math.floor(Math.random() * 1e9);
        const cleanName = base.replace(/\s+/g, "_");
        const finalName = `${cleanName}_${random}${ext}`;

        cb(null, finalName);
    }
});

export const upload = multer({ storage });
