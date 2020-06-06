/**
 * Arquivo de configurações do Multer para uploads de imagens.
 */
import multer from "multer";
import path from "path";
import crypto from "crypto";

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, "..", "..", "uploads", "points"),
        filename(res, file, callback) {
            const hash = crypto.randomBytes(6).toString("hex");

            const fileName = `${hash}-${file.originalname}`;

            callback(null, fileName);
        },
    }),
};
